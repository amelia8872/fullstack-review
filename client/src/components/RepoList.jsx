import React from 'react';
import RepoEntry from './RepoEntry.jsx';

const RepoList = ({repos}) => {


  return (
    <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.

      <div>
        {repos.map((repo) => <RepoEntry key={repo.id} repo={repo} />)}
      </div>

    </div>

  );

}

export default RepoList;