const _ = require('lodash');
const express = require('express');
const router = express.Router();
const db = require('mssql');

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
