##IESNotes API
March 07, 2018

##Overview
API for Internal Biometric station use

#Set User
Set new user to API database.

URL | /user
Method | POST

Data type | application/json
Data Params | 
Required: jobseekerID [Number],MobileNumber [string]

Success Response | Code: 200

Error Response | Code: 404

Sample Call
  {
  url: "/user",
  dataType: "application/json",
  data : { 
         “JobSeekerID” : 100,
         “MobileNumber” : 0520000000
  },
  type : "POST",
  success : function(r) {
  console.log(r);
  }


User Validation
Checks if user exist in database.

URL | /userValidation
Method | POST

Data type | application/json
Data Params | 
REQUIRED: JobSeekerID [Number], MobileNumber [string]
Success Response | Code: 200
Context:
{
    “isValid” : [boolean] 
}
Error Response | Code: 404
Sample Call
 url: "/userValidation",
  dataType: "json",
  data : { 
         “JobSeekerID” : 1000,
         “MobileNumber” : 0520000000
  },
  type : "POST",
  success : function(r) {
   console.log(r);
  }

Send Note
Send new note.

URL | /note
Method | POST

Data type | application/json
Data Params | 
REQUIRED: NoteStatusID [Number],  JobSeekerID [Number], AppearanceDate [Timestamp], AppearanceReason [String],
MobileNumber [String], BiometricLogID [Number],

OPTIONAL: PreviousAppearanceDate [Timestamp], NextAppearanceDate [Timestamp], NextAppearanceShift [String], 
ClerkName [String], QueueNumber [Number], ClarkStendNumber [Number],

Success Response | Code: 200
Context:
{ 
       “MongoID” : “5dsad21564321dsa21354621”
}
Error Response | Code: 404




Sample Call |
  url: "/note",
  dataType: "application/json",
  data : { 
        "NoteTypeID": "2",
        "JobSeekerID" : "1081",
        "AppearanceDate": "1514811600",
        "PreviousAppearanceDate": "1514811600",
        "NextAppearanceDate": "1514811600",
        "NextAppearanceShift": "יום ד משמרת 2 בשעות 10:30-13:00",
        "QueueNumber": "1092",
        "ClerkStandNumber": "4",
        "ClerkName": "משה",
        "AppearanceReason": "מנגנון הניתוב",
        "MobileNumber" : "0527730483",
        “BiometricLogID” : “546123”
  },
  type : "POST",
  success : function(r) {
  console.log(r);
  }
Notes |
When you calling that method it will:
1. Save the note in the server.
2. Checks if the user exist if not add the user to users database.
3. Sends the note to the client (Mobile) using google FCM service.



Get Note by ID (uses MongoDB ID)
Return specific note by it’s MongoID
URL | /notes/:id
Method | GET
URL Params | REQUIRED: [integer] 
example: 
.../notes/5dsa32dasdsag45621354fsda21 
Success Response | Code: 200
Context:
 { 
        "NoteStatusID": "2",
        "JobSeekerID" : "1081",
        "AppearanceDate": "1514811600",
        "PreviousAppearanceDate": "1514811600",
        "NextAppearanceDate": "1514811600",
        "NextAppearanceShift": "יום ד משמרת 2 בשעות 10:30-13:00",
        "QueueNumber": "1092",
        "ClerkStendNumber": "4",
        "ClerkName": "משה",
        "AppearanceReason": "מנגנון הניתוב",
        "MobileNumber" : "0527730483",
        “BiometricLogID” : “123546“,
        “MongoID” : “5dsa32dasdsag45621354fsda21”
  }
Error Response | Code: 404
Sample Call |
  url: "/notes/5dsa32dasdsag45621354fsda21",
  dataType: "application/json",
  type : "GET",
  success : function(r) {
  console.log(r);
  }
Get Jobseeker Notes
Return all notes that belong to specific jobSeeker by passing to the method jobseeker id.

URL | /notes/jobseeker/:id
Method | GET
URL Params | REQUIRED: [integer] 
example: 
.../notes/jobseeker/1081 

Success Response | Code: 200
Context:
{
"notes": [
               {
                    "_id": "5a9fe211e7bb9a00145af27d",
	                   "NoteStatusID": 2,
                   "AppearanceReason": "מנגנון הניתוב",
                   "JobSeekerID": 1081,
                   "AppearanceDate": "2018-01-01T13:00:00.000Z",
                   "PreviousAppearanceDate": "2018-01-01T13:00:00.000Z",
                   "NextAppearanceDate": "2018-01-01T13:00:00.000Z",
                   "MobileNumber": "0527730483",
                   "QueueNumber": 54646,
                   "BiometricLogID": 5642313,
                    "__v": 0
                  }, …
                 ]
}
Error Response | Code: 404

Sample Call |
  url: "/notes/jobseeker/1081 ",
  dataType: "application/json",
  type : "GET",
  success : function(r) {
  console.log(r);
  }

















Synchronise JobSeeker notes by ID
Return all notes that jobseeker doesn’t have in his local database.

URL | /notes/sync
Method | POST

Data type | application/json
Data Params | 
REQUIRED: JobSeekerID [Number], MongoID[JSONArray]
Success Response | Code: 200
Context:
{
	"notes": [
                {
                     "_id": "5a9ff1e467e60c1e8e4efd50",
                     "NoteTypeID": 2,
                     "AppearanceReason": "מנגנון הניתוב",
                     "JobSeekerID": 1081,
                     "AppearanceDate": "1514811600",
                     "PreviousAppearanceDate": "1514811600",
                     "NextAppearanceDate": "1514811600",
                     "MobileNumber": "0527730483",
                     "QueueNumber": 54646,
                     "BiometricLogID": 5642313,
                     "__v": 0
                 }, …
                ]
}

Error Response | Code: 404
Sample Call |
  url: "/notes/sync",
  dataType: "application/json",
  data : { 
        "JobSeekerID": "100",
	        “MongoIDs”: [
                               {“MongoID”: “5dsad21564321dsa21354621”},
                               {“MongoID”: “5dsad21564321dsa21354622”}
                                ]
   },
  type : "POST",
  success : function(r) {
  console.log(r);
  }

