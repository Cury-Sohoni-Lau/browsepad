exports.up = function (knex) {
  return knex.schema.createTable("accesscontrol", function (table) {
    table.increments();
    table
      .integer("owner_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
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
