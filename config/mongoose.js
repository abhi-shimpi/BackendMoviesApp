const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://abhishekshimpi23:JfGhjGzyQOJnruwp@cluster0.kwmdw8j.mongodb.net/?retryWrites=true&w=majority";

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