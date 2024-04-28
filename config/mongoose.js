const mongoose = require("mongoose");
const uri = 'mongodb://127.0.0.1:27017/movieapp';

mongoose.connect(uri,{useNewUrlParser: true,useUnifiedTopology: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open',function(error){
    if(error) {
        console.log("err",error);
    }
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;