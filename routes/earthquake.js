'use strict'

const express    = require('express');
const knex       = require('../knex');
const Eartquake  = require('../controllers/earthquake_repostiory');
const router     = express.Router();

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
}