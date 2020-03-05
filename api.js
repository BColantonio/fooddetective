const headers = {
    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
    "x-rapidapi-key": "7X0MNUFnWRmshxYgMbgWqlOFnZwcp1lyo5tjsnGS7k2WclVBNw"
};
const unirest = require('unirest');
let apiRequest;

const basicSearch = (product, response) => {

    apiRequest = unirest("GET", "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/search");

    apiRequest.headers(headers);

    apiRequest.query({"query": product});

    apiRequest.end(async (apiResponse) => {

        if (response.error || apiResponse.error) throw new Error (response.error);
        let products = await apiResponse.body.products;
        return response.render('products', {products: products})
    })

};

const advancedSearch = (productId, response) => {

    apiRequest = unirest("GET", `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/products/${productId}`);

    apiRequest.headers(headers);

    apiRequest.end(async (apiResponse) => {

        if (response.error || apiResponse.error) throw new Error (response.error);
        let details = await apiResponse.body;
        return response.render('details', {details: details})
    })
}

exports.basicSearch = basicSearch;
exports.advancedSearch = advancedSearch;
