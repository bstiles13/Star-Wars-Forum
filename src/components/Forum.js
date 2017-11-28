import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import icon from '../assets/images/thread-icon.png'
import Breadcrumb from './Breadcrumb';
import LastPost from './LastPost';
import { getThreads } from '../actions/getThreadsAction.js';
import { getTopics } from '../actions/getTopicsAction.js';


class Forum extends React.Component {

    componentDidMount() {
        this.props.getTopics();
        this.props.getThreads();
    }

    renderLastThread(threadId) {
        console.log('threads', this.props.threads);
        console.log('thread id', threadId);
        let lastThread = this.props.threads.find(o => o._id == threadId).title;
        return lastThread;
    }

    renderTopics() {
        let topics = this.props.topics;
        if (topics != null) {
            return topics.map((topic, index) => {
                let lastPost = topic.history.length > 0 ? topic.history[topic.history.length - 1] : false;
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
                                topic.history.length > 0 && this.props.threads
                                    ? (
                                        <LastPost 
                                            topic={topic}
                                            threads={this.props.threads}
                                            lastPost={lastPost}
                                        />
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
        topics: state.topics,
        threads: state.threads
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getTopics: getTopics,
        getThreads: getThreads        
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Forum);