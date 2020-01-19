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


app.get("/api/timestamp", (req, res)=>{
  const date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()})
});


app.get("/api/timestamp/:date_string", (req, res)=>{
  const date_string = req.params.date_string;
  // console.log("date_string: ", date_string);
  // console.log("isNum(date_string): ", !isNaN(date_string));
  // console.log("Date(): ", new Date(date_string));
  const date = new Date(date_string);
  if (isNaN(date.getTime())){
    // console.log("convert to num then cast to date");
    const numToDate = new Date(date_string*1000);
    res.json({unix: numToDate.getTime(), utc: numToDate.toUTCString()})
    // console.log("numToDate: ", numToDate);
  } else {
    res.json({unix: date.getTime(), utc: date.toUTCString()})
    
  }
  // console.log("date.getTime(): ", date.getTime());
  //something wierd with time strings, times by 1000 then pass to Date()
  // console.log("Date()*1000: ", new Date(date_string*1000)) //coerces date_string to int
  // console.log("Date(cat)== Invalid Date: ", Date("cat") === "Invalid Date");
  
  // res.json({unix: date.getTime(), utc: date.toUTCString()});
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