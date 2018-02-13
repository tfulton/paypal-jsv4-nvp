# PayPal Checkout w/NVP - Node.js and Express Example

An example PayPal checkout integration using the PayPal NVP server API's.  The project uses Node in the Express framework.

## Setup Instructions
1. Install packages:
    ```
    npm install
    ```

2. Customize your API credentials in the [./config/default.json](./config/default.json) configuration file.  Specifically, you will need your username, password and signature.

3. Start the server:
    ```
    npm start
    ```

    By default, this runs the app on port `3000`. You can configure the port by setting the environmental variable `PORT`.

4. Navigate a browser to http://localhost:3000/

## Testing Transactions
Sandbox testing requires a valid PayPal account, sandbox credentials and 1 or more test accounts.  Please see the [PayPal Sandbox Testing Guide](https://developer.paypal.com/docs/classic/lifecycle/ug_sandbox/) for a full guide on setting up and using the PayPal sandbox.



