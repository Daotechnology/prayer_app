"use strict"
require("dotenv").config({ path: "config/dev.env" });
const express = require('express');

const router = express.Router();

//Load Middlware
// const { validate } = require('./../middleware/middleware')
const { signup,signin } = require('./../controller/authentication');

// const Payment = require('./../model/Payment');
// const Signup = require('./../model/Signup');



router.get('/signin', (req, res)=>{
    try {
        return res.render('signin');
    } catch(e) {
        return res.render('signin');
    }
});


//Register Api
router.post('/api/v1/register', signup );
//Login Api
router.post('/api/v1/login', signin );


//Apis
// router.post('/api/signin', signin );

// router.post('/api/signup', signup);
  

module.exports = router;