import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home';
import Topic from './Topic';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" render={props => <Home />} />
          <Route path="/topic/:id" render={props => <Topic />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
