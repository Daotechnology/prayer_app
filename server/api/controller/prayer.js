const express = require("express");
const app = express();
const Morning_Prayer = require('../model/morningPrayer');
const Confession = require('../model/Confession');
const Scripture = require('../model/Scripture');
const LordsPrayer = require('../model/LordsPrayer');
const closingPrayer = require('../model/closingPrayer');
const middayOpeningPrayer = require('../model/middayOpeningPrayer');

const { param } = require("../routes/authentication");


const morning_prayer = async(req,res)=>{
  try {
     //Check if The Endpoint is sending something
     if (Object.keys(req.body).length < 1) {
      throw new Error("This Endpoint Requires some certain given fields");
    }

    //List of Accepted Fields
    const collectibles = ["title", "prayers","content","type"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      throw new Error(`The required field is not found ${collectibles}`);
    }

    const isKey = collectibles.filter((key) => !keys.includes(key));

    if (isKey.length > 0) {
      throw new Error(
        `${isKey[0]} is not valid, below are the list of Accepted Fields ${collectibles}`
      );
    }
    const prayer = new Morning_Prayer(body);
    await prayer.save();
    return res
      .json({ error: false, statusText: "Morning Prayer Uploaded Successfully" })
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_morning_prayer = async(req,res) => {
  try {
    const collectibles = ["morning_prayer","midday_prayer","evening_prayer","evening_prayer"];
    const params = req.params.type;

    if (collectibles.includes(params) == false) {
      throw new Error(
        `${params} is not valid, below are the list of Accepted Params ${collectibles}`
      );
    }
    const prayer = await Morning_Prayer.findOne({type:params}).sort({createdAt:-1});
    if (!prayer) {
      throw new Error('No data at the moment');
    }
    return res
      .json({ error: false, data:prayer, statusText: "Sucessfully Gotten the Latest Morning Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

//Confession
const confession = async(req,res)=>{
  try {
     //Check if The Endpoint is sending something
     if (Object.keys(req.body).length < 1) {
      throw new Error("This Endpoint Requires some certain given fields");
    }

    //List of Accepted Fields
    const collectibles = ["content","type"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      throw new Error(`The required field is not found ${collectibles}`);
    }

    const isKey = collectibles.filter((key) => !keys.includes(key));

    if (isKey.length > 0) {
      throw new Error(
        `${isKey[0]} is not valid, below are the list of Accepted Fields ${collectibles}`
      );
    }
    const prayer = new Confession(body);
    await prayer.save();
    return res
      .json({ error: false, statusText: "Confession Uploaded Successfully" })
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_confession = async(req,res) => {
  try {

     //List of Accepted Fields
     const collectibles = ["morning_prayer","midday_prayer","evening_prayer","late_evening_prayer"];
     const params = req.params.type;
 
     if (collectibles.includes(params) == false) {
       throw new Error(
         `${params} is not valid, below are the list of Accepted Params ${collectibles}`
       );
     }
  
    const prayer = await Confession.findOne({type:params}).sort({createdAt:-1});
    if (!prayer) {
      throw new Error('No data at the moment');
    }
    return res
      .json({ error: false, data:prayer, statusText: "Sucessfully Gotten the Latest Morning Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const scripture = async(req,res)=>{
  try {
    //Check if The Endpoint is sending something
    if (Object.keys(req.body).length < 1) {
      throw new Error("This Endpoint Requires some certain given fields");
    }

    //List of Accepted Fields
    const collectibles = ["scripture","type"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      throw new Error(`The required field is not found ${collectibles}`);
    }

    const isKey = collectibles.filter((key) => !keys.includes(key));

    if (isKey.length > 0) {
      throw new Error(
        `${isKey[0]} is not valid, below are the list of Accepted Fields ${collectibles}`
      );
    }
    const prayer = new Scripture(body);
    await prayer.save();
    return res
      .json({ error: false, statusText: "Scripture Uploaded Successfully" })
      .status(200);
  } catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_scripture = async(req,res) => {
  try {
     //List of Accepted Fields
     const collectibles = ["morning_prayer","midday_prayer","evening_prayer","late_evening_prayer"];
     const params = req.params.type;
 
     if (collectibles.includes(params) == false) {
       throw new Error(
         `${params} is not valid, below are the list of Accepted Params ${collectibles}`
       );
     }
    const prayer = await Scripture.findOne({type:params}).sort({createdAt:-1});
    if (!prayer) {
      throw new Error('No data at the moment');
    }
    return res
      .json({ error: false, data:prayer, statusText: "Sucessfully Gotten the Scripture for Morning Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const lords_prayer = async(req,res)=>{
  try {
    //Check if The Endpoint is sending something
    if (Object.keys(req.body).length < 1) {
      throw new Error("This Endpoint Requires some certain given fields");
    }

    //List of Accepted Fields
    const collectibles = ["lords_prayer","type"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      throw new Error(`The required field is not found ${collectibles}`);
    }

    const isKey = collectibles.filter((key) => !keys.includes(key));

    if (isKey.length > 0) {
      throw new Error(
        `${isKey[0]} is not valid, below are the list of Accepted Fields ${collectibles}`
      );
    }
    const prayer = new LordsPrayer(body);
    await prayer.save();
    return res
      .json({ error: false, statusText: "Lords Prayer Uploaded Successfully" })
      .status(200);
  } catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_lords_prayer = async(req,res) => {
  try {
    //List of Accepted Fields
    const collectibles = ["morning_prayer","late_evening_prayer"];
    const params = req.params.type;

    if (collectibles.includes(params) == false) {
      throw new Error(
        `${params} is not valid, below are the list of Accepted Params ${collectibles}`
      );
    }
 
    const prayer = await LordsPrayer.findOne({type:params}).sort({createdAt:-1});
    if (!prayer) {
      throw new Error('No data at the moment');
    }
    return res
      .json({ error: false, data:prayer, statusText: "Sucessfully Gotten the Lords Prayer for Morning Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const closing_prayer = async(req,res)=>{
  try {
    //Check if The Endpoint is sending something
    if (Object.keys(req.body).length < 1) {
      throw new Error("This Endpoint Requires some certain given fields");
    }

    //List of Accepted Fields
    const collectibles = ["closing_prayer","type","title"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      throw new Error(`The required field is not found ${collectibles}`);
    }

    const isKey = collectibles.filter((key) => !keys.includes(key));

    if (isKey.length > 0) {
      throw new Error(
        `${isKey[0]} is not valid, below are the list of Accepted Fields ${collectibles}`
      );
    }
    const prayer = new closingPrayer(body);
    await prayer.save();
    return res
      .json({ error: false, statusText: "Closing Prayer Uploaded Successfully"})
      .status(200);
  } catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_closing_prayer = async(req,res) => {
  try {
    //List of Accepted Fields
    const collectibles = ["morning_prayer","midday_prayer","evening_prayer","evening_prayer"];
    const params = req.params.type;

    if (collectibles.includes(params) == false) {
      throw new Error(
        `${params} is not valid, below are the list of Accepted Params ${collectibles}`
      );
    }
 
    const prayer = await closingPrayer.findOne({type:params}).sort({createdAt:-1});
    if (!prayer) {
      throw new Error('No data at the moment');
    }
    return res
      .json({ error: false, data:prayer, statusText: "Sucessfully Gotten the Lords Prayer for Morning Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const midday_opening_prayer  = async(req, res)=>{
  try {
    //Check if The Endpoint is sending something
    if (Object.keys(req.body).length < 1) {
      throw new Error("This Endpoint Requires some certain given fields");
    }

    //List of Accepted Fields
    const collectibles = ["prayer","type"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      throw new Error(`The required field is not found ${collectibles}`);
    }

    const isKey = collectibles.filter((key) => !keys.includes(key));

    if (isKey.length > 0) {
      throw new Error(
        `${isKey[0]} is not valid, below are the list of Accepted Fields ${collectibles}`
      );
    }
    const prayer = new middayOpeningPrayer(body);
    await prayer.save();
    return res
      .json({ error: false, statusText: "Midday Opening Prayer Uploaded Successfully"})
      .status(200);
  } catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_midday_opening_prayer = async(req,res) => {
  try {
    //List of Accepted Fields
    const collectibles = ["midday_prayer","evening_prayer","late_evening_prayer"];
    const params = req.params.type;

    if (collectibles.includes(params) == false) {
      throw new Error(
        `${params} is not valid, below are the list of Accepted Params ${collectibles}`
      );
    }
 
    const prayer = await middayOpeningPrayer.findOne({type:params}).sort({createdAt:-1});
    if (!prayer) {
      throw new Error('No data at the moment');
    }
    return res
      .json({ error: false, data:prayer, statusText: "Sucessfully Gotten the Lords Prayer for Morning Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_all_morning_prayer = async(req,res)=>{
  try {
    const collectibles = ["morning_prayer"];
    const params = req.params.type;

    if (collectibles.includes(params) == false) {
      throw new Error(
        `${params} is not valid, below are the list of Accepted Params ${collectibles}`
      );
    }

    const opening_prayer = await Morning_Prayer.findOne({type:params}).sort({createdAt:-1});
    const confession = await Confession.findOne({type:params}).sort({createdAt:-1});
    const scripture = await Scripture.findOne({type:params}).sort({createdAt:-1});
    const lords_prayer = await LordsPrayer.findOne({type:params}).sort({createdAt:-1});
    const closing_prayer = await closingPrayer.findOne({type:params}).sort({createdAt:-1});

    const data = [
      opening_prayer,
      confession,
      scripture,
      lords_prayer,
      closing_prayer
    ]

    return res
      .json({ error: false, data, statusText: "Sucessfully Got All Morning Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_all_midday_prayer = async(req,res)=>{
  try {
    const collectibles = ["midday_prayer"];
    const params = req.params.type;

    if (collectibles.includes(params) == false) {
      throw new Error(
        `${params} is not valid, below are the list of Accepted Params ${collectibles}`
      );
    }

    const opening_prayer = await middayOpeningPrayer.findOne({type:params}).sort({createdAt:-1});
    const scripture = await Scripture.findOne({type:params}).sort({createdAt:-1});
    const closing_prayer = await closingPrayer.findOne({type:params}).sort({createdAt:-1});

    const data = [
      opening_prayer,
      scripture,
      closing_prayer
    ]

    return res
      .json({ error: false, data, statusText: "Sucessfully Got All Midday Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_all_evening_prayer = async(req,res)=>{
  try {
    const collectibles = ["evening_prayer"];
    const params = req.params.type;
    let arr = [];

    if (collectibles.includes(params) == false) {
      throw new Error(
        `${params} is not valid, below are the list of Accepted Params ${collectibles}`
      );
    }

    const prayer = await Morning_Prayer.findOne({type:params}).sort({createdAt:-1});
    const scripture = await Scripture.findOne({type:params}).sort({createdAt:-1});
    const closing_prayer = await closingPrayer.findOne({type:params}).sort({createdAt:-1});

    const data = {
      scripture,
      opening_prayer:prayer,
      closing_prayer
    }
    arr.push(data);

    return res
      .json({ error: false, data:arr, statusText: "Sucessfully Got All Evening Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const client_get_all_late_evening_prayer = async(req,res)=>{
  try {
    const collectibles = ["late_evening_prayer"];
    const params = req.params.type;
    let arr = [];

    if (collectibles.includes(params) == false) {
      throw new Error(
        `${params} is not valid, below are the list of Accepted Params ${collectibles}`
      );
    }

    const prayer = await middayOpeningPrayer.findOne({type:params}).sort({createdAt:-1});
    const confession = await Confession.findOne({type:params}).sort({createdAt:-1});
    const scripture = await Scripture.findOne({type:params}).sort({createdAt:-1});
    const lords_prayer = await LordsPrayer.findOne({type:params}).sort({createdAt:-1});
    const closing_prayer = await closingPrayer.findOne({type:params}).sort({createdAt:-1});

    const data = {
      scripture,
      opening_prayer:prayer,
      closing_prayer,
      lords_prayer,
      confession
    }
    arr.push(data);

    return res
      .json({ error: false, data:arr, statusText: "Sucessfully Got All Late Evening Prayer"})
      .status(200);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

module.exports = {client_get_all_late_evening_prayer, client_get_all_morning_prayer, client_get_all_evening_prayer, client_get_all_midday_prayer, client_get_midday_opening_prayer, midday_opening_prayer, morning_prayer, client_get_morning_prayer, confession, client_get_confession, scripture, client_get_scripture, lords_prayer, client_get_lords_prayer, closing_prayer, client_get_closing_prayer};