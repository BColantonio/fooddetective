const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const NODE_ENV = 'development';
const IN_PROD = NODE_ENV === 'production';
const path = require('path');
const session = require('express-session');
const SESS_NAME = 'sid';
const SESS_SECRET = 'asdf';
let apiRouter = require('./routes/api');
let dbRouter = require('./routes/db');
let indexRouter = require('./routes/index');
let productsRouter = require('./routes/products');
var usersRouter = require('./routes/users');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public'));
app.use('/api', apiRouter);
app.use('/db', dbRouter);
app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

// const users = [
//   { id: 1, name: 'John', email: 'john@gmail.com', password: '1234' },
//   { id: 2, name: 'Sam', email: 'sam@gmail.com', password: '1234' },
//   { id: 3, name: 'Bill', email: 'bill@gmail.com', password: '1234' }
// ];
//
app.use(bodyParser.urlencoded({
  extended: true
}));
//
app.use(session({        // TODO: look into session store
  name: SESS_NAME,
  resave: false,                  // rolling: Force a session identifier cookie to be set on every response.
  saveUninitialized: false,       //          The expiration is reset to the original maxAge, resetting the expiration
  secret: SESS_SECRET,            //          countdown.          The default value is: false.
  cookie: {                       // NOTE:    When this option is set to: true; but the <saveUninitialized> option is set
    maxAge: 900000,               //          to: false, the cookie will not be set on a response with an uninitialized session.
    sameSite: true,               //          It only makes sense to issue a cookie if user is authenticated. If you are not authenticated
    secure: IN_PROD               //          there is no id to issue
  }
}));                                // store:   DB implementation for session stores. When this isn't provided, default: is :in-memory: store.
//                                     // unset:   allows for session var access through the request object for every connection to the server
//                                     // destroy: useful for when user logs out.
//                                     // regenerate:
const redirectLogin = (request, response, next) => {
  if (!request.session.userId) {
    response.redirect('/login')
  } else {
    next()
  }
};
//
const redirectHome = (request, response, next) => {
  if (request.session.userId) {
    response.redirect('/home')
  } else {
    next()
  }
};
//
app.use((request, response, next) => {
  const {userId} = request.session;
  if (userId) {
    response.locals.user = users.find(
        user => user.id === userId
    )
  }
  next()
});
//
// app.get('/', (request, response) => {
//   const { userId } = request.session;
//   response.render('/index', {userId: userId});
// });
//
// app.get('/home', redirectLogin, (request, response) => {
//   const { user } = response.locals
//   console.log(request.sessionID)
//   response.send(`
//         <h1>Home</h1>
//         <a href="/">Main</a>
//         <ul>
//             <li>Name: ${user.name}</li>
//             <li>Email: ${user.email}</li>
//         </ul>
//     `)
// });
//
// app.get('/preferences', redirectLogin, (request, response) => {
//   const { user } = response.locals
// });
// app.get('/login', redirectHome, (request, response) => {
//   // once we do all of the validation
//   // and verification of credentials
//   // request.session.userId =
//   response.send(`
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
// app.get('/register', redirectHome, (request, response) => {
//   response.send(`
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
// app.post('/login', redirectHome, (request, response) => {
//   const { email, password } = request.body;
//
//   if (email && password) {    //TODO: validation
//     const user = users.find(
//         user => user.email === email && user.password === password  //TODO: COMPARE AND HASH
//     );                                                                            // Search: npm-decrypt
//
//     if (user) {
//       req.session.userId = user.id
//       return response.redirect('/home')
//     }
//   }
//
//   response.redirect('/login')
// });
//
// app.post('/register', redirectHome, (request, response) => {
//   const { name, email, password } = request.body;
//
//   if (name && email && password) { //TODO: validation
//     const exists = users.some(
//         user => user.email === email
//     )
//
//     if (!exists) {
//       const user = {
//         id: users.length + 1,
//         name,
//         email,
//         password //TODO: hash
//       }
//
//       users.push(user)
//
//       request.session.userId = user.id
//
//       return response.redirect('/home')
//     }
//   }
//
//   response.redirect('/register') //TODO: qs /register?error=error.auth.userExists
//
// });
//
// app.post('/logout', redirectLogin, (request, response) => {
//   request.session.destroy(err => {
//     if (err) {
//       return response.redirect('/home')
//     }
//
//     response.clearCookie(SESS_NAME)
//     response.redirect('/login')
//   })
// });


// catch 404 and forward to error handler
app.use(function(request, response, next) {
  next(createError(404));
});

// error handler
app.use(function(err, request, response, next) {
  // set locals, only providing error in development
  response.locals.message = err.message;
  response.locals.error = request.app.get('env') === 'development' ? err : {};

  // render the error page
  response.status(err.status || 500);
  response.render('error');
});

module.exports = app;
