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

const Morning_Prayer = require('../model/morningPrayer');
const Confession = require('../model/Confession');
const Scripture = require('../model/Scripture');
const LordsPrayer = require('../model/LordsPrayer');
// const closingPrayer = require('../model/closingPrayer');
// const middayOpeningPrayer = require('../model/middayOpeningPrayer');


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

router.get('/morning_prayer',validate, async(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        const prayer = await Morning_Prayer.find({type:'morning_prayer'},'title prayers type _id').sort({createdAt:-1});
        return res.render('morning',{
            token:req.token,
            type:'morning_prayer',
            prayer
        });
    } catch(e) {
        return res.redirect('/signin');
    }
})

router.get('/confession/:prayer',validate,async(req,res)=>{
    try {
        if (!req.token) {
            return res.render('signin');
        }
        const prayer = await Confession.find({type:req.params.prayer}).sort({createdAt:-1});
        console.log(prayer);
        return res.render('confession',{
            token:req.token,
            type:req.params.prayer,
            prayer
        });
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/scripture',validate, async(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        const prayer = await Scripture.find({type:'morning_prayer'},'scripture type _id').sort({createdAt:-1});
        return res.render('scripture',{
            token:req.token,
            type:'morning_prayer',
            prayer
        });
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/late_evening_scripture',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('scripture',{
            token:req.token,
            type:'late_evening_prayer'
        });
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/lords_prayer/:prayer',validate,async(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        const prayer = await LordsPrayer.find({type:req.params.prayer},'lords_prayer type _id createdAt').sort({createdAt:-1});
        return res.render('lords_prayer', {
            token:req.token,
            type:req.params.prayer,
            prayer
        });
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/closing_prayer/:prayer',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('closing_prayer',{
            token:req.token,
            type:req.params.prayer
        });
    }catch (e) {
        return res.render('404'); 
    }
})

router.get('/midday_opening/:prayer',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }

        return res.render('midday_opening',{
            token:req.token,
            type:req.params.prayer
        });

    }catch (e) {
        return res.render('404'); 
    }
})

router.get('/midday_scripture',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('scripture',{
            token:req.token,
            type:'midday_prayer'
        });
    }catch (e) {
        return res.render('404');
    }
})

router.get('/midday_closing',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('closing_prayer',{
            token:req.token,
            type:'midday_prayer'
        });
    }catch (e) {
        return res.render('404');
    }
})

router.get('/evening_prayer',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('morning',{
            token:req.token,
            type:'evening_prayer'
        });
    }catch (e) {
        return res.render('404');
    }
})

router.get('/evening_scripture',validate,(req,res)=>{
    try {
        if (!req.token) {
            return res.redirect('/signin');
        }
        return res.render('scripture',{
            token:req.token,
            type:'evening_prayer'
        });
    }catch(e){
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