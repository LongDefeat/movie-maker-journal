"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUserOrAdmin, ensureAdmin } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");
const { restart } = require("nodemon");
const axios = require("axios");

const router = express.Router();

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = `9a114ae809d1fc32f0105fcd87afe983`;

/** POST / { user } => { user, token }
 * 
 * Adds a new user. This is not the registration endpoint.
 * only for admin users to add new users. THe new user being added
 * can be an admin.
 * 
 * This returns the newly created user an authentication token for them
 *  ---> {user: { username, firstName, lastName, isAdmin}}
 */

router.post("/", ensureAdmin, async function (req, res, next){
    try {
        const validator = jsonschema.validate(req.body, userName);
        if (!validator.valid){
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }

        const user = await User.register(req.body);
        const token = createToken(user);
        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
});

/** GET / => { users: [ {username, firstName, lastName }, ...] } 
 * 
 * Returns list of all users
 * NEED ALL USERS FUNCTION
*/

router.get("/:username", async function(req, res, next){
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch(err){
    return next(err);
  }
});

/** POST Favorite Movie to backend => { user: [ {user_id, movie_id} ] } 
 * 
*/
router.post("/:user_id/favorites/:movie_id", async function (req, res, next){
  try{
    console.log("backend: ", req.params.movie_id)
    const favorites = await User.addFavoriteMovie(req.params.user_id, req.params.movie_id);
    return res.status(201).json({favorites});
  } catch (err){
    return next(err)
  }
})


/** POST Journal Entry/  */

router.post("/:user_id/journal", async function(req, res, next){
  try{
    const journalEntry = await User.addJournalEntry(req.body, req.params.user_id);
    return res.status(201).json({journalEntry});
  } catch(err){
    return next(err);
  } 
});

/** GET all Journal Entries and Movie Data*/

router.get("/:user_id/journal-entries", async function(req, res, next){
  try{
    const {user_id} = req.params;
    const journalEntries = await User.getJournalEntryList(user_id);
    const journalMovieIds = journalEntries.map(e => e.movie_id);
    const unresolved = journalMovieIds.map(async(id) => {
      return await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        }
      })
    })
    const resolved = await Promise.all(unresolved);
    const movieData = resolved.map(prom => {
      return prom.data;
    })
    return res.json({journalEntries});
  } catch (err){
    return next(err);
  }
})



/** GET all favorite movies */

router.get("/:user_id/favorites", async function(req, res, next){
  try {
    const {user_id} = req.params;
    const favoriteMovies = await User.getMovieIds(user_id);
    const favMovieIds = favoriteMovies.map(m => m.movie_id);
    const unresolved = favMovieIds.map(async(id) => {
      return await axios.get(`${BASE_URL}/movie/${id}`, {
        params: {
            api_key: API_KEY,
        }
      });
    }) 
    const resolved = await Promise.all(unresolved);
    const favorites = resolved.map(prom => {
      return prom.data;
    });
    return res.json({favorites});
  } catch (err){
    return next(err)
  }
})

/** PATCH /[username] { user } => { user }
 * 
 * Data can include:
 *  { firstName, lastName, password }
 * 
 * Returns { username, firstName, lastName, isAdmin }
 * 
 * Authorization required: admin or same-user-as-:username
*/

router.patch("/:username", async function (req, res, next) {
    try {
        // const validator = jsonschema.validate(req.body, userUpdateSchema);
        // if (!validator.valid) {
        //   const errs = validator.errors.map(e => e.stack);
        //   throw new BadRequestError(errs);
        // }
    
        const updateProfile = await User.update(req.params.username, req.body);
        console.log(updateProfile);
        return res.json({ updateProfile });
      } catch (err) {
        return next(err);
      }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or same-user-as-:username
 **/

router.delete("/:username", async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
});



module.exports = router;
