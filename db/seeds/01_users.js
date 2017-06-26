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
          hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS'
        },
        {
          id: 2,
          name: 'Oskar Fischinger',
          email: 'ofischy@gmail.com',
          timezone: -3,
          hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS'
        },
        {
          id: 3,
          name: 'Amelia Bedelia',
          email: 'amiabaddy@gmail.com',
          timezone: -6,
          hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS'
        }]);
  })
  .then(function(){
            return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`)
        });
};
