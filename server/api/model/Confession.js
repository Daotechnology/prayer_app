const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ConfessionSchema = mongoose.Schema({
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

const Confession = mongoose.model('confession',ConfessionSchema);

module.exports = Confession;