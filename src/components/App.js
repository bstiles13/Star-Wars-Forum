import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Navbar from './Navbar';
import Home from './Home';
import Forum from './Forum';
import Topic from './Topic';
import Thread from './Thread';
import NewThread from './NewThread';
import Login from './Login';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/forum" component={Forum} />
          <Route path="/topic/:id" component={Topic} />
          <Route path="/thread/:topicid/:threadid" component={Thread} />
          <Route path="/newthread/:id" component={NewThread} />
          <Route path="/login" component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
