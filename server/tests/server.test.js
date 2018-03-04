// const expect = require('expect');
// const request = require('request');

// const {app} = require('./../server');
// const {Node} = require('./../models/note');

// describe('POST /notes', () => {
//     it('should create and send a note', (done) => {

//             NoteStatusID = 3;
//             AppearanceReason = 1;
//             JobSeekerID = 132154;
//             FirsName = 'דן';
//             LastName = 'גולדין';
//             AppearanceDate = 2018-02-01;
//             PreviousAppearanceDate = 2018-01-01;
//             NextAppearanceDate = 2018-03-01;
//             NextAppearanceShiftID = 'משהו משהו';
//             ClarkFirstName = 'מאיר';
//             ClarkLastName = 'חמד';
//             ClarkStendNumber = 7;
//             QueueNumber = 888;

//             request(app)
//             .post('sendNote')
//             .send({
//                 NoteStatusID = NoteStatusID,
//                 AppearanceReason = AppearanceReason,
//                 JobSeekerID = JobSeekerID,
//                 FirsName = FirsName,
//                 LastName = LastName,
//                 AppearanceDate = AppearanceDate,
//                 PreviousAppearanceDate = PreviousAppearanceDate,
//                 NextAppearanceDate = NextAppearanceDate,
//                 NextAppearanceShiftID = NextAppearanceShiftID,
//                 ClarkFirstName = ClarkFirstName,
//                 ClarkLastName = ClarkLastName,
//                 ClarkStendNumber = ClarkStendNumber,
//                 QueueNumber = QueueNumber
//             })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.NoteStatusID).toBe(NoteStatusID);
//             })
//             .end((err,res) => {
//                 if(err){
//                     return done(err);
//                 }

//                 Note.find().then((notes) => {
//                     expect(notes.length).toBe(1);
//                     expect(notes[0].NoteStatusID).toBe(NoteStatusID);
//                     done();
//                 }).catch((e) => done(e));
//             });
//         });
// });