var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var server = app.listen(3000);

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
