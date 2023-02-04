"use strict"
require("dotenv").config({ path: "config/dev.env" });
const express = require('express');

const { auth } = require('./../middleware/middleware');
// Prayer Endpoint
const { morning_prayer, client_get_all_morning_prayer, midday_opening_prayer, client_get_midday_opening_prayer, closing_prayer, client_get_closing_prayer, client_get_morning_prayer, confession,client_get_confession, scripture, client_get_scripture, lords_prayer, client_get_lords_prayer} = require('../controller/prayer');

const router = express.Router();

let localStorage;

if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

router.post('/api/v1/create/morning/prayer',auth, morning_prayer);
router.get('/api/v1/get/morning/prayer/:type', client_get_morning_prayer);

//Confession
router.post('/api/v1/create/confession',auth, confession);
router.get('/api/v1/get/confession/:type', client_get_confession);

//Scripture
router.post('/api/v1/create/scripture',auth, scripture);
router.get('/api/v1/get/scripture/:type',client_get_scripture);

// Lords Prayer
router.post('/api/v1/create/lords_prayer',auth, lords_prayer);
router.get('/api/v1/client/get/lords/prayer/:type', client_get_lords_prayer);

//Closing Prayer
router.post('/api/v1/create/closing_prayer',auth, closing_prayer);
router.get('/api/v1/client/get/closing/prayer/:type',client_get_closing_prayer);

// Midday Opening Prayer
router.post('/api/v1/create/midday/opening_prayer',auth, midday_opening_prayer);
router.get('/api/v1/client/get/midday/opening/prayer/:type',client_get_midday_opening_prayer);

// All Morming Prayer
router.get('/api/v1/get/all/morning/prayer/:type', client_get_all_morning_prayer);


module.exports = router;