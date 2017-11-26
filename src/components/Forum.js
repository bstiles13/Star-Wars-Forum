import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import icon from '../assets/images/thread-icon.png'

import { getTopics } from '../actions/getTopicsAction.js';


class Forum extends React.Component {

    componentDidMount() {
        this.props.getTopics();
    }

    renderTopics() {
        let topics = this.props.topics;
        if (topics != null) {
            return topics.map(topic => {
                return (
                    <li className="list-group-item topic-row">
                        <div className="list-child flex-left">
                            <img src={icon} className="thread-icon" />
                        </div>
                        <div className="list-child flex-center">
                            <Link to={'/topic/' + topic.order}>{topic.topic.toUpperCase()}</Link>
                        </div>
                        <div className="list-child flex-right"></div>
                    </li>
                )
            })
        } else {
            return <div>Loading</div>
        }
    }

    render() {
        return (
            <div id="forum">
                <div id="forum-header">
                    <h6>Star Wars Fan Community</h6>
                    <h6 id="break">/</h6>
                    <h6>Forum</h6>
                </div>
                <ul className="list-group">
                    <li className="list-group-item topic-row" id="first-row">
                        <div className="list-child flex-left"><i className="fa fa-sort" aria-hidden="true"></i></div>
                        <div className="list-child flex-center">Topic</div>
                        <div className="list-child flex-right">Last Post</div>
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

export default connect(mapStateToProps, matchDispatchToProps)(Forum);