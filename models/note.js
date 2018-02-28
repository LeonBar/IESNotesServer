var mongoose = require("mongoose");

var Note = mongoose.model('Note',{

    NoteStatusID: {
        type: Number,
        required: true
    },
    AppearanceReason: {
        type: Number,
        required: true
    },
    JobSeekerID: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    FirsName: {
        type: String,
        trim: true
    },
    LastName: {
        type: String,
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
        type: Date
    },
    QueueNumber: {
        type: Number,
        min: 0
    },
    ClarkStendNumber: {
        type: Number,
        min: 0
    },
    ClarkFirstName: {
        type: String
    },
    ClarkLastName: {
        type: String
    }
});

module.exports = {Note};