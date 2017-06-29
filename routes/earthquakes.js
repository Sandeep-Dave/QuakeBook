'use strict'

const express = require('express');
const Repo    = require('../controllers/earthquakes_repository');
const router  = express.Router();


/**
* @api {get} /earthquakes/
* @apiVersion 1.0.0
* @apiName GetEarthquakeId
* @apiGroup Earthquakes
*
* @apiParam {String} id                  Earthquake's USGS ID
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
* @apiError EarthquakeNotFound The earthquake was not found.
* @apiErrorExample {json} Not Found Error:
*     HTTP/1.1 404 Not Found
*     {
*       "error": "EarthquakeNotFound"
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
      console.log(err);
      res.status(404).send(err);
    })
})

/**
* @api {get} /earthquakes/
* @apiVersion 1.0.0
* @apiName GetEarthquakesByParameters
* @apiGroup Earthquakes
*
  // latitude, longitude, starttime, endtime, minmagnitude, maxmagnitude, maxradiuskm, limit

* @apiParam {String} Latitude            Latitude of event
* @apiParam {String} Longitude           Longitude of event
* @apiParam {String} Starttime           Specified start time in Date/Time format
* @apiParam {String} Endtime             Specified end time in Date/Time format
* @apiParam {String} Minmagnitude        Minimum magnitude for search
* @apiParam {String} Maxmagnitude        Maximum magnitude for search
* @apiParam {String} Maxradiuskm         Maximum search radius around coordinate
* @apiParam {String} Limit               Number of earthquakes returned
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

  let finalResults = [];

  repo.queryEarthquakesByParameters(parameters)
    .then((results) => {
      return results.json();
    })
    .then(console.log);
    // .catch(err => {
    //   console.log('***********88888888');
    //   res.status(500).send(err);
    // })
    // .then(console.log);
    // .then((results) => {
    //   console.log('^^^^^^^^',results.json());
    //   for (let quake of results.features) {
    //     finalResults.push(shapeData(quake));
    //   }
    //   res.send(finalResults);
    // })
    // .catch(err => {
    // })

})

function shapeData(rawData) {

  // console.log('**77****',rawData.properties);

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
