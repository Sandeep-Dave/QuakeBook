'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')

suite('earthquakes seeds', addDatabaseHooks(() => {
  test('earthquakes values', (done) => {
    knex('earthquakes').orderBy('id', 'ASC')
      .then((actual) => {

        const expected = [
           {
            id: 1,
            date_time: new Date('2017-06-23T21:31:06.000Z'),
            tz_offset: -540,
            last_updated: new Date('2017-06-23T21:36:55.000Z'),
            lat: '61.6006',
            long: '-149.9249',
            depth: 32.9,
            magnitude: 1.5,
            description: '6km WSW of Houston, Alaska',
            usgs_id: 'ak16217780' },
           {
            id: 2,
            date_time: new Date('2017-06-23T16:13:14.000Z'),
            tz_offset: -480,
            last_updated: new Date('2017-06-23T16:17:29.000Z'),
            lat: '59.7657',
            long: '-136.5902',
            depth: 1.1,
            magnitude: 2.2,
            description: '79km WNW of Skagway, Alaska',
            usgs_id: 'ak16217027' },
           {
            id: 3,
            date_time: new Date('2017-06-23T16:09:52.000Z'),
            tz_offset: -480,
            last_updated: new Date('2017-06-23T16:17:03.000Z'),
            lat: '38.8256683',
            long: '-122.7981644',
            depth: 0.94,
            magnitude: 1.07,
            description: '6km W of Cobb, California',
            usgs_id: 'nc72819996' },
           {
            id: 4,
            date_time: new Date('2017-06-23T16:01:39.000Z'),
            tz_offset: -480,
            last_updated: new Date('2017-06-23T18:42:49.000Z'),
            lat: '47.6686667',
            long: '-122.4905',
            depth: 4.58,
            magnitude: 1.1,
            description: '5km NNE of Bainbridge Island, Washington',
            usgs_id: 'uw61276557' }
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
