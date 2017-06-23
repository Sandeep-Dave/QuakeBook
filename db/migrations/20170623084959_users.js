
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().defaultTo('');
    table.string('email').unique().notNullable().defaultTo('');
    table.specificType('hashed_password', 'char(60)').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
