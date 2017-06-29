'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

suite('saved_earthquakes seeds', addDatabaseHooks(() => {
  test('saved_earthquakes values', (done) => {
    knex('saved_earthquakes').orderBy('user_id').orderBy('event_id')
      .then((actual) => {

        const expected = [
          {
            user_id: 1,
            event_id: 1
          },
          {
            user_id: 1,
            event_id: 2
          },
          {
            user_id: 2,
            event_id: 2
          },
          {
            user_id: 2,
            event_id: 3
          },
          {
            user_id: 3,
            event_id: 1
          },
          {
            user_id: 3,
            event_id: 4
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
