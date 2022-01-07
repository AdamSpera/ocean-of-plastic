require('dotenv').config();
const Twit = require('twit');

var T = new Twit({
  consumer_key: process.env.TWIT_CONSUMER_KEY,
  consumer_secret: process.env.TWIT_CONSUMER_SECRET,
  access_token: process.env.TWIT_ACCESS_TOKEN,
  access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
});

var postTest = () => {
  T.post('statuses/update', { status: "Hello World!" }, function (err, data, response) {
    console.log(data)
  })
};

postTest();