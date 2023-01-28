const express = require("express");
const app = express();
const Payment = require('../model/Payment');

const payment = async(req, res) => {
    try {
        //Check if The Endpoint is sending something
    if (Object.keys(req.body).length < 1) {
        throw new Error("This Endpoint Requires some certain given fields");
    }
  
      //List of Accepted Fields
    const collectibles = ["amount"];
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

      const payment = new Payment({
        matric_number:req.matric,
        amount:parseFloat(req.body.amount),
      })
      await payment.save();

      //Fetch all Transaction Data
      let allTransaction = await Payment.findAll({where:{matric_number:req.matric}});
      if (allTransaction.length < 1) {
        allTransaction = [];
      }

      return res.json({
        error:false,
        data: allTransaction,
        total:allTransaction.length,
        statusText:'Tranasaction Successful'
      })
      
    } catch(e) {
        return res.json({error:true,errorMsg:e.message});
    }
}



module.exports = { payment };