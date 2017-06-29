'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../../knex');
const server = require('../../server');
const { addDatabaseHooks } = require('../utils');

suite('earthquakes routes', addDatabaseHooks(() => {

  test('GET /earthquakes/:id', (done) => {
    request(server)
      .get('/earthquakes/uw61276557')
      .set('Accept','application/json')
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
                magnitude: 1.03,
                usgs_id: 'uw61276557',
                lat: 47.587,
                long: -122.5366667,
                depth: 19.63,
                description: '3km N of Manchester, Washington',
                tz_offset: -480,
                date_time: 1498233699330,
                last_updated: 1498597260100 }, done);
  });

//   test('GET /earthquakes', (done) => {
//     request(server)
//       .get('earthquakes?latitude=59.7657&longitude=-136.5902&starttime=1991&minmagnitude=3&maxmagnitude=6&maxradiuskm=300&limit=2&')
//       .set('Accept','application/json')
//       .set('Content-Type', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(200, [
//     {
//         "date_time": 1498592834378,
//         "depth": 2.4,
//         "description": "66km WNW of Skagway, Alaska",
//         "last_updated": 1498593361598,
//         "lat": 59.7291,
//         "long": -136.3664,
//         "magnitude": 3.2,
//         "tz_offset": -480,
//         "usgs_id": "ak16239881"
//     },
//     {
//         "date_time": 1498095307978,
//         "depth": 7.8,
//         "description": "74km WNW of Skagway, Alaska",
//         "last_updated": 1498177128299,
//         "lat": 59.7498,
//         "long": -136.5051,
//         "magnitude": 3.8,
//         "tz_offset": -480,
//         "usgs_id": "ak16211569"
//     }
// ], done);
//   });
}));
