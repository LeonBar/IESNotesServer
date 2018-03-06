var mongoose = require("mongoose");

var Note = mongoose.model('Note',{

    NoteStatusID: {
        type: Number,
        required: true
    },
    AppearanceReason: {
        type: String,
        required: true
    },
    JobSeekerID: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    AppearanceDate: {
        type: Date,
        required: true   
    },
    NextAppearanceDate: {
        type: Date
    },
    NextAppearanceShiftID: {
        type: String
    },
    PreviousAppearanceDate: {
        type: String
    },
    QueueNumber: {
        type: String,
        min: 0
    },
    ClarkStendNumber: {
        type: Number,
        min: 0
    },
    ClerkName: {
        type: String
    },
    ClarkLastName: {
        type: String
    },
    MongoID: {
        type: String
    },
    MobileNumber: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.exports = {Note};