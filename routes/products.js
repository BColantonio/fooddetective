const _ = require('lodash');
const express = require('express');
const router = express.Router();
const unirest = require('unirest');
let details;
let products;
/* GET home page. */


router.get("/details", function(req, res) {
    //console.log(req)

    let searchId = req.query.id
    console.log(searchId);
            let unirest = require("unirest");

            req = unirest("GET", `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${searchId}`);

            req.headers({
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
            });


            req.end(function (resp) {
                if (res.error) throw new Error(res.error);
                console.log(resp.body.title)
                details += resp.body;
                res.render('details', {details: resp.body})

               // console.log(resp.body);
            });

});


module.exports = router;
