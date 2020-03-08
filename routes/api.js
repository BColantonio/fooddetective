const _ = require('lodash');
const api = require('../api');
const express = require('express');
const router = express.Router();


/* GET home page. */
router.get("/basicSearch", function(request, response) {
    let product = request.query.product;
    api.basicSearch(product, response);
});

router.get("/advancedSearch", function(request, response) {
    let productId = request.query.productId;
    api.advancedSearch(productId, response);
});

module.exports = router;
