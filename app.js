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
  models.User.findAll().done(function(error, users) {
    res.render('all', {
      all_users: users
    });
  });
});

app.get('/edit/:id', function (req, res) {
  models.User.find(req.params.id).done(function(error, user) {
    res.render('edit', {
      user_info: user
    });
  });
});

app.put('/edit/:id', function (req, res) {
  models.User.find(req.params.id).done(function(error, user) {
    user.updateAttributes({
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      age: req.body.age
    }).done(function(error, data) {
      res.redirect('/');
    });
  });
});

app.get('/add/', function (req, res) {
  res.render('add');
});

app.post('/add/', function (req, res) {
  models.User.create({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    age: req.body.age
  }).done(function(error, data) {
    res.redirect('/');
  });
});

app.delete('/delete/:id', function (req, res) {
  models.User.find(req.params.id).done(function(error, user) {
    user.destroy().done(function(error, data) {
      res.redirect('/');
    });
  });
});
