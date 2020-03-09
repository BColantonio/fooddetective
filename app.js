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
