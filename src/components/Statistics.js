import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getStats } from '../actions/getStatsAction.js';

class Statistics extends React.Component {

    componentDidMount() {
        this.props.getStats();
    }

    render() {
        return (
            <div id="statistics">
                <div id="recent-activity"></div>
                <div id="forum-statistics">
                    <h5>Forum Statistics</h5>
                    <div>Threads: {this.props.stats.threadCount}</div>
                    <div>Posts: {this.props.stats.replyCount}</div>
                    <div>Users: {this.props.stats.userCount}</div>
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