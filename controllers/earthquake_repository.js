const knex = require('../knex.js');


class Earthquake{

  earthquakeById(id){
    return knex('earthquakes').where({ id });
  }

}


module.exports = Earthquake;