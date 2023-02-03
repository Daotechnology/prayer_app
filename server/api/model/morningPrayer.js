const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const morningPrayerSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    prayers:{
        type:String
    },
    content:{
        type:Array,
        required:true
    },
    type:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const morningPrayer = mongoose.model('morning_prayer',morningPrayerSchema);

module.exports = morningPrayer;