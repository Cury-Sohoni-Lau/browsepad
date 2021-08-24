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
    table.string("url");
  });
};

exports.down = function (knex) {
};
