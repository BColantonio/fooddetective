const config = {
    user: 'detectives',
    password: 'neit2020',
    server: 'Sql.neit.edu',
    database: 'se425_food_detectives',
    port: 4500
};
const _ = require('lodash');
const bodyParser = require('body-parser')
const express = require('express');
const path = require('path');
const router = express.Router();
const session = require('express-session');
const NODE_ENV = 'development';
const IN_PROD = NODE_ENV === 'production';
const SESS_NAME = 'sid';
const SESS_SECRET = ' asdf ';
const sql = require('mssql');
var MssqlStore = require('mssql-session-store')(session);
router.use(bodyParser.urlencoded({
    extended: true
}));
sql.connect(config, function(err) {
    if (err) return callback(err);
    router.use(session({        // TODO: look into session store
        name: SESS_NAME,
        store: new MssqlStore({reapInterval: 10, ttl: 10}),
        resave: false,                  // rolling: Force a session identifier cookie to be set on every response.
        saveUninitialized: false,       //          The expiration is reset to the original maxAge, resetting the expiration
        secret: SESS_SECRET,            //          countdown.          The default value is: false.
        cookie: {                       // NOTE:    When this option is set to: true; but the <saveUninitialized> option is set
            maxAge: 900000,               //          to: false, the cookie will not be set on a response with an uninitialized session.
            sameSite: true,               //          It only makes sense to issue a cookie if user is authenticated. If you are not authenticated
            secure: IN_PROD               //          there is no id to issue
        }
    }));
    let userLogin = (request, response, username, password) => {
        sql.connect(config).then(pool => {
            return pool.request()
              .input('username', sql.VarChar(30), username)
              .input('password', sql.VarChar(30), password)
              .execute('usp_Users_UserLogin')
        }).then(async result => {
            let results = await result;
            console.log(results)
            console.log(results.recordset[0].userID)
            console.log('sessionBEFORE', request.session)
            request.session["userID"] = results.recordset[0].userID;
            console.log('sessionAFTER', request.session.userID)
            return request.session.userID;
            // if (results.output.returnValue === 1) {
            //     response.redirect('/preferences');
            // } else {
            //     console.log('error')
            // }
        }).catch(err => {
            return err;
        });
    }

exports.userLogin = userLogin;
exports.config = config;
});
