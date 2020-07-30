const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const app = express();
//import proofile schema
require('./Model/Profile');
let Profile =mongoose.model("profile");

/* ======================MIDDLEWARE STARTS HERE BLOCK ===========================*/

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/*=======================ENDS MIDDLEWARE BLOCK =========================*/

/*========================SERVE STATIC ASSETS================================*/
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));
/*========================ENDS STATIC ASSETS BLOCK================================*/

//connect database
let mongodb_url =
  "mongodb+srv://Siva1996:Siva1996@cluster0.4rgwr.mongodb.net/Siva1996?retryWrites=true&w=majority";
mongoose.connect(
  mongodb_url,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) throw err;
    console.log("database connected !");
  }
);
///basic route
app.get("/", (req, res) => {
  //fetch data from database
  Profile.find({}).lean().then (profile=>{
    res.render('./home', {profile})
  })
  
  .catch(err=>console.log(err));
});

/*===================ALL GET REQUEST ============*/
// @HTTP METHODS
//GET,POST,PUT,DELETE
app.get("/login", (req, res) => {
  res.render("./auth/login");
});
app.get("/register", (req, res) => {
  res.render("./auth/register");
});

app.get("/add-profile", (req, res) => {
  res.render("./profiles/addprofile-form");
});

/*===================ALL GET REQUEST ends here ============*/

// *   all post request code starts here   *//
app.post("/create-profile", (req, res) => {
  const { firstname, lastname, phone } = req.body;
  let errors = [];
  if (!firstname) {
    errors.push({ text: "Firstname is Required!" });
  }
  if (!lastname) {
    errors.push({ text: "Lastname is Required!" });
  }
  if (!phone) {
    errors.push({ text: "phone is Required!" });
  }
  if (errors.length > 0) {
    res.render("./profiles/addprofile-form", {
      errors,
      firstname,
      lastname,
      phone,
    });
  } else {
    let newProfiles = {
      firstname,
      lastname,
      phone,
    };
    // should have to save into database
    new Profile(newProfiles)
      .save()
      .then((profile) => {
        res.redirect("/", 201, { profile });
      })
      .catch((err) => console.log(err));
  }
});
// *   all post request code ends here   *//


//listen port
let port = 5000;

app.listen(port, (err) => {
  if (err) throw err;
  console.log("express server is running on port number " + port);
});
