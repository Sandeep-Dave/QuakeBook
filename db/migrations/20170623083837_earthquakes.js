
exports.up = function(knex, Promise) {
  return knex.schema.createTable('earthquakes', (table) => {
    table.increments('id').primary();
    table.timestamp('date_time');
    table.integer('tz_offset');
    table.timestamp('last_updated');
    table.string('lat');
    table.string('long');
    table.float('depth');
    table.float('magnitude', 3, 2);
    table.string('description');
    table.string('usgs_id');
  });
}



exports.down = function(knex, Promise) {
  return knex.schema.dropTable('earthquakes');
}
