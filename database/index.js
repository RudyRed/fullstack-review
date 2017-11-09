const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number, // id
  name: String, //reponame
  isFork: Boolean, // fork
  repoUrl: String, // html_url
  stargazers: Number, // stargazers_count
  forks: Number, // forks
  ownerMeta: { // Within the owner obj in api data
    name: String,
    ownerUrl: String,
    avatarUrl: String
  }
});

repoSchema.methods.speak = function() {
  var greeting = this.name && this.ownerMeta.name
    ? `${this.ownerMeta.name}'s repo ${this.name} was successully added!`
    : "owner or repo name missing";
  console.log(greeting);
}

let Repo = mongoose.model('Repo', repoSchema);

let save = (apiArr) => {

  if (!apiArr.length) {
    return;
  }

  Repo.find({
    'ownerMeta.name': apiArr[0].owner.login
  }, 'id ownerMeta.name', function(err, repos) {
    if (err) {
      console.log(err);
      return;
    }

    var savedIds = []; // create an array of already saved repo ids for that user
    for (let repo of repos) {
      savedIds.push(repo.id);
    }

    for (var item of apiArr) {
      if (savedIds.some(id => id === item.id)) {
        continue; // skips the save step if repo id already exist in database
      }

      var newRepo = new Repo({
        id: item.id, // id
        name: item.name, //reponame
        isFork: item.fork, // fork
        repoUrl: item.html_url, // html_url
        stargazers: item.stargazers_count, // stargazers_count
        forks: item.forks, // forks
        ownerMeta: { // Within the owner obj in api data
          name: item.owner.login,
          ownerUrl: item.owner.html_url,
          avatarUrl: item.owner.avatar_url
        }
      })
      newRepo.save((err, newRepo) => {
        if (err) {
          console.log(err);
          return;
        }
        newRepo.speak();
      })
    }
  })
}

let reposQuery = (callback) => {
  Repo.find().sort({stargazers: -1}).exec(callback)
}
// > db.repos.find().sort({stargazers: -1}).limit(25)


module.exports.save = save;
module.exports.reposQuery = reposQuery;
