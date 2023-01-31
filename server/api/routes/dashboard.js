"use strict"
require("dotenv").config({ path: "config/dev.env" });
const express = require('express');

const { validate } = require('./../middleware/middleware');

const router = express.Router();

let localStorage;

if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

router.get('/dashboard',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('index',{
            email:req.user.email
        });
    } catch(e) {
        return res.render('404');   
    }
});

router.get('/morning_prayer',validate, (req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('morning');
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/confession',validate,(req,res)=>{
    try {
        return res.render('confession');
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/scripture',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('scripture');
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/lords_prayer',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('lords_prayer');
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/closing_prayer',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('closing_prayer');
    }catch (e) {
        return res.render('404'); 
    }
})

router.get('/midday_opening',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('midday_opening');
    }catch (e) {
        return res.render('404'); 
    }
})

router.get('/midday_scripture',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('midday_scripture');
    }catch (e) {
        return res.render('404');
    }
})

router.get('/midday_closing',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('midday_closing');
    }catch (e) {
        return res.render('404');
    }
})

router.get('/evening_prayer',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('evening_prayer');
    }catch (e) {
        return res.render('404');
    }
})


router.get('/apostle_creed',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('apostle_creed');
    }catch (e) {
        return res.render('404');
    }
})


module.exports = router;