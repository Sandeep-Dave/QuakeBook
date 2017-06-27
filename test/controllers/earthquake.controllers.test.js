'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')
const Repo  = require('../../controllers/earthquake_repository');
const repo = new Repo();


suite('earthquake controllers', addDatabaseHooks(() => {

  test('get earthquake by id', (done) => {
    repo.earthquakeById(1)
      .then((actual) => {
        const expected = {
          id: 1,
          date_time: new Date('2017-06-23T21:31:06.000Z'),
          tz_offset: -540,
          last_updated: new Date('2017-06-23T21:36:55.000Z'),
          lat: '61.6006',
          long: '-149.9249',
          depth: 32.9,
          magnitude: 1.5,
          description: '6km WSW of Houston, Alaska',
          usgs_id: 'ak16217780'
        };

        assert.deepEqual(actual, expected, 'failed');
          done();
        })
        .catch((err) => {
          done(err);
        });
      })


    }));

// 'use strict'
//
// const Repo = require('../../controllers/earthquake_repository');
// const expect = require('chai').expect;
//
// var repo = new Repo();
//
// describe('earthquake controllers', () => {
//   describe('get event by id', () => {
//     it('should be a function', () => {
//       expect(repo.earthquakeById).to.exist;
//     });
//     it('should return an object', () => {
//       repo.earthquakeById(1)
//         .then((resolved) => {
//           return expect(resolved.name).to.be.undefined;
//           done();
//         })
//         .catch(err => err);
//     });
//
//
//   });
// });