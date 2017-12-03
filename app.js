require('dotenv').config();
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
require('es6-promise').polyfill();
const fetch = require('isomorphic-fetch');
const cookieParser = require('cookie-parser')
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
const session = require("express-session");
const blogParser = require("./lib/blogParser.js");
const developersArray = require("./lib/cohortMates");

app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  let params = {};

  //Need to do a forEach loop, each one doing a fetch promise
  //Have to find a way to do Promise.all
  //Then use that info
  developersArray.forEach(developer => {
    developer.link
    developerObj = { developer: developer };
  })
  fetch('http://viking-blog.surge.sh/')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response;
    })
    .then(function(stories) {
      stories.text().then(data => {
        //We want to pass each url to blogParser

        let blogInfo = blogParser("http://viking-blog.surge.sh/", data);
        res.render('index', blogInfo)

      });
    });


});

server.listen(3000, 'localhost', () => {
  console.log('server listening');
});

module.exports = app;