var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var _ = require('lodash');

var router = express.Router();
var app = express();

var PORT = 3002;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/assets/images/favicon.png'));
app.use(bodyParser.json({
	limit: '5mb'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
router.get('/', render);
router.get('*', render);

app.use(router);

var fullUrl = "http://example.com";
var baseData = {
	title: "Starter",
	description: "Super simple starter",
	image: fullUrl + "/assets/images/facebook.png",
	frameGenerated : false,
	prod: process.env.ENV === 'prod',
	fullUrl: fullUrl
}

function render(req, res) {
	res.render('index', baseData);
}

app.listen(PORT, (err)=> {
    console.log("Express server listening on port", PORT);
});
