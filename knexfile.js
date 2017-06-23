// Update with your config settings.

module.exports = {

  test: {
    client: 'postgresql',
    connection: "postgres://localhost/quakebook_test",
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  },
  development: {
    client: 'postgresql',
    connection: "postgres://localhost/quakebook_dev",
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: `${__dirname}/db/migrations`
    },
    seeds: {
      directory: `${__dirname}/db/seeds`
    }
  }
};
