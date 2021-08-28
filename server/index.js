require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isPasswordValid } = require("./utils.js");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../build")));

/// JWT auth

function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.user = verify.user;
    // CHECK THE ISSUED AT DATE/TIME. IF THE USER USES IT WITHIN A WEEK, GENERATE A NEW JWT SO NOT LOGGED OUT
    if (Date.now() / 1000 - 24 * 60 * 60 > verify.iat) {
      req.new_token = jwtGenerator(verify.user.id);
    }
    next();
  } catch (err) {
    res.sendStatus(401);
  }
}

function jwtGenerator(userID) {
  const payload = {
    user: {
      id: userID,
    },
  };
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: "7d" });
}

app.post("/api/register", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await knex("users").first().where({ email });

    if (user) {
      return res.sendStatus(400);
    }

    if (!isPasswordValid(password)) {
      return res.sendStatus(400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userID = await knex("users").insert(
      { email: email, name: name, password: hashedPassword },
      "id"
    );

    const jwtToken = jwtGenerator(userID[0]);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await knex("users").first().where({ email });

    if (!user) {
      return res.sendStatus(401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.sendStatus(401);
    }
    const jwtToken = jwtGenerator(user.id);
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.sendStatus(500);
  }
});

app.get("/api/getuser", checkAuth, async (req, res) => {
  const user = await knex("users").first().where({ id: req.user.id });
  if (req.new_token) {
    user.new_token = req.new_token;
  }
  res.send(user);
});

/////////

app.get("/api/user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await knex("users").first().where({ email });
    console.log("Got the email and user", user);
    res.send(user);
  } catch (err) {
    res.send(418);
  }
});

app.get("/api/notes", checkAuth, async (req, res) => {
  try {
    const result = await knex("notes").select().where({ user_id: req.user.id });
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.get("/api/notes/shared", checkAuth, async (req, res) => {
  try {
    // FIRST SEND OVER YOUR OWN USER ID
    const userID = req.user.id;

    // PULL ALL OF THE IDS OF THE NOTES THAT HAVE YOUR USER ID IN THE accesscontrol TABLE
    const entries = await knex("accesscontrol")
      .select()
      .where({ user_id: userID });
    const noteIDs = entries.map((entry) => entry.note_id);

    // GATHER ALL OF THE NOTES BASED ON THE NOTE IDS THAT ARE IN THE ARRAY
    const notes = await knex("notes").select().whereIn("id", noteIDs);
    res.send(notes);
  } catch (err) {
    res.sendStatus(400);
  }
});

// GET ALL ROWS THAT HAVE THE GIVEN NOTE ID
// EACH ROW WILL HAVE A USER WHO CAN EDIT THE NOTE
// CHECK AGAINST WHO THE USER HAS ALREADY SHARED WITH

app.get("/api/users/shared", checkAuth, async (req, res) => {
  try {
    const userID = req.user.id;
    const entries = await knex("accesscontrol")
      .select()
      .where({ owner_id: userID });
    const userIDs = entries.map((entry) => entry.user_id);
    const users = await knex("users").select().whereIn("id", userIDs);
    res.send(
      users.map((user) => {
        return {
          name: user.name,
          email: user.email,
        };
      })
    );
  } catch {
    res.send(400);
  }
});

app.post("/api/notes/:noteID/share", checkAuth, async (req, res) => {
  try {
    const note = await knex("notes")
      .first()
      .where({ id: req.params.noteID, user_id: req.user.id });
    if (!note) throw new Error("Note was not found");
    const recipient = await knex("users")
      .first()
      .where({ email: req.body.email });
    if (!recipient) throw new Error("No user with this email");
    await knex("accesscontrol").insert({
      note_id: req.params.noteID,
      user_id: recipient.id,
      owner_id: req.user.id,
    });
    res.sendStatus(200);
  } catch {
    res.sendStatus(400);
  }
});

// FOR EXTENSION (it's actually a "GET")
app.post("/api/notes/url", checkAuth, async (req, res) => {
  try {
    const result = await knex("notes")
      .select()
      .where({ user_id: req.user.id, url: req.body.url });
    res.send(result);
  } catch (err) {
    res.sendStatus(400);
  }
});

// BOTH WEB APP AND EXTENSION
app.post("/api/notes", checkAuth, async (req, res) => {
  const body = req.body;
  try {
    await knex("notes").insert({
      title: body.title,
      content: body.content,
      user_id: req.user.id,
      public: false,
      url: body.url,
    });
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.delete("/api/notes/:noteID", checkAuth, async (req, res) => {
  try {
    const noteID = req.params.noteID;
    await knex("notes").del().where({ id: noteID, user_id: req.user.id });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
});

app.get("/api/notes/shared/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  const note = await knex("notes").first().where({ id: noteID, public: true });
  if (!note) {
    return res.sendStatus(400);
  }
  res.send(note);
});

// SHARE VIEW ONLY LINK
app.post("/api/notes/share/:noteID", checkAuth, async (req, res) => {
  const noteID = req.params.noteID;
  const note = await knex("notes")
    .first()
    .where({ id: noteID, user_id: req.user.id });
  if (!note) {
    return res.sendStatus(400);
  }
  const public = req.body.public;
  await knex("notes")
    .where({ id: noteID, user_id: req.user.id })
    .update({ public: public });
  res.sendStatus(204);
});

app.patch("/api/notes/:id", checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const changedContent = req.body;
    changedContent.modified_at = new Date().toISOString();
    await knex("notes")
      .where({ id: id, user_id: req.user.id })
      .update(changedContent);
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(400);
  }
});

// Serve index.html for all other routes
app.use((_, res) => {
  res.sendFile(path.resolve(__dirname, "../build/index.html"));
});

const startServer = async () => {
  console.log("Running migrations");
  await knex.migrate.latest();

  console.log("Starting express");

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
};

startServer();
