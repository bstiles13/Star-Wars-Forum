import React from 'react';
import logo from '../logo.svg';
import Navbar from './Navbar';
import Home from './Home';


class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
