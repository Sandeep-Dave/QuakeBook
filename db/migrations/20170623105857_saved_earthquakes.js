
exports.up = function(knex, Promise) {
  return knex.schema.createTable('saved_earthquakes', (table) => {
    table.integer('user_id').notNullable().references('users.id').onDelete('cascade');
    table.integer('event_id').notNullable().references('earthquakes.id').onDelete('cascade');
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('saved_earthquakes');
}
