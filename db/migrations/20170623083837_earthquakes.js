
exports.up = function(knex, Promise) {
  return knex.schema.createTable('earthquakes', (table) => {
    table.increments('id').primary();
    table.dateTime('event_date_time');
    table.integer('tz_offset');
    table.dateTime('last_updated');
    table.string('event_lat');
    table.string('event_long');
    table.foat('depth', 8, 2);
    table.float('magnitude', 3, 2);
    table.string('description');
    table.integer('usgs_id');
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('earthquakes');
};
