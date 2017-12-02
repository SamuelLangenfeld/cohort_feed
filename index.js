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

app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: true
  })
);

app.get("/", (req, res) => {
  fetch('https://medium.com/@sunvision')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response;
    })
    .then(function(stories) {
      console.log(stories.body);
    });


});

server.listen(3000, 'localhost', () => {
  console.log('server listening');
});