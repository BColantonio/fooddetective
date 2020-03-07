const _ = require('lodash');
const db = require('../db');
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
// const users = [
//     { id: 1, name: 'John', email: 'john@gmail.com', password: '1234' },
//     { id: 2, name: 'Sam', email: 'sam@gmail.com', password: '1234' },
//     { id: 3, name: 'Bill', email: 'bill@gmail.com', password: '1234' }
// ]
//
router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(session({        // TODO: look into session store
    name: SESS_NAME,
    resave: false,                  // rolling: Force a session identifier cookie to be set on every response.
    saveUninitialized: false,       //          The expiration is reset to the original maxAge, resetting the expiration
    secret: SESS_SECRET,            //          countdown.          The default value is: false.
    cookie: {                       // NOTE:    When this option is set to: true; but the <saveUninitialized> option is set
        maxAge: 900000,             //          to: false, the cookie will not be set on a response with an uninitialized session.
        sameSite: true,             //          It only makes sense to issue a cookie if user is authenticated. If you are not authenticated
        secure: IN_PROD             //          there is no id to issue
    }
}));                                // store:   DB implementation for session stores. When this isn't provided, default: is :in-memory: store.
//                                     // unset:   allows for session var access through the request object for every connection to the server
//                                     // destroy: useful for when user logs out.
//                                     // regenerate:
// const redirectLogin = (request, response, next) => {
//     if (!request.session.userId) {
//         response.redirect('/login')
//     } else {
//         next()
//     }
// };
//
const redirectHome = (request, response, next) => {
    if (request.session.userId) {
        response.redirect('/home')
    } else {
        next()
    }
};
//
router.use((request, response, next) => {
    const {userId} = request.session;
    if (userId) {
        request.locals.user = users.find(
            user => user.id === userId
        )
    }
    next()
});
// router.get('/', (request, response) => {
//     const { userId } = req.session;
//     res.send(`
//         <h1>Welcome!</h1>
//         ${userId ? `
//             <a href="/home">Home</a>
//             <form method="post" action="/logout">
//                 <button>Logout</button>
//             </form>
//             `:`
//             <a href="/login">Login</a>
//             <a href="/register">Register</a>
//         `}
//     `)
// });
//
// router.get('/home', redirectLogin, (request, response) => {
//     const { user } = res.locals
//     console.log(req.sessionID)
//     res.send(`
//         <h1>Home</h1>
//         <a href="/">Main</a>
//         <ul>
//             <li>Name: ${user.name}</li>
//             <li>Email: ${user.email}</li>
//         </ul>
//     `)
// });
//
// router.get('/preferences', redirectLogin, (request, response) => {
//     const { user } = res.locals
// });
// router.get('/login', redirectHome, (request, response) => {
//     // once we do all of the validation
//     // and verification of credentials
//     // req.session.userId =
//     res.send(`
//         <h1>Login</h1>
//         <form method="post" action="/login">
//             <input type="email" name="email" placehold="email" required />
//             <input type="password" name="password" placeholder="password" required />
//             <input type="submit" />
//         </form>
//         <a href="/register">Register</a>
//     `)
// });
//
// router.get('/register', redirectHome, (request, response) => {
//     res.send(`
//         <h1>Register</h1>
//         <form method="post" action="/register">
//             <input type="text" name="name" placehold="name" required />
//             <input type="email" name="email" placehold="email" required />
//             <input type="password" name="password" placeholder="password" required />
//             <input type="submit" />
//         </form>
//         <a href="/login">Register</a>
//
//     `)
// });
//
router.post('/login', redirectHome, (request, response) => {
    const { username, password } = request.body;


    if (username && password) {    //TODO: validation
        request.session.userID = db.userLogin(request, response, username, password);
        console.log('sessionId', request.session.userID)
        // if (!_.isUndefined(results.recordset[0].userID)) {
            //response.redirect('/preferences');
        //     console.log('DEFINED', results.recordset[0].userID)
        // }
        // const user = users.find(
        //     user => user.email === email && user.password === password  //TODO: COMPARE AND HASH
    }                                                                         // Search: npm-decrypt
    // if (user) {
        //     req.session.userId = user.id
        //     return res.redirect('/home')
        // }
    // }
    //
    // res.redirect('/login')
});
//
// router.post('/register', redirectHome, (request, response) => {
//     const { name, email, password } = req.body;
//
//     if (name && email && password) { //TODO: validation
//         const exists = users.some(
//             user => user.email === email
//         )
//
//         if (!exists) {
//             const user = {
//                 id: users.length + 1,
//                 name,
//                 email,
//                 password //TODO: hash
//             }
//
//             users.push(user)
//
//             req.session.userId = user.id
//
//             return res.redirect('/home')
//         }
//     }
//
//     res.redirect('/register') //TODO: qs /register?error=error.auth.userExists
//
// });
//
// router.post('/logout', redirectLogin, (request, response) => {
//     request.session.destroy(err => {
//         if (err) {
//             return res.redirect('/home')
//         }
//
//         response.clearCookie(SESS_NAME)
//         response.redirect('/login')
//     })
// });

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

// router.get('/getPreferences', (request, response) => {
//     // return preferences
// })
// router.post('/addPreferences', (request, response) => {
//    let diet = request.body.diet;
// });
// router.patch('/updatePreferences')
// module.exports = router;

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
