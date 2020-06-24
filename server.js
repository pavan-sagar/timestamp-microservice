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

app.get('/api/timestamp/:date_string?',(req,res)=>{

  let unix_format, utc_format;

  //Check that the input is not blank.
  if(req.params.date_string){
    

    //Check if the input is in unix format (all numbers) or otherwise (includes - in between).
    if(req.params.date_string.includes('-')){
        //Already in string. No conversion required

        unix_format = new Date(req.params.date_string).getTime();
        utc_format = new Date(req.params.date_string).toUTCString();

    }else{
        //Input is in unix format. Convert it to Number 

        unix_format = new Date(Number(req.params.date_string)).getTime();
        utc_format = new Date(Number(req.params.date_string)).toUTCString();
    }

  }else{
    unix_format = new Date().getTime();
    utc_format = new Date().toUTCString();
  }

  //Return invalid date if there is wrong input given
  if(utc_format == 'Invalid Date'){
    res.json({"error" : "Invalid Date" });
  }
  
  
res.json({unix: unix_format, utc: utc_format});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});