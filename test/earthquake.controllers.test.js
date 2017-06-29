'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')
const Repo  = require('../controllers/earthquake_repository');
const repo = new Repo();

suite('earthquake controllers', addDatabaseHooks(() => {

  test('get earthquake by id', (done) => {
    repo.earthquakeById(1)
      .then((actual) => {
        const expected = {
          id: 1,
          date_time: new Date('2017-06-23T21:31:06.000Z'),
          tz_offset: -540,
          last_updated: new Date('2017-06-23T21:36:55.000Z'),
          lat: '61.6006',
          long: '-149.9249',
          depth: 32.9,
          magnitude: 1.5,
          description: '6km WSW of Houston, Alaska',
          usgs_id: 'ak16217780'
        };

        assert.deepEqual(actual, expected, 'failed');
          done();
        })
        .catch((err) => {
          done(err);
        });
      });

  test('add earthquake object to database', (done) => {
    repo.addEarthquake({
      date_time: new Date('2017-06-28T09:34:32.000Z'),
      tz_offset: -480,
      last_updated: new Date('2017-06-28T09:38:05.000Z'),
      lat: '33.4955',
      long: '-116.7916667',
      depth: 4.66,
      magnitude: 0.48,
      description: '9km NE of Aguanga, CA',
      usgs_id: 'ci37920224'
    })
      .then((actual) => {
        const expected = [{
          id: 5,
          date_time: new Date('2017-06-28T09:34:32.000Z'),
          tz_offset: -480,
          last_updated: new Date('2017-06-28T09:38:05.000Z'),
          lat: '33.4955',
          long: '-116.7916667',
          depth: 4.66,
          magnitude: 0.48,
          description: '9km NE of Aguanga, CA',
          usgs_id: 'ci37920224'
        }];

        assert.deepEqual(actual, expected, 'failed');
          done();
        })
        .catch((err) => {
          done(err);
        });
      });

  test('get earthquake notes by event id', (done) => {
    repo.notesById(3)
      .then((actual) => {
        const expected = [{
          id: 3,
          user_id: 3,
          event_id: 3,
          text: 'I survived this monster!'
        }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
        .catch((err) => {
          done(err);
        });
      });

}));
