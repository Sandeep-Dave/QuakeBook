'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')
suite('migrations', addDatabaseHooks(() => {
  test('notes columns', (done) => {
    knex('notes').columnInfo()
      .then((actual) => {

        const expected =  {
          id:
           { type: 'integer',
             maxLength: null,
             nullable: false,
             defaultValue: 'nextval(\'notes_id_seq\'::regclass)' },
          user_id:
           { type: 'integer',
             maxLength: null,
             nullable: false,
             defaultValue: null },
          event_id:
           { type: 'integer',
             maxLength: null,
             nullable: false,
             defaultValue: null },
          note_date_time:
           { type: 'timestamp with time zone',
             maxLength: null,
             nullable: true,
             defaultValue: 'now()' },
          text:
           { type: 'character varying',
             maxLength: 255,
             nullable: true,
             defaultValue: null },
          is_private:
           { type: 'boolean',
             maxLength: null,
             nullable: true,
             defaultValue: 'false' }
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