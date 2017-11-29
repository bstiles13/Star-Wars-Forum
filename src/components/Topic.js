import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../actions/getUserAction.js';
import { getThreads } from '../actions/getThreadsAction.js';
import Breadcrumb from './Breadcrumb';
import { toggleTopic } from '../actions/toggleTopicAction.js';

class Topic extends React.Component {

    componentDidMount() {
        this.props.getUser();        
        this.props.getThreads(this.props.match.params.id);
        this.props.toggleTopic(this.props.match.params.id);
    }

    renderThreads() {
        let threads = this.props.threads;
        if (threads != null) {
            return threads.map((thread, index) => {
                return (
                    <tr key={index}>
                        <td><Link to={'/thread/' + this.props.match.params.id + '/' + thread._id}>{thread.title}</Link></td>
                        <td>{thread.poster}</td>
                        <td>{thread.time_posted.substring(0, 10)}</td>
                        <td>{thread.history.length}</td>
                        <td>Placeholder</td>
                    </tr>
                )
            })
        } else {
            return <tr><td>No threads</td></tr>
        }
    }

    render() {
        return (
            <div id="topic">
                {/* {"Topic: " + this.props.match.params.id} */}
                <Breadcrumb topic={this.props.toggledTopic}/>
                {
                    this.props.user
                    ? <button type="button" id="new-thread-button" className="btn btn-danger btn-sm"><Link to={'/newthread/' + this.props.match.params.id} id="new-thread-link">New Thread</Link></button>
                    : <button type="button" id="new-thread-button" className="btn btn-danger btn-sm" disabled>New Thread</button>
                }
                <br />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Posted By</th>
                            <th>Date</th>
                            <th>Replies</th>
                            <th><i className="fa fa-pencil-square-o" aria-hidden="true"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderThreads()}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        threads: state.threads,
        toggledTopic: state.toggledTopic,
        user: state.user
    }
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({
        getThreads: getThreads,
        toggleTopic: toggleTopic,
        getUser: getUser
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Topic);