require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const knex = require("knex")(require("../knexfile"));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.resolve(__dirname, "../build")));

app.get("/notes", async (req, res) => {
  const result = await knex("notes").select();
  res.send(result);
});

app.post("/notes", async (req, res) => {
  const content = req.body;
  const note = await knex("notes").insert(content);
  res.send("Yay");
})

app.delete("/notes/:noteID", async (req, res) => {
  const noteID = req.params.noteID;
  await knex("notes").del().where({ id: noteID })
  res.send("Deleted!")
})

app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const changedContent = req.body;
  const note = await knex("notes").where({id: id}).update({title: changedContent.title, content: changedContent.content});
  res.send("Yay");

})

const startServer = async () => {
  console.log("Running migrations");
  await knex.migrate.latest();

  console.log("Starting express");

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
};

startServer();
