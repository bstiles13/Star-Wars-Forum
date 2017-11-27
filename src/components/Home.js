import React from 'react';
import Articles from './Articles';
import Tweets from './Tweets';

class Home extends React.Component {

    componentDidMount() {
        console.log('test');
    }

    render() {
        return (
            <div id="home">
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