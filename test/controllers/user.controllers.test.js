'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')
const Repo  = require('../../controllers/user_repository');
const repo = new Repo();

suite('user controllers', addDatabaseHooks(() => {

  test('get public user profile info by user id', (done) => {
    repo.userById(3)
      .then((actual) => {
        const expected = {
                        email: 'amiabaddy@gmail.com',
                        name: 'Amelia Bedelia',
                        timezone: -6 };
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
        .catch((err) => {
          done(err);
        });
      });

  test('return public notes by user id', (done) => {
    repo.notesByUser(3)
      .then((actual) => {
        delete actual[0].note_date_time;
        const expected = [{
                        event_id: 3,
                        id: 3,
                        text: 'I survived this monster!' }];

        assert.deepEqual(actual, expected, 'failed');
          done();
        })
        .catch((err) => {
          done(err);
        });
      });

}));
