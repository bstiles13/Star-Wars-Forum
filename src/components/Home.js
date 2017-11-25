import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTopics } from '../actions/getTopicsAction.js';


class Home extends React.Component {

    componentDidMount() {
        this.props.getTopics();
    }

    renderTopics() {
        let topics = this.props.topics;
        if (topics == null) {
            return <div>Loading</div>
        } else {
            return topics.map(topic => {
                return (
                    <li className="list-group-item home-list-color">
                        <div id="flex-left" className="list-child">
                            {/* <img src="/assets/images/thread-icon.png" className="thread-icon" /> */}
                        </div>
                        <div id="flex-center">
                            {topic.topic}
                        </div>
                        <div id="flex-right" className="list-child"></div>
                    </li>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <div id="home-header">
                    <h6>Star Wars Fan Community</h6>
                    <h6 id="break">/</h6>
                    <h6>Forum</h6>
                </div>
                <ul className="list-group">
                    <li className="list-group-item home-list-color">
                        <div id="flex-left" className="list-child"><i className="fa fa-sort" aria-hidden="true"></i></div>
                        <div id="flex-center">Topic</div>
                        <div id="flex-right" className="list-child">Last Post</div>
                    </li>
                    {this.renderTopics()}
                </ul>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        topics: state.topics
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getTopics: getTopics }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Home);