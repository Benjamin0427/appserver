const dotenv = require("dotenv");
const braintree = require("braintree");
const express = require("express");

dotenv.config();

const app = express();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

// var gateway = new braintree.BraintreeGateway({
//   // access_token: "A21AALcDDywtNaDWmX7iZmEpeSZq4ll85G1WBtDpEETHTa67z8TtxAxhBUtMrBjOc3snNiEll9zs6FMZCwBrrJPrUcQgRFf7A",
//   clientId: process.env.PUBLIC_KEY,
//   clientSecret: process.env.PRIVATE_KEY,
//   // merchantId: process.env.MERCHANT_ID,
//   // environment: braintree.Environment.Sandbox,
//   // accessToken: "A21AAJnLUXZgsUBQtOL2eCEf1hYADQ2G8HAWmyp8k7TwvtF-VdaH4LOypW7lIqh0KqcF2Xxo2Uv4bv8_enMyQWBSgqFLCxjNQ"
// });

// const auth = Buffer.from(
//   process.env.PUBLIC_KEY + ":" + process.env.PRIVATE_KEY,
// ).toString("base64");
// console.log(auth)

app.get("/getClientToken", async (req, res, next) => {
  try {
    gateway.clientToken.generate({}, function(err, response) {
      if (err) {
        res.status(400).send({
          token: null,
        });
        // console.log("Hello, I am here", res.json());
      }
      console.log('here-->', response);
      res.status(200).send({
        token: response.clientToken,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      token: null,
    });
  }


  // res.status(200).send({
  //   token: "sadf"
  // })
});

const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
