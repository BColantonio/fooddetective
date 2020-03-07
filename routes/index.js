const _ = require('lodash');
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
const sql = require('mssql');
const db = require('../db');
const session = require('express-session');
const SESS_NAME = 'sid';
const SESS_SECRET = 'asdf';
var MssqlStore = require('mssql-session-store')(session);
const NODE_ENV = 'development';
const IN_PROD = NODE_ENV === 'production';
let userId;
// router.use('/public', express.static('./'))
/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Food Detectives' });
// });
router.use(bodyParser.urlencoded({
  extended: true
}));
sql.connect(db.config, function(err) {
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
  router.get('/', (request, response) => {
    console.log('fart')
    if (request.session) {
      userId = request.session;
    }
    if (!_.isUndefined(userId)) {
      console.log('farter')
      response.render('index.ejs', {
        userId: userId,
        title: "Food Detectives"
      });
    } else {
      console.log('farted')
      response.render('index', {
        title: "Food Detectives"
      });
    }
  });
});
// router.get("/details", function(req, res) {
//
//     let searchId = req.query.id;
//             let unirest = require("unirest");
//
//             req = unirest("GET", `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${searchId}`);
//
//             req.headers({
//                 "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//                 "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
//             });
//
//
//             req.end(function (resp) {
//                 if (res.error) throw new Error(res.error);
//
//                 details += resp.body;
//                 res.render('products', {details: resp.body})
//
//                 console.log(resp.body);
//             });
//
// });

   // console.log(products());
  // req.end(function (res) {
  //     if (res.error) throw new Error(res.error);
  //     products = res.body.products;
      //console.log(products)
      // async function badges() {
      //   _.forEach(products, function (product, i) {
      //     return badger = getProduct(product.id)
      //   })
      //  _.forEach(products, function (product, i) {
      //     products[i] = {
      //       title: product.title,
      //       image: product.image,
      //       ids: product.id,
      //       badges: badger[i]
      //     }
      //  });
//});
  // waitForValue(products)
  //
  //
  //     console.log(products)
  //     _.forEach(products, function(product, i){
          //console.log(product.ids);
//           products.ids[i] = {
//               badges: getProduct(product.ids)
//           }
//       });
//       console.log(products)
//       waitForValue();
//     });
//   }
// });
//   function waitForValue(products) {
//     if(!_.isUndefined(products)) {
//       httpMsgs.sendJSON(req, res, {
//         from: 'Server',
//         products: products
//       });
//     }
//     else {
//       setTimeout(waitForValue, 250)
//     }
//     // console.log(products, 'here i am bitch')
//   }
//
//   function getProduct(id) {
//     req = unirest("GET", `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${id}`,
//       {
//         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//         "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
//       });

    // req.end(function (res) {
    //   if (res.error) throw new Error(res.error);
      // _.forEach(res, function(resp){
      //     console.log(resp[0])
      // })
      //console.log(res)
      // console.log(badgess[products.length - 1])
//       return badgess;
//     });
//   }
// });
module.exports = router;
