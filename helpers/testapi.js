const { getReposByUsername } = require('./github.js');

const username = 'octocat';

getReposByUsername(username, (err, repos) => {
  if (err) {
    console.log('Error fetching repos:', err);
  } else {
    console.log('Fetched repos:', repos);
  }
});