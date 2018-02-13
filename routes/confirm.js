var express = require('express');
var router = express.Router();
var config = require('config');
var Paypal = require('paypal-nvp-api');


router.get('/', function (req, res, next) {
    var token = req.query.token;
    var payerId = req.query.PayerID;

    console.log("token: ", token);
    console.log("payerID: ", payerId);

    var paypal = Paypal(config.get("env"));

    var query = {
        'METHOD':'GetExpressCheckoutDetails',
        'VERSION':config.get("env").API_VERSION,
        'TOKEN':token
    };

    paypal.request('GetExpressCheckoutDetails', query)
        .then(function (result) {
            console.log("RESULT: ", result);
            res.render('confirm', {
                payment: result,
                token: token,
                payerId: payerId,
                amount: result.PAYMENTREQUEST_0_AMT

            });
        })
        .catch(function (err) {
            console.trace("ERROR: ", err);
            res.status(500).send(err)
        });
});

module.exports = router;
