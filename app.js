var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var campground_model = require("./models/campground");
var comment_model = require("./models/comment");
var user_model = require("./models/user");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");


var commentRoutes = require("./routes/comment");
var campgroundRoutes = require("./routes/campground");
var indexRoutes = require("./routes/index");

// seedDB();
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useNewUrlParser', true);
// process.env.DATABASEURL - set DATABASEURL on heroku 
var database_url = process.env.database_url || "mongodb://localhost/yelp_camp_v12"
mongoose.connect(database_url, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log("Connect to DB");
}).catch(err =>{
    console.log("ERROR" + err.message);
});
// mongoose.connect("mongodb://localhost/yelp_camp_v12");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());// don't after passport
app.locals.moment = require('moment'); // above passport config

//PASSPORT Configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes)


var port_number = (process.env.PORT || 3000);
app.listen(port_number, function(){
    console.log("Server Starts!");
});
// app.listen(3000, function(){
//     console.log("Server starts on port 3000");
// });