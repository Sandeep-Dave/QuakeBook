const knex = require('../knex.js');


class User {

  // return public user profile information by user id

  userById(id){
    return knex('users').select('email', 'name', 'timezone').where({ id }).first();
  }

  // return public notes by user id

  notesByUser(id){
    return knex('notes').select('event_id', 'id', 'note_date_time', 'text').where({user_id: id, is_private: false});
  }

}

module.exports = User;
