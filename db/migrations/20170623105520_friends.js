
exports.up = function(knex, Promise) {
  return knex.schema.createTable('friends', (table) => {
    table.integer('user_from').notNullable().references('users.id').onDelete('cascade');
    table.integer('user_to').notNullable().references('users.id').onDelete('cascade');       
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('friends');
};
