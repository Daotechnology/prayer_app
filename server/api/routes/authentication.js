"use strict"
require("dotenv").config({ path: "config/dev.env" });
const express = require('express');

const router = express.Router();

//Load Middlware
const { validate, auth } = require('./../middleware/middleware');

const { signup,signin, change_password, edit_profile} = require('./../controller/authentication');

// const Payment = require('./../model/Payment');
// const Signup = require('./../model/Signup');
let localStorage;

if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


router.get('/signin', (req, res)=>{
    try {
        return res.render('signin');
    } catch(e) {
        return res.render('signin');
    }
});

router.get('/account',validate, (req, res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('account',{
            token:req.token,
            user:req.user
        });
    } catch(e) {
        return res.render('404');
    }
});


//Register Api
router.post('/api/v1/register', signup);

//Login Api
router.post('/api/v1/login', signin);

//Account Settings
router.post('/api/v1/change_password', auth, change_password);
router.post('/api/v1/edit_profile', auth, edit_profile);


//Account api
// router.post('/api/signin', signin );

// router.post('/api/signup', signup);
  

module.exports = router;