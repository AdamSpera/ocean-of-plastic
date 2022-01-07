require('dotenv').config();
var Twit = require('twit');
var express = require('express');
var app = express();
var fs = require('fs')

var T = new Twit({
  consumer_key: process.env.TWIT_CONSUMER_KEY,
  consumer_secret: process.env.TWIT_CONSUMER_SECRET,
  access_token: process.env.TWIT_ACCESS_TOKEN,
  access_token_secret: process.env.TWIT_ACCESS_TOKEN_SECRET
});

app.use(express.static('public'));
var server = app.listen(80, function () {
  console.log('Server is listening on port 80');
})

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

var start = () => { readFile() }

var readFile = () => {
  fs.readFile('value.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    mathAddition(parseInt(data));
  })
}

var mathAddition = (data) => {
  data = data + 7000000 + getRandomInt(900000);
  console.log(data);
  console.log(typeof data);

  writeFile(data);

}

var writeFile = (data) => {

  fs.writeFileSync('value.txt', data.toString());

  getDate(data);

}

var getDate = (data) => {

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  let monthText, dayText;

  if (mm == 01) {
    monthText = 'January';
  } else if (mm == 02) {
    monthText = 'Febuary';
  } else if (mm == 03) {
    monthText = 'March';
  } else if (mm == 04) {
    monthText = 'April';
  } else if (mm == 05) {
    monthText = 'May';
  } else if (mm == 06) {
    monthText = 'June';
  } else if (mm == 07) {
    monthText = 'July';
  } else if (mm == 08) {
    monthText = 'August';
  } else if (mm == 09) {
    monthText = 'September';
  } else if (mm == 10) {
    monthText = 'October';
  } else if (mm == 11) {
    monthText = 'November';
  } else if (mm == 12) {
    monthText = 'December';
  } else {
    monthText = 'Month';
  }

  if (dd[1] == 0 || dd[1] == 4 || dd[1] == 5 || dd[1] == 6 || dd[1] == 7 || dd[1] == 8 || dd[1] == 9) { 
    dayText = +dd + "th"
  } else if (dd[1] == 1) {
    dayText = +dd + "st"
  } else if (dd[1] == 2) {
    dayText = +dd + "nd"
  } else if (dd[1] == 3) {
    dayText = +dd + "rd"
  }

  let fullDate = `${monthText} ${dayText}, ${yyyy}`;

  postTwitter(`${monthText} ${dayText}, ${yyyy}`, data);

}

var postTwitter = (date, data) => {

  let postContent = `${date}\n\nTotal amount of plastic in ocean today:\n\n${data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}\n\n#SaveTheOcean #SaveOceans`;

  T.post('statuses/update', { status: postContent }, function (err, data, response) {
    console.log(data)
  })

}


start();