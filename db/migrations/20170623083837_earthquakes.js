
exports.up = function(knex, Promise) {
  return knex.schema.createTable('earthquakes', (table) => {
    table.increments('id').primary();
    table.dateTime('event_date_time');
    table.string('event_lat');
    table.string('event_long');
    table.float('magnitude', 2, 1);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('earthquakes');
};
