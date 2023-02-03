"use strict"
require('dotenv').config({path:'config/dev.env' });
const jwt = require('jsonwebtoken');
const Signup = require('./../model/Signup')

let localStorage;
let token;

if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const validate = async(req, res, next) => {
  const token = localStorage.getItem("token"); 
  if (!token) {
      return;
  }
  const decode = jwt.verify(token, process.env.JWT_TOKEN);
  if (!decode) {
      return;
  }
  const id = decode._id;
  const user = await Signup.findById(id);
  req.user = user;
  req.token = token;
  next();
};

const auth = async (req,res,next) =>{
  //get the header
  try {
      token = req.header('Authorization').replace('Bearer ','');
      if (!token) {
          throw new Error('No Authetication Found');
      }
      const decode = await jwt.verify(token, process.env.JWT_TOKEN);
      if (!decode) {
          throw new Error('Authentication Failed');
      }
      req.id = decode._id;
      const user = await Signup.findById(req.id);
      req.user = user;
      next();
  } catch(e) {
    return res.json({error:true,errorMsg:e.message}).status(401);
  }
}

module.exports =  { validate, auth};
