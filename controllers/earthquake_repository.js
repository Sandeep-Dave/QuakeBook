const knex = require('../knex.js');


class Earthquake{

  earthquakeById(id){
    return knex('earthquakes').where({ id });
  }


  notesById(id){
    return knex('notes').where({event_id: id});
  }

}

module.exports = Earthquake;
