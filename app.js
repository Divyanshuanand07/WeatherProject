const express=require("express");
const https= require("https");
const bodyParser = require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/",function(req,res){

    const query=req.body.CityName;
    const unitt ="metric";
    const apiKey ="f2fa9cebacacd8e3f9ae28ac8724f599";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey+ "&units=" + unitt;

    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            //console.log(data);
            const weatherData= JSON.parse(data);
            const temp=weatherData.main.temp;
            
            console.log(temp);
            console.log(weatherData);
            res.send("<h1>The temperature in "+query+ " is "+ temp+ "</h1>");
             
        })
    })

    //res.send("Server started");
    
});

app.listen(3000, function(){
    console.log("Server is running on port 3000");

})