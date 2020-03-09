let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let createError = require('http-errors');
let ejs = require('ejs');
let mssql = require('mssql');
let session = require('express-session');
let mssqlstore = require('mssql-session-store')(session);
let db = require('./db')

let routes = {
  apiRouter: require('./routes/api'),
  dbRouter: require('./routes/db'),
  indexRouter: require('./routes/index'),
  // productsRouter: require('./routes/products')
};

let app = express();

app.set('view engine', 'ejs');

let apiRouter = routes.apiRouter;
let dbRouter = routes.dbRouter;
let indexRouter = routes.indexRouter;
// let productsRouter = routes.productsRouter;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 25 * 1000 }
}));
app.use(express.static('./public'));
//
app.use(function(req, res, next){
  console.log('req.session', req.session);
  res.locals.session = req.session;
  console.log('response.locals', res.locals);
  next()
});
//
app.use('/api', apiRouter);
app.use('/db', dbRouter);
app.use('/', indexRouter);
// app.use('/products', productsRouter);

// const redirectLogin = (request, response, next) => {
//   if (!request.session.userId) {
//     response.redirect('/login')
//   } else {
//     next()
//   }
// };
// //
// const redirectHome = (request, response, next) => {
//   if (request.session.userId) {
//     response.redirect('/home')
//   } else {
//     next()
//   }
// };
//
// app.use((request, response, next) => {
//   const {userId} = request.session;
//   if (userId) {
//     response.locals.user = users.find(
//         user => user.id === userId
//     )
//   }
//   next()
// });
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
