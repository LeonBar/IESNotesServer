var mongoose = require("mongoose");

var User = mongoose.model('User',{

    JobSeekerIdentityCard: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    MobileNumber: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    JobSeekerID: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
});

module.exports = {User};