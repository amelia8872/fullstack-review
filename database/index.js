const mongoose = require('mongoose');
// establishes a connection to the MongoDB database running on the local machine with the database name "fetcher"
// Update the options object with the new options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Use the updated options object in mongoose.connect
mongoose.connect('mongodb://localhost/fetcher', options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });



let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: {type: Number, unique: true},
  name: String,
  forks_count: Number,
  git_url: String
});


// Create a mongoose model based on repoSchema
let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObj) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  // console.log('database repoObj', repoObj);
  Repo.insertMany(repoObj, (err) => {
    console.log(err);
  })

  // The upsert option stands for "update or insert," and it allows you to update an existing document if it already exists or insert a new document if it does not exist.

  // repoObj.forEach((repo) => {
  //   Repo.findOneAndUpdate({id:repo.id}, repo, { upsert: true })

  // })
}



let get = (callback) => {
  Repo.find((err, repos) => {
    if (err) {
      callback(err);
    } else {
      // console.log(repos);
      callback(null, repos);
    }
  }).sort({forks_count: -1}).limit(25)
}

module.exports.save = save;
module.exports.get = get;