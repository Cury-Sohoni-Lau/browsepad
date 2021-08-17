exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments();
    table.string("username");
  });
};

exports.down = function (knex) {
  knex.schema.dropTable("users");
};
