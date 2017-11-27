import React from 'react';
import Articles from './Articles';
import Tweets from './Tweets';

class Home extends React.Component {

    render() {
        return (
            <div id="home">
                <h3 id="news-header">Featured News</h3>
                <div id="news-container">
                    <Articles />
                    <Tweets />
                </div>
            </div>
        )
    }
}

export default Home;