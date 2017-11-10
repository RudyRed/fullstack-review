import React from 'react';

const RepoListItem = (props) => {
  if (!props.repos) {
    return (<div> Waiting for repos to Load </div>)
  }

  return (<div>
    <ul id="menu">
      <li>Ranking: {props.ranking.num}  </li>
      <li>Repo: {props.repos.name}</li>
      <li>Repo Owner: {props.repos.ownerMeta.name}  </li>
      <li><img src={props.repos.ownerMeta.avatarUrl} alt="alternative text for your image" height="42" width="42"/></li>
      <li>  Stargazers: {props.repos.stargazers}</li>
    </ul>
  </div>)

}
export default RepoListItem;
