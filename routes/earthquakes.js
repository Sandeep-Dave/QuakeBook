'use strict'

const express = require('express');
const Repo    = require('../controllers/earthquakes_repository');
const router  = express.Router();


/**
* @api {get} /earthquakes/
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

router.get('/:id', (req, res) => {
  let repo = new Repo();

  repo.queryEarthquakeById(req.params.id)
    .then(result => {
      let event = shapeData(result)
      res.send(event);
    })
    .catch(err => {
      res.status(404).send(err);
    })
})

/**
* @api {get} /earthquakes/
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

router.get('/', (req, res) => {
  let repo = new Repo();
  let parameters = req.query;

  if(!parameters.limit) {
    parameters.limit = 100;
  }

  // latitude, longitude, starttime, endtime, minmagnitude, maxmagnitude, maxradiuskm, limit
  let finalResults = [];
  repo.queryEarthquakesByParameters(parameters)
    .then((results) => {
      return results.json();
    })
    .then((results) => {
      for (let quake of results.features) {
        finalResults.push(shapeData(quake));
      }
      res.send(finalResults);
    })

})

function shapeData (rawData) {

  let event = {};

  event.magnitude = rawData.properties.mag;
  event.usgs_id = rawData.id;
  event.lat = rawData.geometry.coordinates[1];
  event.long = rawData.geometry.coordinates[0];
  event.depth = rawData.geometry.coordinates[2];
  event.description = rawData.properties.place;
  event.tz_offset = rawData.properties.tz;
  event.date_time = rawData.properties.time;
  event.last_updated = rawData.properties.updated;

  return event;
}

module.exports = router;
