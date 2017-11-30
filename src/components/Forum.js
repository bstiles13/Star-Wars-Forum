import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from './secondary/Breadcrumb';
import axios from 'axios';
import icon from '../assets/images/thread-icon.png'
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTopics } from '../actions/getTopicsAction.js';

class Forum extends React.Component {

    componentDidMount() {
        this.props.getTopics();
    }

    renderTopics() {
        let topics = this.props.topics;
        if (topics != null) {
            return topics.map((topic, index) => {
                return (
                    <li className="list-group-item forum-row" key={index}>
                        <div className="list-child flex-left">
                            <img src={icon} className="thread-icon" />
                        </div>
                        <div className="list-child flex-center">
                            <Link to={'/topic/' + topic.order}>{topic.topic.toUpperCase()}</Link>
                        </div>
                        <div className="list-child flex-right">
                            {
                                topic.replyHistory.length > 0
                                    ? (
                                        <div>
                                            <div><Link to={'/thread/' + topic.order + '/' + topic.recent.thread_id}>{topic.recent.title.substring(0, 20) + "..."}</Link></div>
                                            <div className="forum-signature">by {topic.recent.poster} on {topic.recent.time.substring(0, 10)} </div>
                                        </div>
                                    )
                                    : <div>No posts</div>
                            }
                        </div>
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
                <Breadcrumb />
                <ul className="list-group">
                    <li className="list-group-item forum-row" id="first-row">
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
    return { topics: state.topics }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getTopics: getTopics
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Forum);