'use strict'

const express    = require('express');
const knex       = require('../knex');
const Eartquake  = require('../controllers/earthquake_repostiory');
const router     = express.Router();

/**
* @api {get} /earthquake/:id  Request information about a specific earthquake
* @apiName GetEarthquakeById
* @apiGroup Earthquake
*
* @apiParam {Number} id                  Earthquake's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
* @apiSuccess {Integer} user_id          ID of the user who wrote the note.
* @apiSuccess {Integer} event_id         ID of the event the note was about.
* @apiSuccess {String} note_date_time    Date and time the note was created.
* @apiSuccess {String} text              Text of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*  {
*  id: 4,
*  description: "5km NNE of Bainbridge Island, Washington",
*  date_time: 2017-06-23T13:42:24.000Z,
*  last_updated: 2017-06-23T14:42:24.000Z,
*  tz_offset: -480,
*  magnitude: 1.1,
*  long:  '-122.4905',
*  lat:  '47.6686667',
*  depth:  4.58,
*  usgs_id: "uw61276557"
*  }
*
* @apiError EventNotFound The earthquake event was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "EventNotFound"
*     }
*/

router.get('/:id', (req, res) => {
  let earthquake = new Earthquake();
  let id = req.params.id;
  let promiseFromQuery = earthquake.earthquakeById(id);
  promiseFromQuery
    .then(earthquake => {
      if(!earthquake){
        res.sendStatus(404);
        return;
      }
      res.send(earthquake);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/**
* @api {get} /earthquake/:id/notes  Request public notes posted about a specific earthquake
* @apiName GetNotesByEarthquakeId
* @apiGroup Earthquake
*
* @apiParam {Number} id                  Earthquake's unique ID
*
* @apiSuccess {Integer} id               ID of the note.
* @apiSuccess {Integer} user_id          ID of the user who wrote the note.
* @apiSuccess {Integer} event_id         ID of the event the note was about.
* @apiSuccess {String} note_date_time    Date and time the note was created.
* @apiSuccess {String} text              Text of the note.
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*   id: 3,
*   user_id: 3,
*   event_id: 3,
*   note_date_time: 2017-06-23T13:42:24.000Z,
*   text: 'I survived this monster!'
*   }
*
* @apiError NoteNotFound The note was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "NoteNotFound"
*     }
*/

router.get('/:id/notes', (req, res) => {
  let earthquake = new Earthquake();
  let id = req.params.id;
  let promiseFromQuery = earthquake.notesById(id);

  promiseFromQuery
    .then(notes => {
      if(!notes) {
        res.sendStatus(404);
        return;
      }
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});


module.exports = router;
