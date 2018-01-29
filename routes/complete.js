var express = require('express');
var router = express.Router();
var config = require('./config');
var Paypal = require('paypal-nvp-api');

router.post('/', function (req, res, next) {
    var token = req.body.token;
    var payerId = req.body.payerId;
    var amount = req.body.amount;

    console.log("token: ", token);
    console.log("payerID: ", payerId);

    var paypal = Paypal(config.PP_CONFIG);

    var query = {
        'VERSION': config.PP_CONFIG.API_VERSION,
        'METHOD': 'DoExpressCheckoutPayment',
        'TOKEN': token,
        'PAYMENTACTION': 'Order',
        'PAYERID': payerId,
        'AMT': amount
    };

    paypal.request('DoExpressCheckoutPayment', query)
        .then(function (result) {
            console.log("RESULT: ", result);
            
            // do the auth
            paypal.request('DoAuthorization', {
                'METHOD':'DoAuthorization',
                'VERSION':'204.0',
                'TRANSACTIONID':result.TRANSACTIONID,
                'AMT':result.AMT,
                'CURRENCYCODE':result.CURRENCYCODE
            }).then(function(authResult) {
                res.render('complete', {
                    authorization: authResult,
                    token: token
                });
            })
        })
        .catch(function (err) {
            console.trace("ERROR: ", err);
            res.status(500).send(err)
        });
});

module.exports = router;
