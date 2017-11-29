import React from 'react';
import axios from 'axios';
import Articles from './Articles';
import Tweets from './Tweets';

class Home extends React.Component {

    componentDidMount() {
        console.log('test');
    }

    test() {
        axios.get('/checkuser').then(data => {
            console.log(data);
        })
    }

    test1() {
        axios.get('/logout').then(data => {
            console.log(data);
        })
    }

    render() {
        return (
            <div id="home">
                <button onClick={this.test}>test</button>
                <button onClick={this.test1}>logout</button>
                <h5 id="news-header">Featured News</h5>
                <div id="news-container">
                    <Articles />
                    <Tweets />
                </div>
            </div>
        )
    }
}

export default Home;