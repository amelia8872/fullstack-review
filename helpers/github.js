// imports the axios library, popular JavaScript library used to make HTTP requests.
const axios = require('axios');

// The config.js file likely contains sensitive information such as a GitHub token (TOKEN) that is used for authentication with the GitHub API.
const config = require('../config.js');

let getReposByUsername = (username, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  let url = `https://api.github.com/users/${username}/repos`;
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios.get(url, options)
   .then((res) => {
    const repos = res.data;
    callback(null, repos);
    // console.log('getReposByUsername res.data', res.data);
   })
   .catch((err) => {
    console.log('Error fetching repos!');
    callback(err);
   });


}

module.exports.getReposByUsername = getReposByUsername;