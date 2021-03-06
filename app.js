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
var fs = require('fs');
let developersObj = JSON.parse(fs.readFileSync('./data/cohortMates.json'));
const latest = require('./lib/fetchLatestPromise.js');

app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: true
  })
);

app.get('/', async (req, res)=>{
  let params = { developers: [] };

  let latestUpdates = [];
  let developerNameArray = Object.keys(developersObj);
  developerNameArray.forEach(developerName => {
    latestUpdates.push(latest(developersObj[developerName]));
  });
  let updatedDevelopers = await Promise.all(latestUpdates);
  let half = Math.ceil(updatedDevelopers.length / 2);
  let developers1 = updatedDevelopers.slice(0, half);
  let developers2 = updatedDevelopers.slice(half);
  res.render('index', { developers1, developers2 });
});


/*
app.get('/', (req, res) => {
  let developers = [];
  let developerNameArray = Object.keys(developersObj);
  developerNameArray.forEach(developerName => {
    developers.push(developersObj[developerName]);
  })
  let half = Math.ceil(developers.length / 2);
  let developers1 = developers.slice(0, half);
  let developers2 = developers.slice(half);
  res.render('index', { developers1, developers2 });
});

app.post("/update", (req, res) => {
  console.log('update in action');
  let params = { developers: [] };

  let latestUpdates = [];
  let developerNameArray = Object.keys(developersObj);
  developerNameArray.forEach(developerName => {
    latestUpdates.push(latest(developersObj[developerName]));
  });

  Promise.all(latestUpdates).then(developerUpdates => {
    developerUpdates.forEach(updatedDeveloper => {
      developersObj[updatedDeveloper.firstName] = updatedDeveloper;
    });
    let developerString = JSON.stringify(developersObj, null, 2);
    fs.writeFile('./data/cohortMates.json', developerString, (err) => {
      if (err) {
        throw err;
      }
    });
    developerNameArray.forEach(developerName => {
      params.developers.push(developersObj[developerName]);
    });
    res.redirect('/');
  })


});
*/

var port = process.env.PORT || 3000;
var host = 'localhost';

var args;
process.env.NODE_ENV === 'production' ?
  args = [port] :
  args = [port, host];

args.push(() => {
  console.log(`Server listening: http://${ host }:${ port }`);
});

app.listen.apply(app, args);


module.exports = app;