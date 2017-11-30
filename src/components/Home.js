import React from 'react';
import Statistics from './Statistics';
import Articles from './Articles';
import Tweets from './Tweets';
import axios from 'axios';

class Home extends React.Component {

    render() {
        return (
            <div id="home">
                <div id="home-content">
                    <div id="statistics-container">
                        <Statistics />
                    </div>
                    <div id="news-container">
                        <h6 id="news-header">Featured News</h6>
                        <div id="news-content">
                            <Articles />
                            <Tweets />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Home;