var express = require('express');
var router = express.Router();
var config = require('./config');

router.post('/', function (req, res, next) {

    var cart = req.body;
    console.log("/checkout cart: ", cart);

    // Prepping data.  We do this rather than build the details of an interactive cart -- with all the related HTML trappings.
    var cartData = {
        items: [
            {
                name : cart.fruit,
                description: "fruit",
                quantity: cart.fruitCount,
                price: 2.50,
                sku: 1,
                currency: "USD"
            },
            {
                name: cart.vegetable,
                description: "vegetables",
                quantity: cart.vegetableCount,
                price: 2.00,
                sku: 2,
                currency: "USD"
            },
        ]
    }

    var shippingData = {
        shipping_address: {
            recipient_name: "Chet Bronson",
            line1: "170 Market Street",
            line2: "Apt B",
            city: "San Jose",
            country_code: "US",
            postal_code: "95113",
            phone: "011862212345678",
            state: "CA"
        }
    }

    res.render('checkout', {
        clientId: config.PP_REST_CONFIG.clientId,
        cartData: cartData,
        shippingData: shippingData
    });
});

module.exports = router;
