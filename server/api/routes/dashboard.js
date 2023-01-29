"use strict"
require("dotenv").config({ path: "config/dev.env" });
const express = require('express');

const router = express.Router();


router.get('/dashboard',(req,res)=>{
    try {
        return res.render('index');
    }catch(e){
        return res.render('404');   
    }
});

router.get('/morning_prayer',(req,res)=>{
    try {
        return res.render('morning');
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/confession',(req,res)=>{
    try {
        return res.render('confession');
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/scripture',(req,res)=>{
    try {
        return res.render('scripture');
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/lords_prayer',(req,res)=>{
    try {
        return res.render('lords_prayer');
    }catch(e){
        return res.render('404'); 
    }
})

router.get('/closing_prayer',(req,res)=>{
    try {
        return res.render('closing_prayer');
    }catch (e) {
        return res.render('404'); 
    }
})

router.get('/midday_opening',(req,res)=>{
    try {
        return res.render('midday_opening');
    }catch (e) {
        return res.render('404'); 
    }
})

router.get('/midday_scripture',(req,res)=>{
    try {
        return res.render('midday_scripture');
    }catch (e) {
        return res.render('404');
    }
})

router.get('/midday_closing',(req,res)=>{
    try {
        return res.render('midday_closing');
    }catch (e) {
        return res.render('404');
    }
})

router.get('/evening_prayer',(req,res)=>{
    try {
        return res.render('evening_prayer');
    }catch (e) {
        return res.render('404');
    }
})


router.get('/apostle_creed',(req,res)=>{
    try {
        return res.render('apostle_creed');
    }catch (e) {
        return res.render('404');
    }
})


module.exports = router;