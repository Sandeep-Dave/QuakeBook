const knex = require('../knex.js');


class User{

  userById(id){
    return knex('users').select('email', 'name', 'timezone').where({ id }).first();
  }


  notesByUser(id){
    return knex('notes').select('event_id', 'id', 'note_date_time', 'text').where({user_id: id, is_private: false});
  }

}

module.exports = User;
