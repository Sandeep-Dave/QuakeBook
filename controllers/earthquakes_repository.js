const fetch = require('node-fetch');
const URL = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&'


class EarthquakesRepository{

  queryEarthquakeById(id){
    let event = {};
     return fetch(URL+'eventid='+id)
      .then((results) => {
        return results.json();
      })
      .catch(err => {
        return err;
      })
  }

  queryEarthquakesByParameters(parameters) {
    let queryString = '';


    for (let key of Object.keys(parameters)) {
      queryString += `${key}=${parameters[key]}&`
    }

    return fetch(URL+queryString)
    }

// latitude, longitude, starttime, endtime, minmagnitude, maxmagnitude, maxradiuskm, limit


}

module.exports = EarthquakesRepository;
