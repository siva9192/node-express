const express = require('express');

const app =express();

let mongodb_url ='mongodb+srv://Siva1996:siva1996@cluster0.4rgwr.mongodb.net/siva1996?retryWrites=true&w=majority';
//create express web server
//basic c route
app.get('/',(req,res)=>{
    res.send("app is ready!");
});

let port = 5000;
app.listen (port,(err)=>{
    if (err) throw err;
    console.log ('express server port is running on'+port)
});