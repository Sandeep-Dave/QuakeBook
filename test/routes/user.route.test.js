'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../../knex');
const server = require('../../server');
const { addDatabaseHooks } = require('../utils');

suite('user routes', addDatabaseHooks(() => {
  test('GET /user/:id', (done) => {
    request(server)
      .get('/user/1')
      .set('Accept','application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
            name: 'Joanne Rowling',
            email: 'jkrowling@gmail.com',
            timezone: 9
            }, done);
  });

  test('GET /user/:id/notes', (done) => {
    request(server)
      .get('/user/3/notes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body[0].note_date_time;
      })
      .expect(200, [{
           id: 3,
           event_id: 3,
           text: 'I survived this monster!'
         }], done);
  });
}));
