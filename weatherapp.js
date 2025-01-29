const dotenv = require('dotenv');
dotenv.config();
const { response } = require('express');
const express = require("express");
const https = require("https");

const bodyparser = require('body-parser');

const app = express();

function capitalize(data){
    data = data.charAt(0).toUpperCase() + data.slice(1);  //capitalizes the first letter of the string
    return data;
}


data = {city: '', 
    country: '',
    temperature: '',
    min_temperature: '',
    max_temperature: '',
    humidity: '',
    weather: '',
    wicon: '',
    weather_desc: ''};


app.use(bodyparser.urlencoded({extended: true}));
app.get("/", (req, res) => {            
    res.render(__dirname + "/views/index.ejs", data);
})

app.post("/", (req, res) => {
    
    const city = req.body.cityName; 
    const url = process.env.OpenWeather_API_URL + 'q=' +  city + '&appid=' + process.env.OpenWeather_API_Key + '&units=metric';
    try{https.get(url, (get_response) => {
        get_response.on("data", (data) => {
            const wdata = JSON.parse(data);
            console.log(wdata);
            if (wdata.cod == 200){

        weather_description = capitalize(wdata.weather[0].description);

        weather_data = { weather_id: wdata.weather[0].id,   // can be used for mapping the openweather icons with the github weather icons found online
                         city: wdata.name,
                         country: wdata.sys.country,
                         temperature: wdata.main.temp,
                         min_temperature: wdata.main.temp_min,
                         max_temperature: wdata.main.temp_max,
                         humidity: wdata.main.humidity,
                         weather: wdata.weather[0].main,
                         wicon: process.env.OpenWeather_API_Icon_Link + wdata.weather[0].icon + '@4x.png',
                         weather_desc: weather_description
                        };

        res.render("index.ejs", weather_data)}
        else {
            res.render("Not-found-page.ejs")
        }
        // // res.send( 'temp: ' + temp);
        // res.write('<h1> temp: ' + temp + '</h1><br><img src=' + wdata.main.icon +'/>');
        })
    })} catch(err){
        res.render("Not-found-page.ejs");
    }
    
})

app.listen(process.env.PORT, () => {
    console.log("Sever runs")
})

