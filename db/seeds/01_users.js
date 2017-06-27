exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(
[{
          id: 1,
          name: 'Joanne Rowling',
          email: 'jkrowling@gmail.com',
          timezone: 9,
          hashed_password: '$2a$06$XkiKSpNXYMBCtbOszL.9X.exR3Jxg126.2GFInUvwg9hU9TfWpTlW'
        },
        {
          id: 2,
          name: 'Oskar Fischinger',
          email: 'ofischy@gmail.com',
          timezone: -3,
          hashed_password: '$2a$06$30y0zx7luI7w66xvLmIB.ONoxA1j.hgFGwfbmYA2dP6fXYfVuvnL.'
        },
        {
          id: 3,
          name: 'Amelia Bedelia',
          email: 'amiabaddy@gmail.com',
          timezone: -6,
          hashed_password: '$2a$06$4H3enWFJZU/urCKjdhkAgOa0Kl777tHzWem6Bt.jjpXxpYc38wMvq'
        }]);
  })
  .then(function(){
            return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
        });
};
