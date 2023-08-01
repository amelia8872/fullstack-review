import React from 'react';

const RepoEntry = ({repo}) => {
  return (
    <div>
      <a href={repo.git_url}>
        {repo.name}
      </a>

        fork count: {repo.forks_count}
    </div>
  )
}

export default RepoEntry;