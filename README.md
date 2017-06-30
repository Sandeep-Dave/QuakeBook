# QuakeBook

## Documentation

QuakeBook uses ApiDoc.js to create client-side [documentation for our API.](https://quakebook.herokuapp.com/)

## Description
This api will serve data relating to a social network surrounding earthquake events.  Users will be able to provide their home location as well as additional locations and find the locations and magnitudes of all earthquakes within a given radius of each location and for a specified timeframe.  Additionally, they will be capable of commenting on their impressions of a specified earthquake and connect with other people who have also commented on that earthquake.  Users will be able to save a list of notable earthquakes as well as a list of other users whom they may want to 'friend.'

QuakeBook gives users the ability to connect to individuals with whom they might want to collaborate on an earthquake action plan to ensure future preparedness.


### Profile

Much of the user's interaction will be within the profile routes.  Here, a user may login. Once logged in, a user will be able to retrieve their profile information.  They may also alter their list of saved earthquakes as well as their list of friends and their list of saved "points of interest".  An authenticated user is also able to place a private note on any given earthquake for their personal use or place a public note for other users to see.  

### User

A logged-in user is also able to query another user's details as well as see all public notes by a supplied user.

### Earthquake

Any user (logged in or not) may access the earthquake route to view the details of an earthquake event and attached, public notes if the event's ID is supplied.  This route is also used to save events retrieved from the USGS site to the application's database so that it may be used in saved lists.

### Earthquakes

This route is where any user (logged in or not) may query the USGS api for any current earthquake events given a few parameters.  The possible parameters are as follows (supplied as query strings):

- `latitude` (required with `maxradiuskm` and `longitude`)
- `longitude` (required with `latitude` and `maxradiuskm`)
- `starttime`
- `endtime`
- `minmagnitude`
- `maxmagnitude`
- `maxradiuskm` (in kilometers, required with `latitude` and `longitude`)
- `limit` (defaults to 100 if omitted)

### Local Environment

As a prerequisite, set up the .ENV file with a JWT_KEY so a token can be created to enable user authentication.
