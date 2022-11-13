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

router.get("/test", async function(req, res, next){
    try{
        return res.json({test:'testing route'});
    }catch(err){
        return next(err)
    }
})

/** Delete journal entry */

router.delete("/:id", async function(req, res, next){
    try{
      console.log(req.params);
      await User.deleteJournalEntry(req.params.id);
      return res.json({ deleted: req.params.id });
    } catch (err){
      return next(err);
    }
  })


module.exports = router;