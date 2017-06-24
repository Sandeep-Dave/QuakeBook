'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('./utils')
suite('migrations', addDatabaseHooks(() => {
  test('earthquake columns', (done) => {
    knex('earthquakes').columnInfo()
      .then((actual) => {
        //console.log(actual);
        // const expected = {
        //   id: {
        //     type: 'integer',
        //     maxLength: null,
        //     nullable: false,
        //     defaultValue: 'nextval(\'users_id_seq\'::regclass)'
        //   },
        //   date_time: {
        //     type: 'timestamp with time zone',
        //     maxLength: null,
        //     nullable: false,
        //     defaultValue: 'now()'
        //   },
        //   tz_offset: {
        //     type: 'integer',
        //     maxLength: null,
        //     nullable: false,
        //     defaultValue: null
        //   },
        //   last_updated: {
        //     type: 'timestamp with time zone',
        //     maxLength: null,
        //     nullable: false,
        //     defaultValue: 'now()'
        //   },
        //   lat: {
        //     type: 'character varying',
        //     maxLength: 255,
        //     nullable: false,
        //     defaultValue: '\'\'::character varying'
        //   },
        //   long: {
        //     type: 'character varying',
        //     maxLength: 255,
        //     nullable: false,
        //     defaultValue: '\'\'::character varying'
        //   },
        //   depth: {
        //     type: 'float',
        //     maxLength: null,
        //     nullable: false,
        //     defaultValue: null
        //   },
        //   magnitude: {
        //     type: 'float',
        //     maxLength: null,
        //     nullable: false,
        //     defaultValue: null
        //   },
        //   description: {
        //     type: 'character varying',
        //     maxLength: 255,
        //     nullable: false,
        //     defaultValue: '\'\'::character varying'
        //   },
        //   usgs_id: {
        //     type: 'integer',
        //     maxLength: null,
        //     nullable: false,
        //     defaultValue: null
        //   }
        // };

        // for (const column in expected) {
        //   assert.deepEqual(
        //     actual[column],
        //     expected[column],
        //     `Column ${column} is not the same`
        //   );
        // }

        done();
      })
      .catch((err) => {
        done(err);
      });
  });
}));