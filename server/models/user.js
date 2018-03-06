var mongoose = require("mongoose");

var User = mongoose.model('User',{

    JobSeekerID: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    MobileNumber: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {User};