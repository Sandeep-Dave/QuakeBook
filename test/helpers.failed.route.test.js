'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils');

suite('helper function failed routes', addDatabaseHooks(() =>{

  test('GET /profile fail without token', (done) => {
    request(server)
    .get('/profile')
    .set('Accept', 'application/json')
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect(401, done)
  });

  test('GET /profile fail without correct JWT', (done) => {
    request(server)
      .get('/profile')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Cookie','token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJqd3RfbGVzc29uX2FwcCIsInN1YiI6eyJ1c2VyX2lkIjoyfSwiZXhwIjoxNDk4Nzg0MDYzLCJpYXQiOjE0OTg3ODA0NjN9.bDVM9OmKUFgq7oaCpP29i-jCWuhEW8Kiollf_cpxAjQ9; Path=/; HttpOnly')
      .send({
        email: 'ofischy@gmail.com',
        password: 'gr8tsaltLake'
      })
    .expect('Content-Type', 'text/html; charset=utf-8')
    .expect(401)
    .end(done);
  });

}));
