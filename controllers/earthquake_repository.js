const knex = require('../knex.js');

class Earthquake{

  earthquakeById(id){
    return knex('earthquakes').where({ id }).first();
  }


  notesById(id){
    return knex('notes').where({event_id: id});
  }

}

// var repo = new Earthquake();
//
// repo.earthquakeById(1)
//   .then(console.log);


module.exports = Earthquake;
