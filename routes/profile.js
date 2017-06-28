'use strict'

const express       = require('express');
const router        = express.Router();
const checkForToken = require('./helpers').checkForToken;
const verifyUser    = require('./helpers').verifyUser;
const jwt           = require('jsonwebtoken');
const ProfileRepo   = require('../controllers/profile_repository');


router.post('/login', checkForToken, verifyUser, (req, res, next) => {
  const repo    = new ProfileRepo();
  var username = req.body.username;
  var password = req.body.password;

  repo.login(decoded.sub.user_id)//TODO verify function sig
    .then((userInfo) => {
      res.send(userInfo);
      return;
    })
    .catch(err => {
      res.status(404).send(err);
      return;
    })
});


router.get('/', checkForToken, verifyUser, (req, res, next) => {
  const repo    = new ProfileRepo();
  const decoded = jwt.decode(req.cookies.token);

  repo.query(decoded.sub.user_id)//TODO verify function sig
    .then((userInfo) => {
      res.send(userInfo);
      return;
    })
    .catch(err => {
      res.status(404).send(err);
      return;
    })
});





/**
* @api {post} /profile/login
* @apiName UserLogin
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
router.post('/login', (req, res) => {

});


/**
* @api {get} /profile
* @apiName GetProfile
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
router.get('/', (req, res) => {

});

/**
* @api {put} /profile
* @apiName NewProfile
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
