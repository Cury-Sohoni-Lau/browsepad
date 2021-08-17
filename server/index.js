"use strict";

const Hapi = require("@hapi/hapi");
const knex = require("knex")(require("../knexfile"));

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World";
    },
  });

  server.route({
    method: "GET",
    path: "/notes",
    handler: (request, h) => {
      const notes = knex("notes").select();
      return notes;
    },
  });

  server.route({
    method: "GET",
    path: "/users",
    handler: (request, h) => {
      const users = knex("users").select();
      return users;
    },
  });

  console.log("Running migrations...");
  await knex.migrate.latest();

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
