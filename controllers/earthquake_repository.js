const knex = require('../knex.js');

class Earthquake{

  earthquakeById(id){
    return knex('earthquakes').where({ id }).first();
  }


  notesById(id){
    return knex('notes').select('event_id', 'id', 'user_id', 'text').where({event_id: id, is_private: false});
  }

}


module.exports = Earthquake;
