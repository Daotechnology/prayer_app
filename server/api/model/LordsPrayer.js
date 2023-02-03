const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const LordsPrayerSchema = mongoose.Schema({
    lords_prayer:{
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

const LordsPrayer = mongoose.model('lordsprayer',LordsPrayerSchema);

module.exports = LordsPrayer;