const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error')
const User = require('../models/user')



const getUsers = async (req, res, next)=>{
    let users;
    try{
        users = await User.find({},'-password');
    }
    catch(error){
        return next(new HttpError("Fetching users failed, please try again later",500));
    }
    res.json({users:users.map(user=>user.toObject({getters:true}))})
};

const signup =async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors);
      
       return next(new HttpError("Invalid inputs passed, please check your data",422))
    }
    const {name, email, password} = req.body;



    let existingUser;
    try{
        existingUser = await User.findOne({email:email})
    }
    catch(error){
        return next(new HttpError('Signing up failed, please try again later.',500));
    }
    if(existingUser){
        return next(new HttpError('User exists already, please login instead',422));
    }

    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password,12);
    }
    catch(err){
        return next(new HttpError('Could not create user, please try again.',500))
    }
    const createdUser = new User({
            name,
            email,
            image: req.file.path,
            password:hashedPassword,
            places:[]
    })
    
    try{
        await createdUser.save();
    }
    catch(error){
        return next(new HttpError('Signing up failed, please try again',500));
    }


    let token;
    try{
    token = jwt.sign({userId:createdUser.id,email:createdUser.email},
        'supersecret_dont_share',
        {expiresIn:'1h'});
    }
    catch(error){
        return next(new HttpError('Signing up failed, please try again',500));
    }

    res.status(201).json({userId:createdUser.id,email:createdUser.email,token: token});

}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Logging in failed, please try again later.', 500));
    }

    let isValidPassword = false;
    try{
        isValidPassword = await bcrypt.compare(password,existingUser.password);
    }
    catch(error){
        return next(new HttpError('Could not log you in, Please check your credentials and try again.',500))
    }

    if(!isValidPassword){
        return next(new HttpError("Invalid credentials, could not log you in", 401));
    }

    if (!existingUser) {
        return next(new HttpError("Invalid credentials, could not log you in", 401));
    }

    let token;
    try{
        token = jwt.sign({userId:existingUser.id,email:existingUser.email},
            'supersecret_dont_share',
            {expiresIn:'1h'});
        }
        catch(error){
            return next(new HttpError('Logging in failed, please try again',500));
        }
    

    res.json({ userId:existingUser.id,email: existingUser.email, token: token });
};


exports.getUsers = getUsers;
exports.signup = signup;
exports.login =login;