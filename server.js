if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express      = require('express');
const app          = express();
const bodyParser   = require('body-parser');
const earthquake   = require('./routes/earthquake');
const earthquakes  = require('./routes/earthquakes');
const user         = require('./routes/user');
const profile      = require('./routes/profile');
const cookieParser = require('cookie-parser');
const path         = require('path');

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/earthquake', earthquake);
app.use('/earthquakes', earthquakes);
app.use('/user', user);
app.use('/profile', profile);

app.use('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
    console.log('Listening on port', port);
});

module.exports = app;
