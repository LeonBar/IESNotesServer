const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoos');
const {Note} = require('./../server/models/note');
const {User} = require('./../server/models/user');

// var id = '5a96b725493056591ffc2e6e';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Note.find({
//     _id:id
// }).then((notes) => {
//     if(notes.length == 0) {
//         return console.log('data not found');
//     }
//     console.log('FIND -> Your Notes are :\n ',notes);
// });

// Note.findOne({
//     _id:id
// }).then((note) => {
//     if(!note) {
//         return console.log('data not found');
//     }
//     console.log('FINDONE ->Your Note is :\n ',note);
// });

// Note.findById(id).then((note) => {
//     if(!note) {
//         return console.log('Id not found');
//     }
//     console.log('FINDBYID -> Your Note is :\n ',note);
// }).catch((e) => console.log(e));

var id = '5a9d05e792e1bd63321a8078';

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

User.findById(id).then((user) => {
    if(!user) {
        return console.log('User not found');
    }
    console.log(JSON.stringify(user,undefined,2));
}, (e) => {
    console.log(e);
})