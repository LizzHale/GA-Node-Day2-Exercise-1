var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var pg = require('pg');
var models = require('./models/index.js');

var app = express();
var server = app.listen(3000);

app.use(bodyParser.urlencoded({
  extended:true
}));

app.use(methodOverride('_method'));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('all');
});

app.get('/edit', function (req, res) {
  res.render('edit');
});

app.get('/add', function (req, res) {
  res.render('add');
});

app.post('/add', function (req, res) {
  models.User.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    age: req.body.age
  }).success(function(data) {
    res.redirect('/');
  });
});
