const express = require("express");
const validator = require('validator');
const Signup = require('../model/Signup');

let localStorage;

if (typeof localStorage === "undefined" || localStorage === null) {
  let LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}


const signin = async (req, res) => {
  try {
    //Check if The Endpoint is sending something
    if (Object.keys(req.body).length < 1) {
      throw new Error("This Endpoint Requires some certain given fields");
    }

    //List of Accepted Fields
    const collectibles = ["email", "password"];
    const body = req.body;
    const { email, password } = body;
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

    let user = await Signup.checkCredentials(email, password);
    if(!user) {
        return res.send({error:'Email and Password is Incorrect'});
    }

    const token = await user.generateTokens();

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', token);
    }

    //Remove Some Details from the User Like the password
     user = user.toJSON();
     delete user.password;

    return res
      .json({ error: false, data:{token, user}, statusText: "User Login Successfully" })
      .status(200);
    }
    
    catch(e){
    return res
        .json({ error: true, errorMsg: e.message })
        .status(200);
  }
}

//Declare signup function
const signup = async (req, res) => {
  try {
    const collectibles = ["email","password","country"];
    const body = req.body;
    const keys = Object.keys(body);

    if (keys.length < 1) {
      throw new Error(`The required field is not found ${collectibles}`);
    }

    const isKey = collectibles.filter((key) => !keys.includes(key));
    const theAffectedKey = isKey[0];

    if (isKey.length > 0) {
      throw new Error(
        `${theAffectedKey} is not valid, below are the list of Accepted fFields ${collectibles}`
      );
    }

    //Get Data
    const bodyData = {
      email: validator.normalizeEmail(body.email),
      password: body.password,
      country:body.country
    };

    //Check if Email has been used
    const isEmail = await Signup.isEmailRegistered(body.email);

    if (!isEmail) {
      throw new Error("The email has been used by another account");
    }

    //Check if Password is Empty
    if (validator.isEmpty(body.password)) {
      throw new Error('Password Field Cannot Be Empty');
    }

    //Check if Password is Strong Enough
    if (!validator.isStrongPassword(body.password)){
      throw new Error('Sorry, your password must contain at least 8 character, an upercase and a lowercase character')
    }
  
    let users = new Signup(bodyData);
  
    //Generate token
    const token = await users.generateTokens();
    
    //save student data
    let user = await users.save();

    if (!user) {
      throw new Error('An error occured, please try again later....')
    }
      //Remove Some Details from the User Like the password
      user = user.toJSON();
      delete user.password;

      if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
      } else {
        localStorage.setItem('token', token);
      }
      
    return res
      .json({ error: false, data:{token, user}, statusText: "User Successfully Signed Up" })
      .status(201);

    } catch (e) {
    res.status(200).json({ error: true, errorMsg: e.message });
  }
};

const change_password = async (req,res) => {
  try {    
    //Check Old Password
    const user = await req.user.matchPassWord(req.body.old_password);
    if (!user) {
      throw new Error('Please Check your Old Password');
    }
    //Change Password
    req.user.password = req.body.password;
    await req.user.save();
    return res
      .json({ error: false, statusText: "Password Successfully Changed" })
      .status(201);
  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}

const edit_profile = async(req,res) =>{
  try {
    if (!req.user) {
      throw new Error('Authentication Failed')
    }
    const data = await Signup.findByIdAndUpdate(req.id,req.body);
    return res
      .json({ error: false, data, statusText: "User Profile Updated Successfully" })
      .status(201);

  }catch(e){
    return res.status(200).json({ error: true, errorMsg: e.message });
  }
}


module.exports = {signup, signin, change_password, edit_profile};
