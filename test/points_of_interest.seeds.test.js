'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../knex');
const { addDatabaseHooks } = require('./utils')

suite('points_of_interest seeds', addDatabaseHooks(() => {
  test('points_of_interest values', (done) => {
    knex('points_of_interest').orderBy('id', 'ASC')
      .then((actual) => {

        const expected = [
          {
            id: 1,
            user_id: 2,
            lat:  '47.6686667',
            long: '-122.4905',
            is_home: false,
            max_radius: 200,
            label: 'The Eiffel Tower'
          },
          {
            id: 2,
            user_id: 2,
            lat:  '37.86209',
            long: '-122.29521',
            is_home: true,
            max_radius: 150,
            label: 'home'
          },
          {
            id: 3,
            user_id: 2,
            lat:  '37.69322',
            long: '-122.4653',
            is_home: false,
            max_radius: 200,
            label: 'Mom\'s house'
          },
          {
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
          },
          {
            id: 6,
            user_id: 3,
            lat:  '37.7896',
            long: '-122.4035',
            is_home: true,
            max_radius: 300,
            label: 'My house'
            },
            {
              id: 7,
            user_id: 3,
            lat:  '47.6686',
            long: '-122.4905',
            is_home: false,
            max_radius: 300,
            label: 'Statue of Liberty'
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
