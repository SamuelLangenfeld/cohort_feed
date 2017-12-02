const express = require('express');
const app = express();
const server = require('http').createServer(app);
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fetch = require('isomorphic-fetch');
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
  res.render('index');

});

server.listen(3000, 'localhost', () => {
  console.log('server listening');
});