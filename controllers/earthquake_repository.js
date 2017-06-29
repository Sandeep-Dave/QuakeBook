const knex = require('../knex.js');

class Earthquake{

  // return earthquake information about a particular event by id

  earthquakeById(id){
    return knex('earthquakes').where({ id }).first();
  }

  // add an earthquake event to earthquakes database


  addEarthquake(earthquake) {
    return knex('earthquakes').insert(earthquake, '*');
  }

  // get notes for a particular earthquake by event id


  notesById(id){
    return knex('notes').select('event_id', 'id', 'user_id', 'text').where({event_id: id, is_private: false});
  }

}


module.exports = Earthquake;
