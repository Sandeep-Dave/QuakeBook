exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(() => {
      // Inserts seed entries
      return knex('notes').insert(
[{
          id: 1,
          user_id: 1,
          event_id: 1,
          is_private: false,
          text: 'I survived this monster!'
        },
        {
          id: 2,
          user_id: 2,
          event_id: 4,
          is_private: true,
          text: 'This one robbed us of Muffy'
        },
        {
          id: 3,
          user_id: 3,
          event_id: 3,
          is_private: false,
          text: 'I survived this monster!'
        }]);
  })
  .then(function(){
            return knex.raw(`SELECT setval('notes_id_seq', (SELECT MAX(id) FROM notes))`)
        });
};
