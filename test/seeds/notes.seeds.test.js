'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')

suite('notes seeds', addDatabaseHooks(() => {
  test('notes values', (done) => {
    knex('notes').orderBy('id', 'ASC')
      .then((actual) => {

        const expected = [
          {
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
          }
        ];


        for (let i = 0; i < expected.length; i++) {
          delete actual[i].note_date_time; //NOTE delete since cannot match
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
