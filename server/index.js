require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../build")));

/// JWT auth

function checkAuth(req, res, next) {
  const token = req.header("jwt_token");
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const verify = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.user = verify.user;
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
  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, { expiresIn: "1h" });
}

app.post("/api/register", async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const user = await knex("users").first().where({ email });

    if (user) {
      return res.sendStatus(418);
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

/////////

app.get("/api/notes", checkAuth, async (req, res) => {
  const result = await knex("notes").select().where({ user_id: req.user.id });
  res.send(result);
});

app.post("/api/notes", async (req, res) => {
  const content = req.body;
  await knex("notes").insert(content);
  res.sendStatus(201);
});

app.delete("/api/notes/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  await knex("notes").del().where({ id: noteID });
  res.sendStatus(204);
});

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const changedContent = req.body;
  await knex("notes").where({ id: id }).update(changedContent);
  res.sendStatus(204);
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
