'use strict'

const express       = require('express');
const router        = express.Router();
const jwt           = require('jsonwebtoken');
const env           = require('dotenv');
const checkForToken = require('./helpers').checkForToken;
const verifyUser    = require('./helpers').verifyUser;
const ProfileRepo   = require('../controllers/profile_repository');


/**
* @api {post} /profile/login  Authenticate existing user to the site.
* @apiName UserLogin
* @apiGroup Profile
*
* @apiParam {String} email              User's email
* @apiParam {String} password           User's password
*
* @apiSuccess {Integer} id              ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.post('/login', (req, res) => {
  const repo      = new ProfileRepo();
  const email     = req.body.email;
  const password  = req.body.password;

  repo.checkPassword(email, password)
    .then((verified) => {

      if(verified < 0){
        res.setHeader('Content-Type', 'plain/text');
        res.status(404).send(`Not Found`);
        return;
      }

      let payload = {
  	    iss: 'jwt_lesson_app',
  	    sub: {
  	      user_id: verified;
  	    },
  	    exp: Math.floor(Date.now() / 1000) + (60 * 60),
  	  };

      let token = jwt.sign(payload, process.env.JWT_KEY);

      res.cookie('token', token, {httpOnly: true });

      res.send('Success');
    })
    .catch(err => {
      res.setHeader('Content-Type', 'plain/text');
      res.status(404).send(err);
      return;
    });

});


/**
* @api {get} /profile   Get authenticated user's profile information
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
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "UserNotFound"
*     }
*/
router.get('/', checkForToken, verifyUser, (req, res) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.getUserInfo(decoded.sub.user_id)
    .then((userInfo) => {
      if(userInfo === undefined){
        res.setHeader('Content-Type', 'plain/text');
        res.status(404).send(`User Not Found`);
        return;
      }
      res.send(userInfo);
    })
    .catch(err => {
      throw err;
    });
});

/**
* @api {put} /profile   Create new user profile
* @apiName NewProfile
* @apiGroup Profile
*
* @apiParam {String} name                  User's name
* @apiParam {String} email                 User's unique email address
* @apiParam {String} password              User's password
* @apiParam {Number} timezone              User's timezone
*
* @apiSuccess {Integer} id               New user's ID
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     id: 55,
      name: John Doe,
      email: jdoe@domain.com,
      timezone = -3
*   }
*
* @apiError NotValid The supplied user info was not valid.
* @apiErrorExample {json} Not Valid Error:
*     HTTP/1.1 400 Invalid Info
*     {
*       "error": "Invalid information"
*     }
*/
router.put('/', (req, res) => {

  
});

/**
* @api {post} /profile
* @apiName UpdateProfile
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.post('/', (req, res) => {

});

/**
* @api {delete} /profile
* @apiName DeleteProfile
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.delete('/', (req, res) => {

});

/**
* @api {get} /profile/earthquakes
* @apiName GetProfileEarthquakes
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.get('/earthquakes', (req, res) => {

});

/**
* @api {put} /profile/earthquakes
* @apiName SaveProfileEarthquake
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.put('/earthquakes', (req, res) => {

});

/**
* @api {delete} /profile/earthquakes/:id
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
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.delete('/earthquake/:id', (req, res) => {

});

/**
* @api {get} /profile/notes
* @apiName GetProfileNotes
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.get('/notes', (req, res) => {

});

/**
* @api {put} /profile/notes
* @apiName NewProfileNote
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.put('/notes', (req, res) => {

});

/**
* @api {post} /profile/notes
* @apiName UpdateProfileNote
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.post('/notes/:id', (req, res) => {

});

/**
* @api {delete} /profile/notes
* @apiName RemoveProfileNote
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.delete('/notes/:id', (req, res) => {

});

/**
* @api {get} /profile/friends
* @apiName GetProfileFriends
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.get('/friends', (req, res) => {

});

/**
* @api {put} /profile/friends
* @apiName NewProfileFriend
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.put('/friends/:id', (req, res) => {

});

/**
* @api {delete} /profile/friends
* @apiName RemoveProfileFriend
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.delete('/friends/:id', (req, res) => {

});

/**
* @api {get} /profile/poi
* @apiName GetProfilePOIs
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.get('/poi', (req, res) => {

});

/**
* @api {put} /profile/poi
* @apiName NewProfilePOI
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.put('/poi', (req, res) => {

});

/**
* @api {delete} /profile/poi/:id
* @apiName RemoveProfilePOI
* @apiGroup Profile
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/
router.delete('/poi/:id', (req, res) => {

});










module.exports = router;
