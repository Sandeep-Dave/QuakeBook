'use strict'

const express    = require('express');
const knex       = require('../knex');
const User  = require('../controllers/user_repostiory');
const router     = express.Router();

/**
* @api {get} /user/:id  Request public profile information about a specific user
* @apiName GetUserById
* @apiGroup User
*
* @apiParam {Number} id           User's unique ID
*
* @apiSuccess {String} name       Name of the User.
* @apiSuccess {String} email      Email of the User.
* @apiSuccess {Integer} timezone  Timezone of the User.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*    "name": 'Joanne Rowling',
*    "email": 'jkrowling@gmail.com',
     "timezone": 9
*    }
*
*
*
*/

router.get('/:id', checkUserLoggedIn, (req, res) => {
  let userId = req.userId;
  let user = new User();
  let id = req.params.id;

  let promiseFromQuery = user.userById(id);

  promiseFromQuery
    .then(user => {
      if(!user) {
        res.sendStatus(404);
        return;
      }
      res.send(user);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

/**
* @api {get} /user/:id/notes  Request public notes posted by a specific user
* @apiName GetNotesById
* @apiGroup User
*
* @apiParam {Number} id                  User's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
* @apiSuccess {Integer} user_id          ID of the user who wrote the note.
* @apiSuccess {Integer} event_id         ID of the event the note was about.
* @apiSuccess {String} note_date_time  Date and time the note was created.
* @apiSuccess {String} text              Text of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*   id: 3,
*   user_id: 3,
*   event_id: 3,
*   note_date_time: ,
*   text: 'I survived this monster!'
*   }
*
*/
router.get('/:id/notes', checkUserLoggedIn, (req, res) => {
  let userId = req.userId;
  let user = new User();
  let id = req.params.id;

  let promiseFromQuery = user.getNotesByUser(id);

  promiseFromQuery
    .then(notes => {
      if (!notes) {
        res.sendStatus(404);
        return;
      }
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

function checkUserLoggedIn(req, res, next) {
  if(!req.cookies.token){
    res.sendStatus(401);
  } else {
    let userObject = jwt.decode(req.cookies.token);
    let userId = userObject.sub.id;
    req.userId = userId;
    next();
  }
}

module.exports = router;
