if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const morgan = require('morgan');   //access log
const { env } = require("process");
const path = require('path');
const app = express();
const {isLoggedIn} = require('./api/config/auth')
const flash = require('express-flash')
const methodOverride = require('method-override');

const template_path = path.join(__dirname, "./template/views");
app.set('view engine', 'ejs');
app.set("views", template_path);

const session = require('express-session');
const passport = require('passport');
require('./api/config/passport')(passport);

app.use(session({
    secret: 'sessionSecret',
	resave: true,
	saveUninitialized: true,
    cookie: {sameSite: "Lax", maxAge: 600000}
}))

app.use(passport.initialize());
app.use(passport.session());


var logStream = fs.createWriteStream(path.join(__dirname, 'access.log'))

app.use(morgan('combined', {stream: logStream}));

//override method----
app.use(methodOverride('_method'));
// flash message on top----
app.use(flash());
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
})


//API

const addEvent = require("./api/admin/addEvent");
const deleteEvent = require("./api/admin/deleteEvent");
const seeEvent = require("./api/event");
const getList = require("./api/eventList");
const authentication = require("./api/users")

app.use(bodyParser.json({ limit: "20mb"}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(express.urlencoded());
app.use("/api",addEvent);
app.use("/api",deleteEvent);
app.use("/api",getList);
app.use("/api",seeEvent);
app.use('/api',authentication);

app.use(express.static("static"));
app.use(express.static("api"));

//Componenti pagine

/*function initMap() {
    var italy = {lat: 41.8719, lng: 12.5674};
    var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 6, center: italy});
  }
  
  initMap();
  var script = document.createElement('script');
  script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDgtaYWbPlP1LXuX4p9xm7N7NUhziob2Vw&callback=initMap";
  document.getElementsByTagName('head')[0].appendChild(script);*/

//carica un file esterno contenente la navbar
app.get('/navbarLoading', function (req, res) {
    res.render('navbar');
  });

//carica un file esterno contenente il footer
app.get('/footerLoading', function (req, res) {
    res.render('footer');
  });


//Route tra pagine

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/eventi', function (req, res) {
    res.render('eventi');
});

app.get('/evento', function (req, res) {
    res.render('evento');
});

app.get('/chiSiamo', function (req, res) {
    res.render('chiSiamo');
});

app.get('/login', function (req, res) {
    res.render('login');
});

app.get('/homepageAdmin', isLoggedIn, function (req, res) {
    res.render('homepageAdmin', {user:req.user});
});

app.get('/creaEvento', isLoggedIn, function (req, res) {
    res.render('creaEvento', {user:req.user});
});

app.get('/eventiAdmin', isLoggedIn, function (req, res) {
    res.render('eventiAdmin', {user:req.user});
});

app.get('/eliminaEvento', isLoggedIn, function (req, res) {
    res.render('eliminaEvento', {user:req.user});
});

app.listen(3001, function() { console.log('listening'); });
