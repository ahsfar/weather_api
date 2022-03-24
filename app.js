const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
// getting the user input on /index.html
app.get("/",function(req, res){
  res.sendFile(__dirname + "/index.html")


});
//posting data back to user (client)
app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "80122093876d5e82041734b61877c153";
  const unit = "metric";
  // apilocation url
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid="+ apiKey;
  https.get(url, function(response){
    console.log(response);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);

      // getting the temperatrue from the JSON format (json tree)
      const temp = weatherData.main.temp;
      console.log(temp);
      // printing wether description
      const tempdesc = weatherData.weather[0].description;
      // console.log(temp);
      // const desc = "The weathe is currently " + tempdesc;
      // to get the icon to display
      const icon =  weatherData.weather[0].icon;
      const imgURl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      //display the data
      res.write("<p>The weather is currently " + tempdesc + "</p>");
      res.write("<h1>The temperature in " + query +" is " + temp + " degrees Celcius. </h1>");
      res.write("<img src=" + imgURl + ">");
      res.send();


    });
  });

});
//listening on port localhost:3000
app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
