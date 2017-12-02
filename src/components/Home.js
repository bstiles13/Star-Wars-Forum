import React from 'react';
import Statistics from './secondary/Statistics';
import Articles from './secondary/Articles';
import Tweets from './secondary/Tweets';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setPath } from '../actions/pathTraceAction.js';

class Home extends React.Component {

    componentDidMount() {
        this.props.setPath(window.location.href);
    }

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

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ setPath: setPath }, dispatch);
}

export default connect(null, matchDispatchToProps)(Home);