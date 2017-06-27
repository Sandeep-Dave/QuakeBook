'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')

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
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS'
          },
          {
            id: 2,
            name: 'Oskar Fischinger',
            email: 'ofischy@gmail.com',
            timezone: -3,
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS'
          },
          {
            id: 3,
            name: 'Amelia Bedelia',
            email: 'amiabaddy@gmail.com',
            timezone: -6,
            hashed_password: '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS'
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
