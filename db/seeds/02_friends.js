exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('friends').del()
    .then(() => {
      // Inserts seed entries
      return knex('friends').insert(
[
          {
            user_from: 1,
            user_to: 2
          },
          {
            user_from: 1,
            user_to: 3
          },
          {
            user_from: 2,
            user_to: 1
          },
          {
            user_from: 2,
            user_to: 3
          },
          {
            user_from: 3,
            user_to: 1
          },
          {
            user_from: 3,
            user_to: 2
          }]);
  });
};
