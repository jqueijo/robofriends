import React, {Component} from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
      searchField: '',
    }
  }

  onSearchChange = (event) => {
    this.setState({searchField: event.target.value});
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({robots: users}));
  }

  render() {
    const {robots, searchField} = this.state;
    const filteredRobots = robots.filter(elem => {
      return elem.name.toLowerCase().includes(searchField.toLowerCase());
    });
    if (robots.length === 0) {
      return <h1>Loading...</h1>;
    }
    else {
      return (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots}/>
          </Scroll>
        </div>
      );
    }
  }
}

export default App;
