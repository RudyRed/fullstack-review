const express = require('express');
let app = express();
const Promise = require("bluebird");
const getGithubRepos = Promise.promisify(require('../helpers/github.js').getReposByUsername);
const db = require('../database/index.js');
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json())

app.post('/repos', function(req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  getGithubRepos(req.body.username).then((data) => {
    db.save(data);
  }).catch(function(err) {
    console.log(err.message);
    console.log(err.stack);
  });

});

app.get('/repos', function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.top25(function(err,x) {
    console.log(x)
  })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
