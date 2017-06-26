exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('points_of_interest').del()
    .then(() => {
      // Inserts seed entries
      return knex('points_of_interest').insert(
[{
  id: 1,
  user_id: 2,
  lat:  '47.6686667',
  long: '-122.4905',
  is_home: false,
  max_radius: 200,
  label: 'The Eiffel Tower'
  },
  {
  id: 2,
  user_id: 2,
  lat:  '37.86209',
  long: '-122.29521',
  is_home: true,
  max_radius: 150,
  label: 'home'
  },
  {
  id: 3,
  user_id: 2,
  lat:  '37.69322',
  long: '-122.4653',
  is_home: false,
  max_radius: 200,
  label: 'Mom\'s house'
  },
  {
  id: 4,
  user_id: 1,
  lat:  '47.6686667',
  long: '-122.4905',
  is_home: false,
  max_radius: 200,
  label: 'Peggy Sue'
  },
  {
  id: 5,
  user_id: 1,
  lat:  '37.7821',
  long: '-122.4519',
  is_home: false,
  max_radius: 200,
  label: 'Mt. Rushmore'
  },
  {
  id: 6,
  user_id: 3,
  lat:  '37.7896',
  long: '-122.4035',
  is_home: true,
  max_radius: 300,
  label: 'My house'
  },
  {
    id: 7,
  user_id: 3,
  lat:  '47.6686',
  long: '-122.4905',
  is_home: false,
  max_radius: 300,
  label: 'Statue of Liberty'
  }]);
  })
  .then(function(){
            return knex.raw(`SELECT setval('points_of_interest_id_seq', (SELECT MAX(id) FROM points_of_interest))`)
        });
};
