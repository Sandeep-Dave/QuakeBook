'use strict';

// const environment = process.env.NODE_ENV || 'development';
const environment = 'development';
// console.log(environment);
const knexConfig = require('./knexfile')[environment];
const knex = require('knex')(knexConfig);

module.exports = knex;
