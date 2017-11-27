import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home';
import Forum from './Forum';
import Topic from './Topic';
import Thread from './Thread';
import NewThread from './NewThread';


class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" render={props => <Home />} />
          <Route path="/forum" render={props => <Forum />} />
          <Route path="/topic/:id" render={props => <Topic {...props} />} />
          <Route path="/thread/:topicid/:threadid" render={props => <Thread {...props} />} />
          <Route path="/newthread/:id" render={props => <NewThread {...props} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
