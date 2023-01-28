const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Email Format Not Correct');
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(value < 7) {
                throw new Error('Password Must be More Than 7 Characters');
            }
        }
    },
    country:{
      type:String
    },
    deactivate:{
        type:Boolean
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
},{
    timestamps:true
})

UserSchema.statics.getUserByToken = async (token)=>{
    try {
        const user = await User.findOne({'tokens.token':token},'_id');
        if (!user) {
            throw new Error('User Not Found');
        }
        return user;
    } catch(e){
    throw new Error(e.message);
    }
}

UserSchema.methods.generateTokens = async function(){
    //The user is now been represented with this keyword
    const user = this;
    if (!user) {
        throw new Error('User Not Found');
    }
    const token = await jwt.sign({_id:user._id.toString()},process.env.JWT_TOKEN,{expiresIn:'10 days'});
    user.tokens = user.tokens.concat({token});   
    await user.save();
    return token;
}

UserSchema.statics.isEmailRegistered = async(email) =>{
    const user = await User.findOne({email});

    if (user) {
        throw new Error('Email or Password not correct');
    }
    return true;
}

UserSchema.statics.checkCredentials = async (email,pass) =>{
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('User Not Found');
    }

    const hashedPass = user.password;
    const validatePassword = await bcrypt.compare(pass,hashedPass);

    if (!validatePassword) {
        throw new Error('Username and Password Not Correct');
    }
    
    return user;
}

UserSchema.methods.matchPassWord = async function(oldpassword){
    const user = this;
    const password = user.password;
    const validatePassword = await bcrypt.compare(oldpassword,password);
    if (!validatePassword) {
        throw new Error('Old Password is Incorrect Please Try again Later');
    }
    return user;
}

UserSchema.methods.checkPassword = async function(pass) {
    const user = this;
    const password = user.password;
    const validatePass = await bcrypt.compare(pass,password);
    if (validatePass == false) {
        return false;
    }
    return user;
}


UserSchema.pre('save',async function(next){
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
})

//Remove user and all other User Component from Database
UserSchema.pre('remove',async function (next) {
    const user = this;
    next();
})



const User = mongoose.model('User',UserSchema);


module.exports = User;