const knex = require('../knex.js');


class User {

  userById(id){
    return knex('users').where({ id }).first();
  }

  notesByUser(id){
    return knex('notes').where({user_id: id, });
  }

}

module.exports = User;
