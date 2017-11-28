import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import icon from '../assets/images/thread-icon.png'
import Breadcrumb from './Breadcrumb';
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
                    <li className="list-group-item topic-row" key={index}>
                        <div className="list-child flex-left">
                            <img src={icon} className="thread-icon" />
                        </div>
                        <div className="list-child flex-center">
                            <Link to={'/topic/' + topic.order} onClick={() => console.log('clicked route')}>{topic.topic.toUpperCase()}</Link>
                        </div>
                        <div className="list-child flex-right">
                            {
                                topic.replyHistory.length > 0
                                    ? (
                                        <div>
                                            <div><Link to={'/thread/' + topic.order + '/' + topic.recent.thread_id}>{topic.recent.title}</Link></div>
                                            <div>by {topic.recent.poster} on {topic.recent.time.substring(0, 10)} </div>
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
    return bindActionCreators({
        getTopics: getTopics
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Forum);