const bodyParser = require("body-parser");

const https = require("https");

const express = require("express");

const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/login.html");
});

app.post("/",function(req,res){
    const fname = req.body.firstName;
    const lname = req.body.lastName;
    const emailAd = req.body.inputEmail;

    const data = {
        members: [
            {
                email_address: emailAd,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }

        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/087a3e967f";

    const options = {
        method:"POST",
        auth: "victor1:b6b2471ba1d8c7ea2a3ecc3baae97d06-us11"
    }

    const request = https.request(url,options,function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

});

app.listen(3000, function(){
    console.log("Server running 3k");
});

//key
//b6b2471ba1d8c7ea2a3ecc3baae97d06-us11

//ID
//087a3e967f