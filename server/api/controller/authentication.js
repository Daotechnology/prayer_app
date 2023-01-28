const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const validator = require('validator');

const Signup = require('../model/Signup');

//Cookies
app.use(cookieParser());


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
    const times = parseInt(60 * 60 * 24 * 5 * 1000);

    res.cookie('token',token,{
        maxAge:times,
        httpOnly:true,
        // secure:true
    });

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

      const times = parseInt(60 * 60 * 24 * 5 * 1000);
    res.cookie('token',token, {
        maxAge:times,
        httpOnly:true,
        // secure:true
    });
      
    return res
      .json({ error: false, data:{token, user}, statusText: "User Successfully Signed Up" })
      .status(201);

    } catch (e) {
    res.status(200).json({ error: true, errorMsg: e.message });
  }
};




module.exports = {signup, signin};
