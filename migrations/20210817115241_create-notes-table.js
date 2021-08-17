exports.up = function (knex) {
  return knex.schema.createTable("notes", function (table) {
    table.increments();
    table.string("title").notNullable();
    table.text("content");
    table
      .integer("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("notes");
};
