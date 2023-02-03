const mongoose = require('mongoose');

const ScriptureSchema = mongoose.Schema({
    scripture:{
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

const Scripture = mongoose.model('scripture',ScriptureSchema);

module.exports = Scripture;