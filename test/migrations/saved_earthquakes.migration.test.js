'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')
suite('migrations', addDatabaseHooks(() => {
  test('saved_earthquakes columns', (done) => {
    knex('saved_earthquakes').columnInfo()
      .then((actual) => {

        const expected = {
          user_id:
           { type: 'integer',
             maxLength: null,
             nullable: false,
             defaultValue: null },
          event_id:
           { type: 'integer',
             maxLength: null,
             nullable: false,
             defaultValue: null }
           };

         for (const column in expected) {
           assert.deepEqual(
             actual[column],
             expected[column],
             `Column ${column} is not the same`
           );
         }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));