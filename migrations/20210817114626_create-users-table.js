exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("name").notNullable();
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.text("image");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("users");
};
