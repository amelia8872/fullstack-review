// import necessary dependencies
// React: the core library for building user interfaces
// useState hook from React: manage state in function components
import React, { useState,useEffect } from 'react';

// ReactDom: used to render React components to the DOM
import ReactDOM from 'react-dom';
// maybe using jQuery for AJAX requests and DOM manipulation
import $ from 'jquery';

// import two custom components
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

//App component is the main component
const App = () => {

  const [repos, setRepos] = useState([]);

  const search = (term) => {
    //
    console.log(`${term} was searched`);

    $.ajax({
      type: 'POST',
      url: 'http://localhost:1128/repos',
      data: {username: term},
      success: function() {
        console.log('successful post')
        // Fetch the updated repository list after successful POST
        fetchRepos();

      },
      error: function() {
        console.log('error');
      }
    })
  }

  const fetchRepos = () => {
    $.ajax({
      type: 'GET',
      url: "http://localhost:1128/repos",
      success: (data) => {
        // console.log(data);
        setRepos(data);
      },
      error: () => {
        console.log("GET error");
      }
    });
  };

  useEffect(() => {fetchRepos();}, []);


  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

// renders the App component into the DOM
ReactDOM.render(<App />, document.getElementById('app'));