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

repoSchema.methods.speak = function () {
  var greeting = this.name && this.ownerMeta.name
    ? `${this.ownerMeta.name}'s repo ${this.name} was successully added!`
    : "owner or repo name missing";
  console.log(greeting);
}

let Repo = mongoose.model('Repo', repoSchema);

let save = (apiArr) => {
  for (var item of apiArr) {
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
}

module.exports.save = save;
