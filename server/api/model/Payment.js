"use strict"

require('dotenv').config({path:'config/dev.env'});
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const {DataTypes, Model } = require("sequelize");

const {sequelize} = require('../../src/helper/conn');

class Payment extends Model {}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
   matric_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Matric Number Field is required" },
        },
        trim: true,
    },

    amount:{
      type:DataTypes.INTEGER,
      allowNull:false,
      validate: {
        notNull: { msg: "Amount is required" },
      }
    },

    type :{
        type:DataTypes.STRING,
        defaultValue: "Successful",
    },

    title:{
      type:DataTypes.STRING,
      defaultValue:'Departmental Fee'
    },
  },
  {
    // Other model options go here
    sequelize,
    modelName: "payment",
  }
);

Payment.sync({alter:true}).then(() => {
  console.log("Payment Successfully Created");
});

module.exports = Payment;
