'use strict'

const express       = require('express');
const router        = express.Router();
const jwt           = require('jsonwebtoken');
const env           = require('dotenv');
const bcrypt        = require('bcrypt');
const checkForToken = require('./helpers').checkForToken;
const verifyUser    = require('./helpers').verifyUser;
const ProfileRepo   = require('../controllers/profile_repository');

/**
* @api {post} /profile/login  Authenticate existing user to the site.
* @apiVersion 1.0.0
* @apiName UserLogin
* @apiGroup Profile
*
* @apiParam {String} email              User's email
* @apiParam {String} password           User's password
*
* @apiSuccess {Integer} id              ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 204 NO CONTENT
*
*
*
*
* @apiError UserNotFound The note was not found.
* @apiErrorExample {text} Not Found Error:
*     HTTP/1.1 404 Not Found
*
*     Not Found
*
*/
router.post('/login', (req, res) => {
  const repo      = new ProfileRepo();
  const email     = req.body.email;
  const password  = req.body.password;
  var user_id;

  repo.getHashedPassword(email)
    .then((resolved) => {
      if(resolved === undefined){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send(`Not Found`);
        return;
      }
      user_id = resolved.id;
      return bcrypt.compare(password, resolved.hashed_password);
    })
    .then((isMatched) => {

      if(!isMatched){
        res.setHeader('Content-Type', 'text/plain');
        res.status(403).send(`Not Authorized`);
        return;
      }
      let payload = {
  	    iss: 'jwt_lesson_app',
  	    sub: {
  	      user_id: user_id
  	    },
  	    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  	  };

      let token = jwt.sign(payload, process.env.JWT_KEY);

      res.cookie('token', token, {httpOnly: true });
      res.setHeader('Content-Type', 'application/json');
      res.status(204).send(true);
      return;
    })
    .catch(err => {
      res.setHeader('Content-Type', 'text/plain');
      res.status(404).send(err);
      return;
    });

});

/**
* @api {get} /profile   Get authenticated user's profile information
* @apiVersion 1.0.0
* @apiName GetProfile
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID from token
*
* @apiSuccess {String} name              User's name
* @apiSuccess {String} email             User's email (account name)
* @apiSuccess {Integer} timezone         Integer offset for user's timezone
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     name: Oskar Fischinger,
      email: ofischy@gmail.com,
      timezone: 9
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Not Found Error:
*     HTTP/1.1 404 Not Found
*
*     User Not Found
*
*/
router.get('/', checkForToken, verifyUser, (req, res) => {
  const repo = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.getUserInfo(decoded.sub.user_id)
    .then((userInfo) => {
      if(userInfo === undefined){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send(`User Not Found`);
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.send(userInfo);
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {put} /profile   Create new user profile
* @apiVersion 1.0.0
* @apiName NewProfile
* @apiGroup Profile
*
* @apiParam {String} name                  User's name
* @apiParam {String} email                 User's unique email address
* @apiParam {String} password              User's password
* @apiParam {Number} timezone              User's timezone
*
* @apiSuccess {Integer} id                 New user's ID
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 201 CREATED
*   {
*     id: 55
*   }
*
* @apiError NotValid The supplied user info was not valid.
* @apiErrorExample {text} Invalid User Error:
*     HTTP/1.1 400 Invalid Info
*
*     Invalid User Information
*
*/
router.put('/', (req, res) => {

  const repo = new ProfileRepo();

  if(req.body === undefined || req.body.name === undefined || req.body.email === undefined || req.body.password === undefined || req.body.timezone === undefined){
    res.setHeader('Content-Type', 'text/plain');
    res.status(400).send(`Invalid User Information`);
    return;
  }

  var user = {name: req.body.name
            , email: req.body.email
            , timezone: req.body.timezone};

  bcrypt.hash(req.body.password, 12)
  .then((hash) => {
    user.hashed_password = hash;
    return repo.addUser(user);
  })
  .then((addedUserId) => {
    if(addedUserId < 0){
      res.setHeader('Content-Type', 'text/plain');
      res.status(400).send(`Invalid User Information`);
      return;
    }
    res.status(201).send(addedUserId);
  })
  .catch(err => {
    throw err;
  });
});

/**
* @api {post} /profile    Update user profile information
* @apiVersion 1.0.0
* @apiName UpdateProfile
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the user.
* @apiSuccess {String} name              User's name
* @apiSuccess {String} email             User's email address
* @apiSuccess {Integer} timezone         User's timezone
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     id: 67,
      name: Phil Hartman,
      email: cavemanlawyer@mindspring.org,
      timezone: 9
*   }
*
* @apiError UserNotFound The user was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid User Information
*
*/
router.post('/', checkForToken, verifyUser, (req, res) => {

  if(req.body === undefined || (req.body.name === undefined && req.body.email === undefined && req.body.timzone === undefined && req.body.password === undefined)){
    res.setHeader('Content-Type', 'text/plain');
    res.status(400).send(`Invalid User Information`);
    return;
  }

  let changes = {};
  if(req.body.name){
    changes.name = req.body.name;
  }
  if(req.body.email){
    changes.email = req.body.email;
  }
  if(req.body.timezone){
    changes.timezone = req.body.timezone;
  }

  var returned_hash = Promise.resolve(false);
  if(req.body.password){
    returned_hash = bcrypt.hash(req.body.password, 12);
  }
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  returned_hash
    .then((resolved_password) => {
      if(resolved_password){
        changes.hashed_password = resolved_password;
      }
      return repo.updateUser(decoded.sub.user_id, changes);
    })
    .then((updatedUser) => {
      if(updatedUser === undefined){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid User Information`);
        return;
      }
      res.send(updatedUser);
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {delete} /profile    Deletes user profile
* @apiVersion 1.0.0
* @apiName DeleteProfile
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the User.
* @apiSuccess {String} name              User's name
* @apiSuccess {String} email             User's email
* @apiSuccess {Integer} timezone         User's timezone
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     id: 18,
*     name: Helen Mirren,
*     email: iwasinexcalliber@yahoo.com,
*     timezone: 0
*   }
*
* @apiError UserNotFound The user was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid User Information
*
*/
router.delete('/', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.deleteUser(decoded.sub.user_id)
    .then((deletedUser) => {
      if(deletedUser === undefined){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid User Information`);
        return;
      }
      res.cookie('token', '', {httpOnly: true });
      res.send(deletedUser);
    })
    .catch(err => {
      throw err;
    });

});

/**
* @api {get} /profile/earthquakes   Return all earthquakes saved in profile
* @apiVersion 1.0.0
* @apiName GetProfileEarthquakes
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Number} id               ID of the note.
* @apiSuccess {String} date_time               ID of the note.
* @apiSuccess {Number} tz_offset               ID of the note.
* @apiSuccess {String} last_updated               ID of the note.
* @apiSuccess {String} lat               ID of the note.
* @apiSuccess {String} long               ID of the note.
* @apiSuccess {Number} depth               ID of the note.
* @apiSuccess {Number} magnitude               ID of the note.
* @apiSuccess {String} description               ID of the note.
* @apiSuccess {String} usgs_id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   [
*    {
*     id: ,
*     date_time: ,
*     tz_offset: ,
*     last_updated: ,
*     lat: ,
*     long: ,
*     depth: ,
*     magnitude: ,
*     description: ,
*     usgs_id:
*    }
*   ]
*
* @apiError EventNotFound The earthquake event was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid User Information
*
*/
router.get('/earthquakes', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.queryEvents(decoded.sub.user_id)
    .then((returnedEvents) => {
      if(returnedEvents === undefined || returnedEvents.length < 0){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid User Information`);
        return;
      }

      res.send(returnedEvents);
    })
    .catch(err => {
      throw err;
    });
});

/**
<<<<<<< HEAD
* @api {put} /profile/earthquakes  Add existing event to profile's saved list
* @apiVersion 1.0.0
=======
* @api {put} /profile/earthquakes     Add existing event to profile's saved list
>>>>>>> 805df7d4b243f7eff383c5819a55c75195d205b0
* @apiName SaveProfileEarthquake
* @apiGroup Profile
*
* @apiParam {Number} user_id          User's unique ID from token
* @apiParam {Number} event_id         Earthquake event's unique ID
*
* @apiSuccess {Number} user_id          User's ID
* @apiSuccess {Number} event_id         Earthquake event's id
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 20 CREATED
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid User Information
*
*/
router.put('/earthquakes/:id', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.addEvent(req.params.id, decoded.sub.user_id)
    .then((returned) => {
      if(returned === undefined){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid User Information`);
        return;
      }
      res.status(201).send(returned);
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {delete} /profile/earthquakes/:id Delete saved earthquake from profile.
* @apiVersion 1.0.0
* @apiName RemoveProfileEarthquake
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     id:3
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Not Found Error:
*     HTTP/1.1 404 Not Found
*
*     Not Found
*
*/
router.delete('/earthquake/:id', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);
  const token = req.cookies.token;

  repo.deleteEvent(req.params.id, decoded.sub.user_id)
    .then((returned) => {
      if(returned.length!==0){
        res.cookie('token', token, {httpOnly: true });
        res.send(returned);
      } else if (returned.length === 0) {
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send(`Not Found`);
        return;
      }
    })
    .catch(err => {
      throw err;
    });
});

/**
<<<<<<< HEAD
* @api {get} /profile/notes Get all user notes.
* @apiVersion 1.0.0
=======
* @api {get} /profile/notes              Return all saved notes in a users profile
>>>>>>> 805df7d4b243f7eff383c5819a55c75195d205b0
* @apiName GetProfileNotes
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Number} id               ID of the note.
* @apiSuccess {Number} user_id               ID of the user.
* @apiSuccess {Number} event_id               ID of the eventy.
* @apiSuccess {String} note_date_time         DateTime note was created.
* @apiSuccess {String} text               Content of note
* @apiSuccess {Boolean} is_private        Whether note is publically viewable.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   [
*    {
*     id: 11,
*     user_id: 4,
*     event_id: 88,
*     note_date_time: '2017-06-27 17:18:28.506846-07',
*     text: 'I survived this monster!',
*     is_private: false
*    }
*   ]
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid User Information
*
*/
router.get('/notes', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.queryNotesByUser(decoded.sub.user_id)
    .then((returnedNotes) => {
      if(returnedNotes === undefined || returnedNotes.length < 0){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid User Information`);
        return;
      }

      res.send(returnedNotes);
    })
    .catch(err => {
      throw err;
    });
});

/**
<<<<<<< HEAD
* @api {put} /profile/notes   Create new note.
* @apiVersion 1.0.0
=======
* @api {put} /profile/notes   Create new note, add to users profile.
>>>>>>> 805df7d4b243f7eff383c5819a55c75195d205b0
* @apiName NewProfileNote
* @apiGroup Profile
*
* @apiParam {Number} user_id    User's unique ID
* @apiParam {Number} event_id   ID for earthquake event to which this note is attached
* @apiParam {String} text       Note text
* @apiParam {Boolean} is_private  Whether note is public or private
*
* @apiSuccess {Integer} id      ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 201 CREATED
*   {
*     id: 14,
*     user_id: 8,
*     event_id: 4,
*     note_date_time: '2017-06-27 17:18:28.506846-07',
*     text: 'I survived this monster!',
*     is_private: false
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Bad Requesrt Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid Note Values
*
*/
router.put('/notes', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);


  if(req.body === undefined || req.body.event_id === undefined || req.body.text === undefined || req.body.is_private === undefined){
    res.setHeader('Content-Type', 'text/plain');
    res.status(400).send(`Invalid Note Values`);
    return;
  }

  var note = {event_id: req.body.event_id,
              text: req.body.text,
              is_private: req.body.is_private};

  repo.addNote(note, decoded.sub.user_id)
    .then((returned) => {
      if(returned === undefined){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid Note Values`);
        return;
      }

      res.status(201).send(returned);
    })
    .catch(err => {
      throw err;
    });
});

/**
<<<<<<< HEAD
* @api {delete} /profile/notes  Delete one of user's own notes.
* @apiVersion 1.0.0
=======
* @api {delete} /profile/notes          Delete note with specific id saved in users profile
>>>>>>> 805df7d4b243f7eff383c5819a55c75195d205b0
* @apiName RemoveProfileNote
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Number} id               ID of the note.
* @apiSuccess {Number} user_id               ID of the user.
* @apiSuccess {Number} event_id               ID of the eventy.
* @apiSuccess {String} note_date_time         DateTime note was created.
* @apiSuccess {String} text               Content of note
* @apiSuccess {Boolean} is_private        Whether note is publically viewable.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*    {
*     id: 11,
*     user_id: 4,
*     event_id: 88,
*     note_date_time: '2017-06-27 17:18:28.506846-07',
*     text: 'I survived this monster!',
*     is_private: false
*    }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Not Found Error:
*     HTTP/1.1 404 Not Found
*
*     Not Found
*
*/
router.delete('/notes/:id', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);
  const token = req.cookies.token;


  repo.deleteNote(req.params.id)
    .then((returned) => {
      if(returned.length === 0){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send(`Not Found`);
        return;
      } else {
        res.cookie('token', token, {httpOnly: true });
        res.send(returned);
      }
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {get} /profile/friends Get profile details of a user on friends list.
* @apiVersion 1.0.0
* @apiName GetProfileFriends
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} user_from               ID of the current user.
* @apiSuccess {Integer} user_to               ID of the user's friend.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   [
*    {
*     user_from: 1,
*     user_to: 4
*    },
*    {
*     user_from: 1,
*     user_to: 6
*    }
*   ]
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid User Information
*
*/
router.get('/friends', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.queryFriends(decoded.sub.user_id)
    .then((returnedFriends) => {
      if(returnedFriends === undefined || returnedFriends.length < 0){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid User Information`);
        return;
      }

      res.send(returnedFriends);
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {put} /profile/friends Add a user to friends list.
* @apiVersion 1.0.0
* @apiName NewProfileFriend
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
* @apiParam {Number} user_id             Other User ID to add as Friend
*
* @apiSuccess {Integer} user_from               ID of the current user.
* @apiSuccess {Integer} user_to               ID of the user's friend.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 201 CREATED
*    {
*     user_from: 1,
*     user_to: 4
*    }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid User Information
*
*/
router.put('/friends/:id', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.addFriend(decoded.sub.user_id, req.params.id)
    .then((returned) => {
      if(returned === undefined){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid User Information`);
        return;
      }
      res.status(201).send(returned);
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {delete} /profile/friends  Remove a friend from user's list.
* @apiVersion 1.0.0
* @apiName RemoveProfileFriend
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} user_from               ID of the current user.
* @apiSuccess {Integer} user_to               ID of the user's friend.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     user_from: 1,
*     user_to: 4
*    }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Not Found Error:
*     HTTP/1.1 404 Not Found
*
*     Not Found
*
*/
router.delete('/friends/:id', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);
  const token = req.cookies.token;


  repo.deleteFriend(decoded.sub.user_id, req.params.id)
    .then((returned) => {
      if(returned.length === 0){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send(`Not Found`);
        return;
      } else {
        res.cookie('token', token, {httpOnly: true });
        res.send(returned);
      }
    })
    .catch(err => {
      throw err;
    });
});

/**
<<<<<<< HEAD
* @api {get} /profile/poi   Get list of user's Points-of-Interest.
* @apiVersion 1.0.0
=======
* @api {get} /profile/poi               Get
>>>>>>> 805df7d4b243f7eff383c5819a55c75195d205b0
* @apiName GetProfilePOIs
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Number} user_id           User's unique ID
* @apiSuccess {String} lat               location's latitude
* @apiSuccess {String} long              location's longitude
* @apiSuccess {Boolean} is_home          Whether location is user's home loc
* @apiSuccess {String} label             Description of location
* @apiSuccess {Number} max_radius        Search radius (km)
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     id: 1,
*     user_id: 2,
*     lat: 47.6686667,
*     long: -122.4905,
*     is_home: false,
*     label: The Eiffel Tower,
*     max_radius: 200
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 400 Bad Request
*
*     Invalid User Information
*
*/
router.get('/poi', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.queryPOIs(decoded.sub.user_id)
    .then((returnedPOIs) => {
      if(returnedPOIs === undefined || returnedPOIs.length < 0){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid User Information`);
        return;
      }

      res.send(returnedPOIs);
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {put} /profile/poi   Add a Point-of_interest to user's list.
* @apiVersion 1.0.0
* @apiName NewProfilePOI
* @apiGroup Profile
*
* @apiParam {Number} user_id           User's unique ID
* @apiParam {String} lat               location's latitude
* @apiParam {String} long              location's longitude
* @apiParam {Boolean} is_home          Whether location is user's home loc
* @apiParam {String} label             Description of location
* @apiParam {Number} max_radius        Search radius (km)
*
* @apiSuccess {Number} user_id           User's unique ID
* @apiSuccess {String} lat               location's latitude
* @apiSuccess {String} long              location's longitude
* @apiSuccess {Boolean} is_home          Whether location is user's home loc
* @apiSuccess {String} label             Description of location
* @apiSuccess {Number} max_radius        Search radius (km)
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 201 CREATED
*   {
*     id: 1,
*     user_id: 2,
*     lat: 47.6686667,
*     long: -122.4905,
*     is_home: false,
*     label: The Eiffel Tower,
*     max_radius: 200
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Bad Request Error:
*     HTTP/1.1 404 Bad Request
*
*     Invalid POI Values
*
*/
router.put('/poi', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  if(req.body === undefined || req.body.lat === undefined || req.body.long === undefined || req.body.is_home === undefined || req.body.label === undefined || req.body.max_radius === undefined) {
    res.setHeader('Content-Type', 'text/plain');
    res.status(400).send(`Invalid POI Values`);
    return;
  }

  var poi = {lat: req.body.lat,
             long: req.body.long,
             is_home: req.body.is_home,
             label: req.body.label,
             max_radius: req.body.max_radius};

  repo.addPOI(poi, decoded.sub.user_id)
    .then((returned) => {
      if(returned === undefined){
        res.setHeader('Content-Type', 'text/plain');
        res.status(400).send(`Invalid Note Values`);
        return;
      } else {
        res.status(201).send(returned);
      }
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {delete} /profile/poi/:id  Remove a point-of-interest from list.
* @apiVersion 1.0.0
* @apiName RemoveProfilePOI
* @apiGroup Profile

* @apiParam {Number} user_id             User's unique ID
* @apiParam {Number} id                  Point of Interest unique ID
*
* @apiSuccess {Number} poi_id            Point of Interest unique ID
* @apiSuccess {String} lat               location's latitude
* @apiSuccess {String} long              location's longitude
* @apiSuccess {Boolean} is_home          Whether location is user's home loc
* @apiSuccess {String} label             Description of location
* @apiSuccess {Number} max_radius        Search radius (km)
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     id: 1,
*     user_id: 2,
*     lat: 47.6686667,
*     long: -122.4905,
*     is_home: false,
*     label: The Eiffel Tower,
*     max_radius: 200
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {text} Not Found Error:
*     HTTP/1.1 404 Not Found
*
*     Not Found
*
*/
router.delete('/poi/:id', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);
  const token = req.cookies.token;


  repo.deletePOI(req.params.id, decoded.sub.user_id)
    .then((returned) => {
      if(returned.length === 0){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send(`Not Found`);
        return;
      } else {
        res.cookie('token', token, {httpOnly: true });
        res.send(returned);
      }
    })
    .catch(err => {
      throw err;
    });
});










module.exports = router;
