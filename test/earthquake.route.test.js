'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils');

suite('earthquake routes', addDatabaseHooks(() => {

  test('GET /earthquake/:id', (done) => {
    request(server)
      .get('/earthquake/4')
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
          id: 4,
          description: "5km NNE of Bainbridge Island, Washington",
          date_time: '2017-06-23T16:01:39.000Z',
          last_updated: '2017-06-23T18:42:49.000Z',
          tz_offset: -480,
          magnitude: 1.1,
          long:  '-122.4905',
          lat:  '47.6686667',
          depth:  4.58,
          usgs_id: "uw61276557"
          }, done);
  });

  test('GET /earthquake/:id with faulty earthquake id', (done) => {
    request(server)
      .get('/earthquake/0')
      .set('Accept','application/json')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(404, done);
  });

  test('GET /earthquake/:id/notes', (done) => {
    request(server)
      .get('/earthquake/3/notes')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        delete res.body[0].note_date_time;
      })
      .expect(200, [{
           id: 3,
           user_id: 3,
           event_id: 3,
           text: 'I survived this monster!'
         }], done);
  });

  test('GET /earthquake/:id/notes with faulty note id', (done) => {
    request(server)
      .get('/earthquake/0/notes')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(404, done);
  });

  test('PUT /earthquake', (done) => {
    /* eslint-disable max-len */
    request(server)
    .put('/earthquake')
    .set('Accept', 'application/json')
    .send({
      usgs_id: 'ak16240976',
      tz_offset: -540,
      last_updated: new Date('2017-06-28T09:34:32.000Z'),
      date_time: new Date('2017-06-28T09:38:05.000Z'),
      lat: '61.4833',
      long: '-151.26',
      depth: 0,
      magnitude: 1.3,
      description: '69km W of Big Lake, Alaska'
    }, done)
    .expect('Content-Type', /json/)
    .expect(201, [{
    id: 5,
    date_time:'2017-06-28T09:38:05.000Z',
    tz_offset: -540,
    last_updated:'2017-06-28T09:34:32.000Z',
    lat: '61.4833',
    long: '-151.26',
    depth: 0,
    magnitude: 1.3,
    description: '69km W of Big Lake, Alaska',
    usgs_id: 'ak16240976' }], done);
  });

  test('PUT /earthquake with invalid object', (done) => {
    /* eslint-disable max-len */
    request(server)
    .put('/earthquake')
    .set('Accept', 'application/json')
    .send({
      usgs_id: 'ak16240976',
      tz_offset: -540,
      date_time: new Date('2017-06-28T09:38:05.000Z'),
      lat: '61.4833',
      long: '-151.26',
      depth: 0,
      magnitude: 1.3,
      description: '69km W of Big Lake, Alaska'
    }, done)
    .expect('Content-Type', 'plain/text; charset=utf-8')
    .expect(400, done);
  });

}));
