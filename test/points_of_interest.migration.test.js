'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('migrations', addDatabaseHooks(() => {
  test('points_of_interest columns', (done) => {
    knex('points_of_interest').columnInfo()
      .then((actual) => {

        const expected =  {
          id:
           { type: 'integer',
             maxLength: null,
             nullable: false,
             defaultValue: 'nextval(\'points_of_interest_id_seq\'::regclass)' },
          user_id:
           { type: 'integer',
             maxLength: null,
             nullable: false,
             defaultValue: null },
          lat:
           { type: 'character varying',
             maxLength: 255,
             nullable: true,
             defaultValue: null },
          long:
           { type: 'character varying',
             maxLength: 255,
             nullable: true,
             defaultValue: null },
          is_home:
           { type: 'boolean',
             maxLength: null,
             nullable: true,
             defaultValue: 'false' },
          label:
           { type: 'character varying',
             maxLength: 255,
             nullable: true,
             defaultValue: null },
          max_radius:
           { type: 'integer',
             maxLength: null,
             nullable: true,
             defaultValue: '100' }
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
