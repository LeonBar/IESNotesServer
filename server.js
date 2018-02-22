var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');

var {mongoose} = require("./db/mangoos");
var{Note} = require("./models/note");

var app = express();

app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('./server.log', log + '\n', (err) => {
      if(err) {
        console.log('Unable to append to server.log.');
      }
    });
    console.log(log);
    next();
  });

app.use(bodyParser.json());

app.post('/Notes',(req,res) => {
    var note = new Note({
        JobSeekerID : req.body.JobSeekerID,
        NoteStatusID: req.body.NoteStatusID,
        AppearanceStatusID: req.body.AppearanceStatusID,
        ClarkFirstName: req.body.ClarkFirstName,
        ClarkLastName: req.body.ClarkLastName,
        ClarkStendNumber: req.body.ClarkStendNumber,
        QueueNumber: req.body.QueueNumber,
        FirsName: req.body.FirsName,
        LastName: req.body.LastName,
        PreviousAppearanceDate: req.body.PreviousAppearanceDate,
        NextAppearanceDate: req.body.NextAppearanceDate,
        NextAppearanceShiftID: req.body.NextAppearanceShiftID
    });

    note.save().then((note) => {
       console.log(`Jobseeker ${note.JobSeekerID} Note was saved. (id: ${note._id})`);
    },(e) => {
       res.status(400).send(e);
    });
});

app.listen(3000,() => {
    console.log('IESNotes server is running on port : 3000');
});

// var newNote = new Note({
//     JobSeekerID: 40264,
//     NoteStatusID: 1,
//     AppearanceStatusID: 1,
//     ClarkFirstName: "לאון",
//     ClarkLastName: "ברקן",
//     ClarkStendNumber: 18,
//     QueueNumber: 1801,
//     FirsName: "ישראל",
//     LastName: "ישראלי",
//     PreviousAppearanceDate: "2018-01-02 15:43",
//     NextAppearanceDate: "2018-01-03",
//     NextAppearanceShiftID: 3
// });