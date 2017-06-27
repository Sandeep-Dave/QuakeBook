
exports.up = function(knex, Promise) {
  return knex.schema.createTable('points_of_interest', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('users.id').onDelete('cascade');
    table.string('lat');
    table.string('long');
    table.boolean('is_home').defaultTo(false);
    table.string('label');
    table.integer('max_radius').defaultTo(100);
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('points_of_interest');
}
