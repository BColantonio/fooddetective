const _ = require('lodash');
const express = require('express');
const path = require('path');
const router = express.Router();
const session = require('express-session');
const NODE_ENV = 'development';
const IN_PROD = NODE_ENV === 'production';
const SESS_NAME = 'sid';
const SESS_SECRET = 'asdf';
const db = require('../db');
const sql = require('mssql');
router.use(session({
    name: SESS_NAME,
    resave: false,
    saveUninitialized: false,
    genid: function(req) {
        return genuuid();
    },
    secret: SESS_SECRET,
    cookie: {
        maxAge: 900000,
        sameSite: true,
        secure: IN_PROD
    }
}));

router.post('/register', function(req, res) {
    var username2 = req.body.username2;
    var password = req.body.password;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var emailAddress = req.body.emailAddress;

    sql.connect(db).then(pool => {
        return pool.request()
            .input('userName', sql.VarChar(30), username2)
            .input('password', sql.VarChar(30), password)
            .input('firstName', sql.VarChar(30), firstName)
            .input('lastName', sql.VarChar(30), lastName)
            .input('emailAddress', sql.VarChar(30), emailAddress)
            .execute('usp_Users_CreateNewUser')
    }).then(result => {
        console.log(result.recordset[0].userID)
        if (!_.isUndefined(result.recordset[0].userID)) {
             req.session.userID = result.recordset[0].userID;
             console.log(req.session.genId);
            res.render('preferences', {userInfo: {
                    username: username2,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    email: emailAddress,
                 }
            });
        } else {
             console.log('error')
        }
    }).catch(err => {
        console.log(err)
    })

});

router.get('/getPreferences', (request, response) => {
    // return preferences
})
router.post('/addPreferences', (request, response) => {
   let diet = request.body.diet;
});
router.patch('/updatePreferences')
module.exports = router;

/* GET home page. */
// router.post('/signup', function(req, res) {
//     var results;
//     var username = req.body.username;
//     var password = req.body.password;
//     sql.connect(db).then(pool => {
//         return pool.request()
//             .input('username', sql.VarChar(30), username)
//             .input('password', sql.VarChar(30), password)
//             .output('returnValue', sql.VarChar(50))
//             .execute('usp_Users_UserLogin')
//     }).then(result => {
//         //console.log(result)
//         results = result;
//         // console.log(results)
//         if (result.output.returnValue == 1) {
//             res.redirect('/preferences');
//         } else {
//             console.log('error')
//         }
//     }).catch(err => {
//         console.log(err)
//     })
//
// });

// router.post('/register', function(req, res) {
//     console.log(req.body)
//     var results;
//     var username2 = req.body.username2;
//     var firstName = req.body.firstName;
//     var lastName = req.body.lastName;
//     var emailAddress = req.body.emailAddress;
//     var password = req.body.password;
//     sql.connect(db).then(pool => {
//         return pool.request()
//             .input('username', sql.VarChar(30), username2)
//             .input('password', sql.VarChar(30), password)
//             .input('firstName', sql.VarChar(30), firstName)
//             .input('lastName', sql.VarChar(30), lastName)
//             .input('emailAddress', sql.VarChar(30), emailAddress)
//             .output('returnValue', sql.VarChar(50))
//             .execute('usp_Users_CreateNewUser')
//     }).then(result => {
//         // console.log(result)
//         results = result;
//         // console.log(results)
//         if (result.output.returnValue == 1) {
//             res.redirect('/preferences');
//         } else {
//             console.log('error')
//         }
//     }).catch(err => {
//         console.log(err)
//     })
//
// });

module.exports = router;
