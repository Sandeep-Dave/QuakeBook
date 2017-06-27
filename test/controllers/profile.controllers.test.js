'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')
const Profile  = require('../../controllers/profile_repository');
const profile = new Profile();


suite('profile controllers', addDatabaseHooks(() => {

  test('get user with email', (done) => {
    profile.getUserName('jkrowling@gmail.com')
      .then((actual) => {
        const expected = {
          id: 1,
          name: 'Joanne Rowling',
          email: 'jkrowling@gmail.com',
          timezone: 9
        };
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
        .catch((err) => {
          done(err);
        });
      })

  test('check user password', (done) => {
    profile.checkPassword('ofischy@gmail.com', 'gr8tsaltLake')
      .then((actual) => {
        console.log(actual);
        const expected = true;
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });

  });
}));
