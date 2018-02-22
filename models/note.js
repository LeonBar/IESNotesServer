var mongoose = require("mongoose");

var Note = mongoose.model('Note',{
    JobSeekerID: {
        type: Number,
        required: true,
        minlength: 1,
        trim: true
    },
    NoteStatusID: {
        type: Number,
        required: true
    },
    FirsName: {
        type: String
    },
    LastName: {
        type: String
    },
    AppearanceStatusID: {
        type: Number,
        required: true
    },
    PreviousAppearanceDate: {
        type: Date
    },
    NextAppearanceDate: {
        type: Date
    },
    NextAppearanceShiftID: {
        type: Number
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