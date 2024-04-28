const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/movieapp";

mongoose.connect(mongoURI,{useNewUrlParser: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open',function(error){
    if(error) {
        console.log("err",error);
    }
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;