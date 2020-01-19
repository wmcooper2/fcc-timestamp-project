// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/timestamp/", (req, res)=>{
  const date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()})
});


app.get("/api/timestamp/:date_string", (req, res)=>{
  const date_string = req.params.date_string;
  const date = new Date(date_string);
  if (isNaN(date.getTime())){
    const numToDate = new Date(date_string*1);
    // console.log("numToDate: ", numToDate.toString().length);
    if (numToDate.toString() == "Invalid Date") {
      //resort to ducktyping?
      // res.render('error', { error: err })
      // https://expressjs.com/en/guide/error-handling.html
      res.json({error: "Invalid Date"});
    }
    res.json({unix: numToDate.getTime(), utc: numToDate.toUTCString()})
  } else {
    res.json({unix: date.getTime(), utc: date.toUTCString()})
  }
});

//example input
// GET [project url]/api/timestamp/2015-12-25
// GET project url]/api/timestamp/1450137600

//example output
//{"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"}










// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
