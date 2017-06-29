'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
suite('migrations', addDatabaseHooks(() => {
  test('earthquake columns', (done) => {
    knex('earthquakes').columnInfo()
      .then((actual) => {
        const expected = { id:
           { type: 'integer',
             maxLength: null,
             nullable: false,
             defaultValue: 'nextval(\'earthquakes_id_seq\'::regclass)' },
          date_time:
           { type: 'timestamp with time zone',
             maxLength: null,
             nullable: true,
             defaultValue: null },
          tz_offset:
           { type: 'integer',
             maxLength: null,
             nullable: true,
             defaultValue: null },
          last_updated:
           { type: 'timestamp with time zone',
             maxLength: null,
             nullable: true,
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
          depth:
           { type: 'real',
             maxLength: null,
             nullable: true,
             defaultValue: null },
          magnitude:
           { type: 'real',
             maxLength: null,
             nullable: true,
             defaultValue: null },
          description:
           { type: 'character varying',
             maxLength: 255,
             nullable: true,
             defaultValue: null },
          usgs_id:
           { type: 'character varying',
             maxLength: 255,
             nullable: true,
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
