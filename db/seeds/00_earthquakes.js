
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('earthquakes').del()
    .then(function () {
      // Inserts seed entries
      return knex('earthquakes').insert([
        { id: 1,
          description: "6km WSW of Houston, Alaska",
          date_time: 1498253466881,
          last_updated: 1498253815876,
          tz_offset: -540,
          magnitude: 1.5,
          lat: 61.6006,
          long: -149.9249,
          depth: 32.9,
          usgs_id: "ak16217780"
        },
        {
          id: 2,
          description: "79km WNW of Skagway, Alaska",
          date_time: 1498234394861,
          last_updated: 1498234649807,
          tz_offset: -480,
          magnitude: 2.2,
          lat:59.7657,
          long: -136.5902,
          depth: 1.1,
          usgs_id: "ak16217027"
        },
        {
          id: 3,
        	description: "6km W of Cobb, California",
          date_time: 1498234192350,
          last_updated: 1498234623042,
          tz_offset: -480,
          magnitude: 1.07,
          long: -122.7981644,
          lat: 38.8256683,
          depth: 0.94,
          usgs_id: "nc72819996"
        },
        {
          id: 4,
        	description: "5km NNE of Bainbridge Island, Washington",
          date_time: 1498233699270,
          last_updated: 1498243369310,
          tz_offset: -480,
          magnitude: 1.1,
          long:  -122.4905,
          lat:  47.6686667,
          depth:  4.58,
          usgs_id: "uw61276557"
        }
      ]);
    })
    .then(function(){
        return knex.raw(`SELECT setval('earthquakes_id_seq', (SELECT MAX(id) FROM earthquakes))`);
    });
};
