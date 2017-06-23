
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable().defaultTo('');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.integer('timezone');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
