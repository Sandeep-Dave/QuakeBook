'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

suite('users seeds', addDatabaseHooks(() => {
  test('users values', (done) => {
    knex('users').orderBy('id', 'ASC')
      .then((actual) => {

        const expected = [
          {
            id: 1,
            name: 'Joanne Rowling',
            email: 'jkrowling@gmail.com',
            timezone: 9,
            hashed_password: '$2a$06$XkiKSpNXYMBCtbOszL.9X.exR3Jxg126.2GFInUvwg9hU9TfWpTlW' //kryptic9passWord
          },
          {
            id: 2,
            name: 'Oskar Fischinger',
            email: 'ofischy@gmail.com',
            timezone: -3,
            hashed_password: '$2a$06$30y0zx7luI7w66xvLmIB.ONoxA1j.hgFGwfbmYA2dP6fXYfVuvnL.' //gr8tsaltLake
          },
          {
            id: 3,
            name: 'Amelia Bedelia',
            email: 'amiabaddy@gmail.com',
            timezone: -6,
            hashed_password: '$2a$06$4H3enWFJZU/urCKjdhkAgOa0Kl777tHzWem6Bt.jjpXxpYc38wMvq' //a9gkor8aT
          }
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
