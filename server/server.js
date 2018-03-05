var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
var admin = require('firebase-admin');
const {ObjectID} = require('mongodb');

var {Note} = require("./models/note");
var {User} = require("./models/user");
var {mongoose} = require("./db/mongoos");
var serviceAccount = require('./fireBase/firebase-keys.json');

const port = process.env.PORT || 3000;

//FireBase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://iesdigital-79d3d.firebaseio.com"

});

var app = express();

//Makes log about requests
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

//Save note do database and send it to user by FCM service
app.post('/notes',(req,res) => {
    // The topic name can be optionally prefixed with "/topics/".
    var topic = 'IES';

    console.log(`Saving JobSeekerID: ${req.body.JobSeekerID} note to mongoDB.`);

    var mongoID;

    var note = new Note({
        NoteStatusID: req.body.NoteStatusID,
        AppearanceReason : req.body.AppearanceReason,
        JobSeekerID : req.body.JobSeekerID,
        FirsName: req.body.FirsName,
        LastName: req.body.LastName,
        AppearanceDate: req.body.AppearanceDate,
        PreviousAppearanceDate: req.body.PreviousAppearanceDate,
        NextAppearanceDate: req.body.NextAppearanceDate,
        NextAppearanceShiftID: req.body.NextAppearanceShiftID,

        ClarkFirstName: req.body.ClarkFirstName,
        ClarkLastName: req.body.ClarkLastName,
        ClarkStendNumber: req.body.ClarkStendNumber,
        QueueNumber: req.body.QueueNumber,
    });

    note.save().then((note) => {
        req.body.mongoID = note._id;
        res.send(`\nSuccessfully ${JSON.stringify(req.body,undefined,2)}`);
    },(e) => {
       res.status(400).send(e);
    });

    // See documentation on defining a message payload.
    var message = {
        data: req.body
        ,
        notification:{
            title: 'שלום' + note.FirsName,
            body: 'Notification body'
        },
        topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        res.status(200).send('Successfully sent message:'+ response);
    })
    .catch((error) => {
        res.status(404).send('Error sending message:'+ error);
    });
});

//set new user to database
app.post('/setUser',(req,res) => {

    var user = new User({
        JobSeekerIdentityCard: req.body.JobSeekerIdentityCard,
        MobileNumber: req.body.MobileNumber,
        JobSeekerID:req.body.JobSeekerID
    });

    user.save().then((user) => {
       console.log(`User ${user.JobSeekerID} was saved. (id: ${note._id})`);
    },(e) => {
       console.log(`Warning! User ${user.JobSeekerID} wasn't saved.)`,e);
       //res.status(400).send(e);
    });
});

//get all notes
app.get('/notes',(req,res) => {
    Note.find().then((notes) => {
        res.send({notes});
    }, (e) => {
        res.status(400).send(e);
    })
});

//get note by id
app.get('/notes/:id',(req,res) => {
    var id = req.params.id;
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
}
    Note.findById(id).then((note) => {
        if(!note) {
            res.status(404).send('Note not exist');
        } else {
        res.send({note});
        }
    }, (e) => {
        res.status(400).send();
    })
});

app.listen(port, ()=>{
    console.log('IESNotes server is running on port : ', port);
});

module.exports = {app};
