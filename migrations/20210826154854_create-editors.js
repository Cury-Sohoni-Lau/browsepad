exports.up = function (knex) {
  return knex.schema.createTable("editors", function (table) {
    table.increments();
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users");
    table
      .integer("note_id")
      .notNullable()
      .references("id")
      .inTable("notes")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
};
