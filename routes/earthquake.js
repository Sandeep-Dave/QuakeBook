'use strict'

const express    = require('express');
const knex       = require('../knex');
const Earthquake  = require('../controllers/earthquake_repository');
const router     = express.Router();


/**
* @api {get} /earthquake/:id/notes  Request public notes posted about a specific earthquake
* @apiVersion 1.0.0
* @apiName GetNotesByEarthquakeId
* @apiGroup Earthquake
*
* @apiParam {Number} id                  Earthquake's unique ID
*
* @apiSuccess {Number} id                ID of the note.
* @apiSuccess {Number} user_id           ID of the user who wrote the note.
* @apiSuccess {Number} event_id          ID of the event the note was about.
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
      res.setHeader('Content-Type', 'application/json');
      res.send(notes);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/**
* @api {get} /earthquake/:id  Request information about a specific earthquake
* @apiVersion 1.0.0
* @apiName GetEarthquakeById
* @apiGroup Earthquake
*
* @apiParam {Number} id                  Earthquake's unique ID
*
* @apiSuccess {Number} id                ID of the earthquake event.
* @apiSuccess {String} date_time         Date/time of event.
* @apiSuccess {Number} tz_offset         Timezone offset from UTC.
* @apiSuccess {String} last_updated      Date/time when event was most recently updated.
* @apiSuccess {String} lat               Latitude of event.
* @apiSuccess {String} long              Longitude of event.
* @apiSuccess {Number} depth             Depth of event in km.
* @apiSuccess {Number} magnitude         Magnitude of event.
* @apiSuccess {String} description       Brief description of event.
* @apiSuccess {String} usgs_id           USGS ID for event
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
      res.setHeader('Content-Type', 'application/json');
      res.send(earthquake);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

/**
* @api {put} /profile   Create new earthquake event
* @apiName AddEarthquake
* @apiGroup Earthquake
*
* @apiParam {Number} id                  Earthquake's unique ID
*
* @apiSuccess {Number} id                ID of the earthquake event.
* @apiSuccess {String} date_time         Date/time of event.
* @apiSuccess {Number} tz_offset         Timezone offset from UTC.
* @apiSuccess {String} last_updated      Date/time when event was most recently updated.
* @apiSuccess {String} lat               Latitude of event.
* @apiSuccess {String} long              Longitude of event.
* @apiSuccess {Number} depth             Depth of event in km.
* @apiSuccess {Number} magnitude         Magnitude of event.
* @apiSuccess {String} description       Brief description of event.
* @apiSuccess {String} usgs_id           USGS ID for event
*
* @apiSuccess {Number} id               New user's ID
*
* @apiSuccessExample Success-Response:
*   HTTP/1.1 200 OK
*   {
*     id: 55
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

  let earthquake = new Earthquake();

  if(!req.body || !req.body.date_time || !req.body.tz_offset || !req.body.last_updated || !req.body.lat || !req.body.long || !req.body.depth || !req.body.magnitude || !req.body.description || !req.body.usgs_id){
    res.setHeader('Content-Type', 'plain/text');
    res.status(400).send(`Invalid Earthquake Information`);
    return;
  }

  var event = {date_time: req.body.date_time,
               tz_offset: req.body.timezone,
               last_updated: req.body.last_updated,
               lat: req.body.lat,
               long: req.body.long,
               depth: req.body.depth,
               magnitude: req.body.magnitude,
               description: req.body.description,
               usgs_id: req.body.usgs_id};

  let promiseFromQuery = earthquake.addEarthquake(event);

  promiseFromQuery
    .then(event => {
      res.setHeader('Content-Type', 'application/json')
      return res.send(event);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;
