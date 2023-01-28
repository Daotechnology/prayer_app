"use strict"
require("dotenv").config({ path: "config/dev.env" });
const express = require('express');

const router = express.Router();


router.get('/dashboard',async(req,res)=>{
    try {
        return res.render('index');
    }catch(e){
        return res.render('404');
    }
});

router.get('/morning_prayer',async(req,res)=>{
    try {
        return res.render('morning');
    }catch(e){
        return res.render('404'); 
    }
})

module.exports = router;