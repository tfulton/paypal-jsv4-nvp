var express = require('express');
var router = express.Router();
var config = require('./config');
var Paypal = require('paypal-nvp-api');

router.post('/', function (req, res, next) {

    var paypal = Paypal(config.PP_CONFIG);

    console.log(req.originalUrl + " body : ", req.body);
    var payload = JSON.parse(req.body.data);

    // calculate total
    var items = payload.cartData.items;
    var total = 0;
    for (var i = 0; i <= items.length - 1; i++) {
        console.log("item: ", items[i]);
        total += items[i].quantity * items[i].price;
    }

    var query = {
        METHOD:'SetExpressCheckout',
        VERSION:'204.0',
        PAYMENTREQUEST_0_PAYMENTACTION:'Order',
        PAYMENTREQUEST_0_AMT:total,
        PAYMENTREQUEST_0_ITEMAMT:total,
        PAYMENTREQUEST_0_SHIPPINGAMT:'0.00',
        PAYMENTREQUEST_0_TAXAMT:'0.00',
        PAYMENTREQUEST_0_CURRENCYCODE:'USD',
        PAYMENTREQUEST_0_DESC:'test EC payment',
        L_PAYMENTREQUEST_0_NAME0:items[0].name,
        L_PAYMENTREQUEST_0_AMT0:items[0].price,
        L_PAYMENTREQUEST_0_NUMBER0:items[0].name + '123',
        L_PAYMENTREQUEST_0_QTY0:items[0].quantity,
        L_PAYMENTREQUEST_0_NAME1:items[1].name,
        L_PAYMENTREQUEST_0_AMT1:items[1].price,
        L_PAYMENTREQUEST_0_NUMBER1:items[1].name + '123',
        L_PAYMENTREQUEST_0_QTY1:items[1].quantity,
        NOSHIPPING: 0,
        ADDROVERRIDE: 1,
        PAYMENTREQUEST_0_SHIPTONAME:payload.shippingData.shipping_address.recipient_name,
        PAYMENTREQUEST_0_SHIPTOSTREET: payload.shippingData.shipping_address.line1,
        PAYMENTREQUEST_0_SHIPTOSTREET2: payload.shippingData.shipping_address.line2,
        PAYMENTREQUEST_0_SHIPTOCITY: payload.shippingData.shipping_address.city,
        PAYMENTREQUEST_0_SHIPTOSTATE: payload.shippingData.shipping_address.state,
        PAYMENTREQUEST_0_SHIPTOZIP: payload.shippingData.shipping_address.postal_code,
        PAYMENTREQUEST_0_SHIPTOCOUNTRYCODE: payload.shippingData.shipping_address.country_code,

        RETURNURL: 'http://localhost:3000/confirm',
        CANCELURL: 'http://localhost:3000/'
    };

    console.log("query: ", JSON.stringify(query));

    paypal.request('SetExpressCheckout', query)
        .then(function (result) {
            console.log("RESULT: ", result);
            res.status(200).send(result.TOKEN)
        })
        .catch(function (err) {
            console.trace("ERROR: ", err);
            res.status(500).send(err)
        });
});

module.exports = router;
