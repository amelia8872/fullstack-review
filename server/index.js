const express = require('express');
const path = require('path');
const { getReposByUsername } = require('../helpers/github.js');
const {save, get} = require('../database/index.js');

let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

// setting up static file service for files in the client/dist directory. It tells the Express server to serve static files (such as HTML, CSS, JavaScript, images, etc.) located in the specified directory (client/dist) when they are requested by clients (e.g., web browsers).

// parse incoming request bodies that are encoded in the application/x-www-form-urlencoded format. When a form is submitted from a client-side HTML form element using the POST method, the form data is typically encoded in this format.

app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/../client/dist')));
app.use(express.json()); // to parse JSON data from the request body


app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  // req.body { username: '123423' }
  // console.log('req.body', req.body);
  var username = req.body.username;
  // console.log(username)
  // request to github
  if (!username) {
    console.log('GitHub username is required.');
    return res.status(400);
  }
  getReposByUsername(username, (err, repos) => {
    if (err) {
      console.log('Error fetching repos');
      res.sendStatus(500);
    }
    // console.log("after getReposByUsername-------------------------------", repos);

    save(repos)

    res.end();
  })
  // use response to create repo
  // save in database

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  get((err, data) => {
    if (err) {
      res.send(error);
    } else {
      res.send(data);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

