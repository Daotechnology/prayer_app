"use strict"
require('dotenv').config({path:'config/dev.env' });
const jwt = require('jsonwebtoken');
const redis = require("redis");
const Signup = require('../model/Signup');

let redisClient;

(async() => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

const validate = async(req, res, next) => {
    let result;
    const cachedResult = await redisClient.get('token');
    const decode = jwt.verify(JSON.parse(cachedResult), process.env.JWT_TOKEN);
    if (!decode) {
        req.error = 'Jwt Expired or cannot be used';
        next();
    }

    if (cachedResult) {
      result = JSON.parse(cachedResult);
      req.token = result;
      req.payload = JSON.parse(Buffer.from(result.split('.')[1], 'base64').toString());
      next();
    } else {
      req.error = 'Not Authenticated';
      next();
    }
};

const jwtAuthenticate = async (req,res,next) =>{
  //get the header
  try {
      let token = req.header('Authorization');
      if (!token) {
          throw new Error('No Authetication Found');
      }
      token = token.replace('Bearer ',''); //Getting The Actual Token
      const decode = await jwt.verify(token, process.env.JWT_TOKEN);
      if (!decode) {
          throw new Error('Authentication Failed');
      }
      req.matric = decode.matric;
      req.id = decode.id;
      const user = await Signup.findByPk(req.id);
      req.user = user;
      next();
  } catch(e) {
      return res.json({error:true,errorMsg:e.message}).status(401);
  }
}

module.exports =  { validate , jwtAuthenticate };
