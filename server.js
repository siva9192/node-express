const express = require('express');
const mongoose = require('mongoose');
const exphbs =require("express-handlebars");
const app =express();




//---middlewars start-----
// ---template engine middleware---*/
app.engine("handlebars",exphbs());
app.set("view engine","handlebars");


//-----middlewares end-----
// npm install express -handlebars

let mongodb_url ='mongodb+srv://Siva1996:Siva1996@cluster0.4rgwr.mongodb.net/Siva1996?retryWrites=true&w=majority';
mongoose.connect(
    mongodb_url,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (err) =>{
        if (err) throw err;
        console.log("database conncted !");
    }
);
//error handling

//built-in middleware
//express built-in
// app.use(express.static());//to serve static assests sush as html files,images,and so on.
// app.use(express.json());//
// //third party middleware

//create express web server
//basic c route
app.get('/',(req,res)=>{
    // res.send("app is ready!");
    res.render("./home.handlebars");
});

let port = 5000;
app.listen (port,(err)=>{
    if (err) throw err;
    console.log ('express server port is running on'+port)
});