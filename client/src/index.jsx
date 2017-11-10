import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search(term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: '/repos',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({username: term}),
      success: (resp) => {
        console.log(resp)
        this.componentDidMount(true);
      }
    });
  }

  render() {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos} search={this.search.bind(this)}/>
    </div>)
  }

  componentDidMount(postMountCall) {
    var loadReposFromDB = () => {
      $.ajax({
        type: 'GET',
        url: '/repos',
        success: (resp) => {
          // console.log(resp[0])
          this.setState({repos: resp})
        }
      });
    }
    loadReposFromDB();
    if (!postMountCall) {
      setInterval(loadReposFromDB, 15000)
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
