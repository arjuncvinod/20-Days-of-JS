const {validationResult} = require('express-validator');
const mongoose = require('mongoose');
const fs = require('fs');

const HttpError = require('../models/http-error');
const Place = require('../models/place');
const User = require('../models/user')



const getPlaceById = async (req, res, next) => {
    const pid = req.params.pid;
    let place;
  try{
     place = await Place.findById(pid);
  }
  catch(err){
    return next(new HttpError('Something went wrong, could not find a place.',500));
  }

    if (!place) { 
      return next(new HttpError("Could not find a place for the provided place id",404));
    }
    
    res.json({ place:place.toObject({getters:true}) });
  }


const getPlaceByUserId = async (req, res, next) => {
    const uid = req.params.uid;
    let places
   try{
     places =await Place.find({creator:uid});
   }
   catch(err){
      return next(new HttpError("Could not find a place for the provided user id",500));
   }
    if (!places || places.length === 0) {
      return next(new HttpError("Could not find a places for the provided user id",404));
    }
    
    res.json({ places:places.map(place=>place.toObject({getters:true})) });
  }


const createPlaces = async (req, res, next)=>{

  const coordinates ={
    lat:5675678,
    lon:5678567,
  }
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors);
      return next(new HttpError("Invalid inputs passed, please check your data",422))
    }
    const {title,description,address} = req.body;
    const createdPlace = new Place({
      title,
      description,
      address,
      location:coordinates,
      image: req.file.path,
      creator:req.userData.userId
    });


    let user;
    try{
      user = await User.findById(req.userData.userId)
    }
    catch(error){
      return next(new HttpError('creating place failed, please try again',500));
    }


    if(!user){
      return next(new HttpError("could not find user for provided id",404));
    }

    try{
      const sess = await mongoose.startSession();
      sess.startTransaction();
      await createdPlace.save({session:sess});
      user.places.push(createdPlace);
      await user.save({session:sess});
      sess.commitTransaction();
    }
    catch(err){
      return next(new HttpError('creating place failed, please try again.',500));
    }

    res.status(201).json({createdPlace});
}


const updatePlaceById =async (req, res, next)=>{
  const errors = validationResult(req);
    if(!errors.isEmpty()){
      console.log(errors);
      
      throw new HttpError("Invalid inputs passed, please check your data",422)
    }
    const {title,description} = req.body;
    const pid = req.params.pid;
    
    let place;
    try{
      place = await Place.findById(pid);
    }
    catch(error){
      return next(new HttpError('Something went wrong, please try again.',500));
    }

    if(place.creator.toString() !== req.userData.userId){
      return next(new HttpError('You are not allowed to edit this place.',401)); 
    }

    place.title = title;
    place.description = description;
    
    try{
      await place.save();
    }
    catch(error){
      return next(new HttpError('Something went wrong, please try again.',500));
    }
    res.status(200).json({place:place.toObject({getters:true})});
}


const deletePlaceById = async (req, res, next) => {
  const pid = req.params.pid;
  let place;

  try {
    place = await Place.findById(pid).populate('creator');
    if (!place) {
      return next(new HttpError("Could not find a place with the provided ID.", 404));
    }
  } catch (error) {
    return next(new HttpError("Something went wrong, could not find the place.", 500));
  }

  if(place.creator.id !== req.userData.userId){
    return next(new HttpError('You are not allowed to delete this place.',401)); 
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    
    
    await place.deleteOne({ session: sess });


    if (place.creator) {
      place.creator.places.pull(place);
      await place.creator.save({ session: sess });
    }

    await sess.commitTransaction();
    sess.endSession(); 
  } catch (error) {
    return next(new HttpError("Something went wrong. Unable to delete, please try again.", 500));
  }

  fs.unlink(imagePath,err=>{
    console.log(err);
  });

  res.status(200).json({ message: "Deleted place successfully" });
};


exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlaces = createPlaces;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;