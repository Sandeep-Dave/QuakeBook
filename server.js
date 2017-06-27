const express = require('express');

const app         = express();
const earthquake  = require('./routes/earthquake');
const earthquakes = require('./routes/earthquakes');
const user        = require('./routes/user');
const profile     = require('./routes/profile');

const port = process.env.PORT || 8000;

app.use('/earthquake', earthquake);
// app.use('/earthquakes', earthquakes);
app.use('/user', user);
// app.use('/profile', profile);

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
    console.log('Listening on port', port);
});

module.exports = app;
