import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStats } from '../actions/getStatsAction.js';

class Statistics extends React.Component {

    componentDidMount() {
        this.props.getStats();
    }

    renderPost(post) {
        let test = post.split("<br/>");
        if (test.length > 1) {
            post = test[1];
        } else {
            post = test[0];
        }
        return post
    }
    render() {
        let stats = this.props.stats;
        return (
            <div id="statistics">
                <div id="recent-activity">
                    <h6 className="stats-header">Last Post</h6>
                    <div className="stats-body">
                        {
                            stats.lastTopic
                                ? (
                                    <div>
                                        <Link to={'/thread/' + stats.lastTopic.order + '/' + stats.lastThread._id} id="recent-thread">{stats.lastTopic.topic}</Link>
                                        <div id="recent-reply">"{this.renderPost(stats.lastReply.message)}"</div>
                                        <div id="recent-poster">by {stats.lastReply.poster} on {stats.lastReply.time_posted.substring(0, 10)}</div>
                                    </div>
                                )
                                : false
                        }
                    </div>
                </div>
                <div id="forum-statistics">
                    <h6 className="stats-header">Forum Statistics</h6>
                    <div className="stats-body">
                        <div>Threads: {this.props.stats.threadCount}</div>
                        <div>Posts: {this.props.stats.replyCount}</div>
                        <div>Users: {this.props.stats.userCount}</div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        stats: state.stats
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getStats: getStats
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Statistics);