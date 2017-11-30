import React from 'react';
import axios from 'axios';
import Statistics from './Statistics';
import Articles from './Articles';
import Tweets from './Tweets';

class Home extends React.Component {

    render() {
        return (
            <div id="home">
                <div id="home-content">
                    <div id="statistics-container">
                        <Statistics />
                    </div>
                    <div id="news-container">
                        <Articles />
                        <Tweets />
                    </div>
                    {/* <h5 id="news-header">Featured News</h5> */}

                </div>

            </div>
        )
    }
}

export default Home;