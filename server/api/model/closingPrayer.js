const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const closingPrayerSchema = mongoose.Schema({
    closing_prayer:{
        type:Array,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    title: {
        type:String,
        required:true
    }
},{
    timestamps:true
});

const closingPrayer = mongoose.model('closingPrayer',closingPrayerSchema);

module.exports = closingPrayer;