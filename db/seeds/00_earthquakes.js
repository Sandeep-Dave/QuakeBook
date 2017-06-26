exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('earthquakes').del()
    .then(function () {
      // Inserts seed entries
      return knex.raw(//knex('earthquakes').insert(
`
INSERT INTO earthquakes
(id, description, date_time, last_updated, tz_offset, magnitude, lat, long, depth, usgs_id)
VALUES
(1, '6km WSW of Houston, Alaska', to_timestamp(1498253466881/1000), to_timestamp(1498253815876/1000), -540, 1.5, '61.6006', '-149.9249', 32.9, 'ak16217780');

INSERT INTO earthquakes
(id, description, date_time, last_updated, tz_offset, magnitude, lat, long, depth, usgs_id)
VALUES
(2, '79km WNW of Skagway, Alaska', to_timestamp(1498234394861/1000), to_timestamp(1498234649807/1000), -480, 2.2, '59.7657', '-136.5902', 1.1, 'ak16217027');

INSERT INTO earthquakes
(id, description, date_time, last_updated, tz_offset, magnitude, lat, long, depth, usgs_id)
VALUES
(3, '6km W of Cobb, California', to_timestamp(1498234192350/1000), to_timestamp(1498234623042/1000), -480, 1.07, '38.8256683', '-122.7981644', 0.94, 'nc72819996');

INSERT INTO earthquakes
(id, description, date_time, last_updated, tz_offset, magnitude, lat, long, depth, usgs_id)
VALUES
(4, '5km NNE of Bainbridge Island, Washington', to_timestamp(1498233699270/1000), to_timestamp(1498243369310/1000), -480, 1.1, '47.6686667', '-122.4905', 4.58, 'uw61276557');
`
      );
    })
    .then(function(){
        return knex.raw(`SELECT setval('earthquakes_id_seq', (SELECT MAX(id) FROM earthquakes))`);
    });
};
