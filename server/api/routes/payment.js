"use strict"
require("dotenv").config({ path: "config/dev.env" });
const express = require('express');

const router = express.Router();

//Load Middlware
const { validate , jwtAuthenticate } = require('./../middleware/middleware')
const { payment  } = require('./../controller/payment');

//Apis
router.post('/api/payment', jwtAuthenticate , payment );
  

module.exports = router;