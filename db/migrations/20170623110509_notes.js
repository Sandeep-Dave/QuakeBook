
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('users.id').onDelete('cascade');
    table.integer('event_id').notNullable().references('earthquakes.id').onDelete('cascade');
    table.dateTime('note_date_time');
    table.string('text');
    table.boolean('is_private').defaultTo(false);
  });
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
}
