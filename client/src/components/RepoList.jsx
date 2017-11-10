import React from 'react';
import Search from './Search.jsx';
import RepoListItem from './RepoListItem.jsx';



const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <Search onSearch={props.search}/> {
      props.repos.slice(0,25).map(function(item, i){
    return <RepoListItem repos={props.repos[i]} ranking={{num: i}}/>
  })
}
  </div>
)

export default RepoList;
