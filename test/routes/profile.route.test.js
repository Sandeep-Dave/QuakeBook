'use strict';

process.env.NODE_ENV = 'test';

const { suite, test } = require('mocha');
const request = require('supertest');
const knex = require('../../knex');
const server = require('../../server');
const { addDatabaseHooks } = require('../utils');

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



  // test('POST /token', (done) => {
  //   request(server)
  //     .post('/token')
  //     .set('Accept', 'application/json')
  //     .set('Content-Type', 'application/json')
  //     .send({
  //       email: 'jkrowling@gmail.com',
  //       password: 'youreawizard'
  //     })
  //     .expect('set-cookie', /token=[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+; Path=\/;.+HttpOnly/)
  //     .expect((res) => {
  //       delete res.body.createdAt;
  //       delete res.body.updatedAt;
  //     })
  //     .expect(200, {
  //       id: 1,
  //       firstName: 'Joanne',
  //       lastName: 'Rowling',
  //       email: 'jkrowling@gmail.com'
  //     })
  //     .expect('Content-Type', /json/)
  //     .end(done);
  // });
  //

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
      },done)
      .expect('Content-Type', /json/)
      .expect(200, [{
        id: 4
      }], done);

    });


  // test('PATCH /books/:id', (done) => {
  //   /* eslint-disable max-len */
  //   request(server)
  //     .patch('/books/1')
  //     .set('Accept', 'application/json')
  //     .send({
  //       timezone: 4
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect((res) => {
  //       delete res.body.createdAt;
  //       delete res.body.updatedAt;
  //     })
  //     .expect(200, {
  //       id: 1,
  //       title: 'Think like Python',
  //       author: 'Allen B. Downey',
  //       genre: 'Python stuff',
  //       description: 'More Python',
  //       coverUrl: 'https://s3-us-west-2.amazonaws.com/assessment-images/galvanize_reads/photos/think_python.jpg'
  //     }, done);
  //
  //     /* eslint-enable max-len */
  // });

  test('DELETE /profile', (done) => {
    request(server)
      .del('/token')
      .set('Accept', 'application/json')
      .expect('set-cookie', /token=; Path=\//)
      .expect(200)
      .end(done);
  });


}));
