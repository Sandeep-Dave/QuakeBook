'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')

suite('friends seeds', addDatabaseHooks(() => {
  test('friends values', (done) => {
    knex('friends').orderBy('user_from').orderBy('user_to')
      .then((actual) => {

        const expected = [
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
          }
        ];


        for (let i = 0; i < expected.length; i++) {
          assert.deepEqual(
            actual[i],
            expected[i],
            `Row id=${i + 1} not the same`
          );
        }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));
