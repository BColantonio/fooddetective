const _ = require('lodash');
const express = require('express');
const router = express.Router();
const unirest = require('unirest');
let details;
let products;
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
/* GET search product */
router.get('/search', function(req, res) {

    let search = req.query.mySearch;
    req = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search");

    req.query({
        "offset": "0",
        "number": "10",
        "maxCalories": "5000",
        "minProtein": "0",
        "maxProtein": "100",
        "minFat": "0",
        "maxFat": "100",
        "minCarbs": "0",
        "maxCarbs": "100",
        "minCalories": "0",
        "query": search
    });

    req.headers({
        "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
    });


    req.end(function (resp) {
        if (res.error) throw new Error(res.error);

        //console.log(resp.body.products);
        // console.log(ids)
        products = resp.body.products;
        res.render('products', {products: resp.body.products})

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
