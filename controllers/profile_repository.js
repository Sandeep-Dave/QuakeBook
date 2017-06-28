const knex = require('../knex.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Profile {

  // lookup user by email

  getUserInfo(id){
  return knex('users').select('name','email','timezone').first().where({ id })
}

  // compare password to hashed_password

  checkPassword(email, password){
    let id;
		knex('users').select('id','hashed_password').first().where({email})
		.then(queryResult => {
			let hashed = queryResult.hashed_password;
      id = queryResult.id;
			return bcrypt.compare(password, hashed);
    })
  }

  // insert profile into users database /

  addUser(user) {
    return knex('users').insert(user,['name','email','timezone']);
  }

  // delete users profile

  deleteUser(id) {
    return knex('users')
      .del()
      .where('id', id)
      .returning(['name','email','timezone']);
  }

  // update users profile

  updateUser(id, user) {
    return knex('users')
      .where({ id })
      .update({
        name: user.name,
        email: user.email,
        timezone: user.timezone}, ['name','email','timezone']);
  }

  // lookup all saved earthquakes in a user's profile

  queryEvents(id){
    return knex('saved_earthquakes').where('user_id', id);
  }

  // post an event to a users profile

  addEvent(id, user_id) {
    return knex('saved_earthquakes').insert({event_id: id, user_id: user_id},'*');
  }

  // delete an event from a users profile

  deleteEvent(event_id, user_id) {
    return knex('saved_earthquakes')
      .del()
      .where({event_id, user_id})
      .returning('*');
  }

  // return all public notes from a users profile

  queryNotesByUser(id) {
    return knex('notes').where({'is_private':false, user_id: id});
  }

  //  post a note to a users profile

  addNote(note, user_id) {
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

  queryFriends(id) {
    return knex('friends').where('user_from', id);
  }

  // post a friend to a user's friends table

  addFriend(user_from, user_to) {
    return knex('friends').insert({user_from,user_to},'*');
  }

  // delete a friend from a users friend table

  deleteFriend(user_from, user_to) {
    return knex('friends')
      .del()
      .where( { user_from, user_to })
      .returning('*');
  }

  // return a list of poi's for a user

  queryPOIs(user_id) {
    return knex('points_of_interest').where({ user_id });
  }

  // post a poi for a user_id

  addPOI(poi, user_id) {
    return knex('points_of_interest').where({ user_id }).insert(poi,'*');
  }

  // delete a poi for a user

  deletePOI(id, user_id) {
    return knex('points_of_interest')
      .del()
      .where({ user_id, id })
      .returning('*');
  }


}

module.exports = Profile;
