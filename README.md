paypal-jsv4-nvp
---------------

# Overview
Walk through an end-to-end "mark" integration using JSV4 via server NVP.  This flow uses an Order>Auth>Capture (sans the 'capture' within the current pages implemented here).

**Main Objectives and Key Learning:**
* Understand how a JSV4 client interacts with a "classic" NVP backend implementation.
* Identify how the client and server components interact in the context of an end-to-end integration.

# Questions
* Can you clearly identify where and how the JSV4 "client" makes the call to _SetExpressCheckout_?
* Can you identify where and how the JSV4 client passes control to the backend after the user confirms the payment?

# Install
* Clone or download this project to your local development machine. Unzip if required.
* In a command line (i.e. DOS or other command line) move into the target directory.
* Run `npm install`

# Configure
* Add your class API credentials to [config.js](./routes/config.js)
* Add your PayPal REST app clientId in the [config.js](./routes/config.js) (used for the  JSV4 "client")

# Run
* `npm start`
* Navigate using your favorite browser to [localhost:3000](http://localhost:3000)



