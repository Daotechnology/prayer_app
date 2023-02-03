const mongoose = require('mongoose');


const middayOpeningPrayerSchema = mongoose.Schema({
    prayer:{
        type:Array,
        required:true
    },
    type:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const middayOpeningPrayer = mongoose.model('middayOpeningPrayer',middayOpeningPrayerSchema);

module.exports = middayOpeningPrayer;