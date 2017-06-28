'use strict';

process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const { suite, test } = require('mocha');
const knex = require('../../knex');
const { addDatabaseHooks } = require('../utils')
const Profile  = require('../../controllers/profile_repository');
const profile = new Profile();


suite('profile controllers', addDatabaseHooks(() => {

  test('get user info with user id', (done) => {
    profile.getUserInfo(1)
      .then((actual) => {
        const expected = {
          name: 'Joanne Rowling',
          email: 'jkrowling@gmail.com',
          timezone: 9
        };
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
        .catch((err) => {
          done(err);
        });
      })

  test('add user to database', (done) => {
    profile.addUser({
      name: 'Ducky Vohname',
      email: 'kemosaby@gmail.com',
      timezone: 7,
      hashed_password: '$2a$06$DUH3ptEDNwoQQw51.XWrD.0/LFxhwk.INeg0brnTZXPJLVfQWh/Da' //mtRushm0Re
    })
      .then((actual) => {
        const expected = [{
          id: 4
        }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('delete a user from the database', (done) => {
    profile.deleteUser(2)
      .then((actual) => {
        const expected =
          [{
            name: 'Oskar Fischinger',
            email: 'ofischy@gmail.com',
            timezone: -3
          }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('update a user in the database', (done) => {
    profile.updateUser(2, {email: 'fishy@gmail.com'})
      .then((actual) => {
        const expected =
          [{
            name: 'Oskar Fischinger',
            email: 'fishy@gmail.com',
            timezone: -3
          }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('query saved earthquakes table', (done) => {
    profile.queryEvents(2)
      .then((actual) => {
        const expected =
          [{
            user_id: 2,
            event_id: 2
          },
          {
            user_id: 2,
            event_id: 3
          }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('add event to a user\'s saved earthquakes table', (done) => {
    profile.addEvent(1, 2)
      .then((actual) => {
        const expected =
          [{
            user_id: 2,
            event_id: 1
          }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('delete event from a user\'s saved earthquakes table', (done) => {
    profile.deleteEvent(1, 2)
      .then((actual) => {
        const expected =
          [];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('return all public notes from a user\'s profile', (done) => {
    profile.queryNotesByUser(1)
      .then((actual) => {
        const expected =
          [{
          event_id: 1,
          id: 1,
          is_private: false,
          text: "I survived this monster!",
          user_id: 1
        }];
        delete actual[0].note_date_time;
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('post a note to a user\'s profile', (done) => {
    profile.addNote({
      event_id: 1,
      is_private: false,
      text: 'I was here',
    }, 1)
      .then((actual) => {
        const expected =
          [{
          event_id: 1,
          id: 4,
          is_private: false,
          text: "I was here",
          user_id: 1
        }];
        delete actual[0].note_date_time;
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('delete a note from a user\'s profile', (done) => {
    profile.deleteNote(1)
      .then((actual) => {
        const expected =
          [{
          event_id: 1,
          id: 1,
          is_private: false,
          text: "I survived this monster!",
          user_id: 1
        }];
        delete actual[0].note_date_time;
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('return all friends for a particular user', (done) => {
    profile.queryFriends(1)
      .then((actual) => {
        const expected =
          [{
            user_from: 1,
            user_to: 2
          },
          {
            user_from: 1,
            user_to: 3
          }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('add a friend to a particular user\'s profile', (done) => {
    profile.addFriend(3,2)
      .then((actual) => {
        const expected =
          [{
            user_from: 3,
            user_to: 2
          }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('delete a friend from a particular user\'s profile', (done) => {
    profile.deleteFriend(3,2)
      .then((actual) => {
        const expected =
          [{
            user_from: 3,
            user_to: 2
          }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('return a list of points of interest from a particular user\'s profile', (done) => {
    profile.queryPOIs(2)
      .then((actual) => {
        const expected =
          [{
            id: 1,
            user_id: 2,
            lat: '47.6686667',
            long: '-122.4905',
            is_home: false,
            label: 'The Eiffel Tower',
            max_radius: 200 },
            {
            id: 2,
            user_id: 2,
            lat: '37.86209',
            long: '-122.29521',
            is_home: true,
            label: 'home',
            max_radius: 150 },
            {
            id: 3,
            user_id: 2,
            lat: '37.69322',
            long: '-122.4653',
            is_home: false,
            label: 'Mom\'s house',
            max_radius: 200 }];
        assert.deepEqual(actual, expected, 'failed');
          done();
        })
      .catch((err) => {
          done(err);
        });
      });

  test('add a point of interest to a particular user\'s profile', (done) => {
  profile.addPOI({
    lat: '48.8584',
    long: '12.25905',
    is_home: false,
    label: 'Leaning Tower of Pisa',
    max_radius: 200 }, 2)
    .then((actual) => {
      const expected =
        [{
          id: 8,
          user_id: 2,
          lat: '48.8584',
          long: '12.25905',
          is_home: false,
          label: 'Leaning Tower of Pisa',
          max_radius: 200 }];
      assert.deepEqual(actual, expected, 'failed');
        done();
      })
    .catch((err) => {
        done(err);
      });
    });

  test('delete points of interest from a particular user\'s profile', (done) => {
  profile.deletePOI(1,2)
    .then((actual) => {
      const expected =
        [{
          id: 1,
          user_id: 2,
          lat: '47.6686667',
          long: '-122.4905',
          is_home: false,
          label: 'The Eiffel Tower',
          max_radius: 200 }];
      assert.deepEqual(actual, expected, 'failed');
        done();
      })
    .catch((err) => {
        done(err);
      });
    });

}));
