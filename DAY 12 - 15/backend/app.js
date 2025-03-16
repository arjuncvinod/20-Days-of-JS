const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs/promises');
const path = require('path');


const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttError = require("./models/http-error")

const port = process.env.PORT || 5000

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads','images')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/places',placesRoutes); //=>/api/places/..
app.use('/api/users',usersRoutes);


app.use((req, res, next)=>{
const error = new HttError("Could not find this route.",404);
throw error;
});

app.use((error, req, res, next)=>{
    if(req.file){
        fs.unlink(req.file.path,(err)=>{
            console.log(err);
            
        });
    }
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message:error.message || "An unknown error occured"});
})

mongoose.connect("mongodb+srv://root:0v07wksJanfztk8f@cluster0.10o8l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    app.listen(port);
    console.log(`Server is running on port ${port}`);
}).catch(err=>{
    console.log(err);
});

