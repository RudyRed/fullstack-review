import React from 'react';

const RepoListItem = (props) => {
  if (!props.repos) {
    return (<div> Waiting for repos to Load </div>)
  }

  return (<div>
    <ul id="menu">
      <li>Ranking: {props.ranking.num}  </li>
      <li><a href={props.repos.repoUrl} >Repo: {props.repos.name} </a></li>
      <li><a href={props.repos.ownerMeta.ownerUrl} >Repo Owner: {props.repos.ownerMeta.name}  </a></li>
      <li><a href={props.repos.ownerMeta.ownerUrl} ><img src={props.repos.ownerMeta.avatarUrl} alt="alternative text for your image" height="42" width="42"/></a></li>
      <li>  Stargazers: {props.repos.stargazers}</li>
    </ul>
  </div>)

}
export default RepoListItem;


{/* <ul>
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
</ul>

href={props.repos.repoUrl} */}
