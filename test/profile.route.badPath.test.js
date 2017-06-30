'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils');

suite('profile bad path routes', addDatabaseHooks(() => {

  const agent = request.agent(server);

  beforeEach((done) => {
    request(server)
      .post('/profile/login')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({
        email: 'jkrowling@gmail.com',
        password: 'kryptic9passWord'
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        agent.saveCookies(res);
        done();
      });
  });

  test('POST /profile fail with no properties to update in passed in user object', (done) => {
    agent
    .post('/profile')
    .set('Accept', 'text/plain; charset=utf-8')
    .send({}, done)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect(400)
    .end(done);
  });


  test('PUT /profile fail with missing element in passed in user object', (done) => {
    /* eslint-disable max-len */
    request(server)
    .put('/profile')
    .set('Accept', 'application/json')
    .send({
      name: 'Allen B. Downey',
      email: 'abd@gmail.com',
      timezone: 5
    }, done)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect(400, done);
  });


  test('DELETE /profile/earthquake/4 fail with faulty event_id passed in as parameter', (done) => {
    agent
    .del('/profile/earthquake/4')
    .set('Accept', 'application/json')
    .expect(404)
    .end(done);
  });

  test('PUT /profile/notes fail with missing element from passed in note object', (done) => {
    /* eslint-disable max-len */
    agent
    .put('/profile/notes')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      event_id: 3,
      text: 'This was the time of my life!'}, done)
    .expect('Content-Type', 'text/plain; charset=utf-8')
    .expect(400, done)
  });

  test('DELETE /profile/notes/:id fail if no note exists for id passed in', (done) => {
    agent
    .del('/profile/notes/4')
    .set('Accept', 'application/json')
    .expect(404)
    .end(done);
  });

  // test('PUT /profile/friends fail if either users do not exist in users table', (done) => {
  //   /* eslint-disable max-len */
  //   agent
  //   .put('/profile/friends/d')
  //   .set('Accept', 'application/json')
  //   .expect('Content-Type', /json/)
  //   .expect(201, [{user_from:1, user_to:2}])
  //   .end(done);
  // });

  test('DELETE /profile/friends fail with incorrect friend user id', (done) => {
    agent
    .del('/profile/friends/1')
    .set('Accept', 'application/json')
    .expect(404)
    .end(done);
  });

  test('PUT /profile/poi fail with missing element from passed in point of interest object', (done) => {
    /* eslint-disable max-len */
    agent
    .put('/profile/poi')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      lat:  '40.7821',
      long: '-102.4519',
      is_home: false,
      label: 'Punto Allegro'
    }, done)
    .expect('Content-Type','text/plain; charset=utf-8')
    .expect(400)
    .end(done);
  });

  test('DELETE /profile/poi with token', (done) => {
    agent
    .del('/profile/poi/8')
    .set('Accept', 'application/json')
    .expect(404)
    .end(done);
  });

}));
