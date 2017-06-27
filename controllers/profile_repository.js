const knex = require('../knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Profile {

  // lookup user by email

  getUserName(email){
  return knex('users').select('name','email','id','timezone').first().where('email', email)
}

  // compare password to hashed_password

  checkPassword(email, password){
		return knex('users').select('hashed_password').first().where({email})
		.then(queryResult => {
			let hashed = queryResult.hashed_password;
			return bcrypt.compare(password, hashed);
		})
	}

  // insert profile into users database /

  addUser(user) {
    return knex('users').insert(user,'*');
  }

  // return all public user data from users table

  queryAllUsers() {
    return knex('users').select('name','email','timezone');
  }

  // delete users profile

  deleteUser(id) {
    return knex('users')
      .del()
      .where('id', id)
      .returning('*');
  }

  // update users profile

  updateUser(id, user) {
    return knex('users')
      .where({ id })
      .update({
        name: user.name,
        email: user.email,
        timezone: user.timezone}, '*');
  }

  // lookup all saved earthquakes in a user's profile

  querySavedEarthquakes(id){
    return knex('saved_earthquakes').where('user_id', id);
  }

  // post an event to a users profile

  addEvent(id) {
    return knex('saved_earthquakes').insert(id,'*');
  }

  // delete an event from a users profile

  deleteUser(id) {
    return knex('saved_earthquakes')
      .del()
      .where('event_id', id)
      .returning('*');
  }

  // return all public notes from a users profile

  queryAllNotesByUser() {
    return knex('notes').where('is_private', false);
  }

  //  post a note to a users profile

  addNote(note) {
    return knex('notes').insert(note,'*');
  }

  // delete a note from a users profile

  deleteNote(id) {
    return knex('notes')
      .del()
      .where('id', id)
      .returning('*');
  }

  // return a list of friends for a user

  queryAllFriends(id) {
    return knex('friends').where('user_from', id);
  }

  // post a friend to a user's friends table

  addFriend(user_from, user_to) {
    return knex('friends').where({ user_from }).insert(user_to,'*');
  }

  // delete a friend from a users friend table

  deleteFriend(user_from, user_to) {
    return knex('friends')
      .del()
      .where( { user_from, user_to })
      .returning('*');
  }

  // return a list of poi's for a user

  queryAllPOIs(user_id) {
    return knex('points_of_interest').where({ user_id });
  }

  // post a poi for a user_id

  addPOI(user_id, poi) {
    return knex('points_of_interests').where({ user_id }).insert(poi,'*');
  }

  // delete a poi for a user

  deletePOI(user_id, id) {
    return knex('points_of_interests')
      .del()
      .where({ user_id, id })
      .returning('*');
  }


}

module.exports = Profile;
