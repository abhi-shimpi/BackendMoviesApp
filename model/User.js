const mongoose = require("mongoose");

/*User schema*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type : String,
        required :true
    },
    password: {
        type: String,
        required: true
    },
    watchlistData: {
        type: Array,
        default: []
    }
});

const User = mongoose.model('User',userSchema);

module.exports = User;
