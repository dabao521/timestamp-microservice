var express = require("express");
var moment = require("moment");
var app = express();

// db connection

//passport initialize

//middle wares set up
app.use("/public", express.static(process.cwd() + "/public"));
//routes

app.get("/", function(req, res){
  return res.sendfile(process.cwd() + "/index.html");
});

app.get("/:query", function(req, res){
  var datestring = req.params.query;
  var myDate;
  if(/^\d+$/.test(datestring)) {
    myDate = moment.unix(datestring);
  }else {
    myDate = moment(datestring, "MMMM D, YYYY");
  }
  if(myDate.isValid()) {
    return res.json({
      "unix" : myDate.valueOf(),
      "natural" : myDate.format("MMMMM Do, YYYY")
    });
  }else {
    return res.json({
      "unix" : null,
      "natural": null
    });
  }
});

app.listen(process.env.PORT || 8080, function(){
  console.log("express server is listing on port 8080");
});