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
    databaseURL: 'https://ies-cell.firebaseio.com'

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

    console.log(`Saving JobSeekerID: ${req.body.JobSeekerID} note to mongoDB.`);

    var note = new Note({
        NoteStatusID: req.body.NoteStatusID,
        AppearanceReason : req.body.AppearanceReason,
        JobSeekerID : req.body.JobSeekerID,
        AppearanceDate: req.body.AppearanceDate,
        PreviousAppearanceDate: req.body.PreviousAppearanceDate,
        NextAppearanceDate: req.body.NextAppearanceDate,
        NextAppearanceShiftID: req.body.NextAppearanceShiftID,
        MobileNumber: req.body.MobileNumber,

        ClerkName: req.body.ClarkFirstName,
        ClarkStendNumber: req.body.ClarkStendNumber,
        QueueNumber: req.body.QueueNumber,
    });

    var topic = req.body.JobSeekerID;
    
    console.log(`topic: ${topic}`);

    //save to mongoDB
    note.save().then((note) => {
        req.body.MongoID = note._id;
        res.send(`\n${JSON.stringify(req.body,undefined,2)}\nSaved to Database`);
    },(e) => {
       res.status(400).send(e);
    });

    //save user if not exist.
    User.findOne({JobSeekerID:req.body.JobSeekerID}).then((user) => 
    {
    if(!user) {
        var user = new User ({
            JobSeekerID: req.body.JobSeekerID,
            JobSeekerIdentityCard: req.body.JobSeekerIdentityCard,
            MobileNumber: req.body.MobileNumber
        });
        user.save();
        console.log(`User: ${JobSeekerID} Saved`);
    }
    console.log(`User: ${req.body.JobSeekerID} exist`);
    });


    // See documentation on defining a message payload.
    var message = {
        data: req.body
        ,
        notification:{
            body: 'פתח הודאה זו להצגת הפתקית'
        },
        topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    admin.messaging().send(message)
    .then((response) => {
        res.status(200).send('Note sent Successfully: '+ response);
    })
    .catch((error) => {
        res.status(404).send('Error sending Note:'+ error);
    });
});

app.post('/userValidation',(req,res)=> {

    User.findOne({
        JobSeekerID: req.body.JobSeekerID,
        MobileNumber: req.body.MobileNumber
    }).then((user) => 
    {
    if(!user) {
     res.send({IsValid:false});
    }
    res.send({IsValid:true});
    });

});

//set new user to database
app.post('/setUser',(req,res) => {

    var user = new User({
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

//get note by mongoDB id
app.get('/notes/:id',(req,res) => {
    
    if(!ObjectID.isValid(req.params.id)) {
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

//Get all jobseeker notes
app.get('/notes/jobseeker/:id',(req,res) => {
    
    Note.find({JobSeekerID:req.params.id}).then((notes) => {
        if(!notes) {
            res.status(404).send('Notes not exist');
        } else {
            res.send({notes});
        }
    }, (e) => {
        res.status(400).send();
    })
});

app.listen(port, ()=>{
    console.log('IESNotes server is running on port : ', port);
});

module.exports = {app};
