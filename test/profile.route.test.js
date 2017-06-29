'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../knex');
const server = require('../server');
const { addDatabaseHooks } = require('./utils');

suite('profile routes', addDatabaseHooks(() => {

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


  test('GET /profile with token', (done) => {
    agent
    .get('/profile')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, {
      name: 'Joanne Rowling',
      email: 'jkrowling@gmail.com',
      timezone: 9
    })
    .end(done);
  });


  test('POST /profile with token', (done) => {
    agent
    .post('/profile')
    .set('Accept', 'application/json')
    .send({
      email: 'jkr@gmail.com'
    }, done)
    .expect('Content-Type', /json/)
    .expect(200, [{
      name: 'Joanne Rowling',
      email: 'jkr@gmail.com',
      timezone: 9
    }])
    .end(done);
  });


  test('PUT /profile', (done) => {
    /* eslint-disable max-len */
    request(server)
    .put('/profile')
    .set('Accept', 'application/json')
    .send({
      name: 'Allen B. Downey',
      email: 'abd@gmail.com',
      timezone: 5,
      password: 'Sem8ntiK'
    }, done)
    .expect('Content-Type', /json/)
    .expect(201, [{
      id: 4
    }], done);
  });


  test('DELETE /profile', (done) => {
    agent
    .del('/profile')
    .set('Accept', 'application/json')
    .expect('set-cookie', /token=; Path=\//)
    .expect(200)
    .end(done);
  });

  test('GET /profile/earthquakes with token', (done) => {
    agent
    .get('/profile/earthquakes')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, [{
      user_id: 1,
      event_id: 1
    },
    {
      user_id: 1,
      event_id: 2
    }])
    .end(done);
  });

  test('PUT /profile/earthquakes with token', (done) => {
    /* eslint-disable max-len */
    agent
    .put('/profile/earthquakes/4')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201, [{event_id:4, user_id:1}])
    .end(done);
  });

  test('DELETE /profile/earthquake/4', (done) => {
    agent
    .del('/profile/earthquake/4')
    .set('Accept', 'application/json')
    .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
    .expect(200)
    .end(done);
  });

  test('GET /profile/notes with token', (done) => {
    agent
    .get('/profile/notes')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body[0].note_date_time;
    })
    .expect(200, [{
      id: 1,
      user_id: 1,
      event_id: 1,
      is_private: false,
      text: 'I survived this monster!'
    }])
    .end(done);
  });

  test('PUT /profile/notes with token', (done) => {
    /* eslint-disable max-len */
    agent
    .put('/profile/notes')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      event_id: 3,
      is_private: false,
      text: 'This was the time of my life!'}, done)
    .expect('Content-Type', /json/)
    .expect((res) => {
      delete res.body[0].note_date_time;
    })
    .expect(201, [{
      id:4,
      user_id:1,
      event_id: 3,
      is_private: false,
      text: 'This was the time of my life!'}], done)
  });

  test('DELETE /profile/notes with token', (done) => {
    agent
    .del('/profile/notes/1')
    .set('Accept', 'application/json')
    .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
    .expect(200)
    .end(done);
  });

  test('GET /profile/friends with token', (done) => {
    agent
    .get('/profile/friends')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, [{
      user_from: 1,
      user_to: 2
    },
    {
      user_from: 1,
      user_to: 3
    }])
    .end(done);
  });

  test('PUT /profile/friends with token', (done) => {
    /* eslint-disable max-len */
    agent
    .put('/profile/friends/2')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(201, [{user_from:1, user_to:2}])
    .end(done);
  });

  test('DELETE /profile/friends with token', (done) => {
    agent
    .del('/profile/friends/4')
    .set('Accept', 'application/json')
    .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
    .expect(200)
    .end(done);
  });

  test('GET /profile/poi with token', (done) => {
    agent
    .get('/profile/poi')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200, [{
      id: 4,
      user_id: 1,
      lat:  '47.6686667',
      long: '-122.4905',
      is_home: false,
      max_radius: 200,
      label: 'Peggy Sue'
    },
    {
      id: 5,
      user_id: 1,
      lat:  '37.7821',
      long: '-122.4519',
      is_home: false,
      max_radius: 200,
      label: 'Mt. Rushmore'
    }])
    .end(done);
  });

  test('PUT /profile/poi with token', (done) => {
    /* eslint-disable max-len */
    agent
    .put('/profile/poi')
    .set('Accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      lat:  '40.7821',
      long: '-102.4519',
      is_home: false,
      max_radius: 200,
      label: 'Punto Allegro'
    }, done)
    .expect('Content-Type', /json/)
    .expect(201, [{
      id: 8,
      user_id: 1,
      lat:  '40.7821',
      long: '-102.4519',
      is_home: false,
      max_radius: 200,
      label: 'Punto Allegro'
    }])
    .end(done);
  });

  test('DELETE /profile/poi with token', (done) => {
    agent
    .del('/profile/poi/4')
    .set('Accept', 'application/json')
    .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
    .expect(200)
    .end(done);
  });

}));
