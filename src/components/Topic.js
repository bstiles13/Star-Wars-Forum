import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from './secondary/Breadcrumb';
import ModalDeleteThread from './secondary/ModalDeleteThread';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUser } from '../actions/getUserAction.js';
import { getThreads } from '../actions/getThreadsAction.js';
import { toggleTopic } from '../actions/toggleTopicAction.js';
import { flagThreadRemoval, resetEditFlags } from '../actions/editAction.js';

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
                    <tr key={index} className="topic-row">
                        <td><Link to={'/thread/' + this.props.match.params.id + '/' + thread._id}>{thread.title}</Link></td>
                        <td>{thread.poster}</td>
                        <td>{thread.time_posted.substring(0, 10)}</td>
                        <td>{thread.history.length}</td>
                        <td>
                            {
                                this.props.user == thread.poster && this.props.user != 'Anonymous'
                                    ? (
                                        <div>
                                            <i className="fa fa-trash" aria-hidden="true" data-toggle="modal" data-target="#modal-delete-thread" onClick={() => this.props.flagThreadRemoval(thread._id)}></i>
                                            <ModalDeleteThread
                                                getThreads={() => this.props.getThreads(this.props.match.params.id)}
                                                threadToDelete={this.props.pendingEdits.threadToDelete}
                                                resetEditFlags={this.props.resetEditFlags}
                                            />
                                        </div>
                                    )
                                    : <i className="fa fa-trash disabled-icon" aria-hidden="true"></i>
                            }

                        </td>
                    </tr>
                )
            })
        } else {
            return <tr className="topic-row"><td>No threads</td></tr>
        }
    }

    render() {
        return (
            <div id="topic">
                <div id="topic-header">
                    <Breadcrumb topic={this.props.toggledTopic} />
                    {
                        this.props.user
                            ? <button type="button" id="new-thread-button" className="btn btn-danger btn-sm"><Link to={'/newthread/' + this.props.match.params.id} id="new-thread-link">New Thread</Link></button>
                            : <button type="button" id="new-thread-button" className="btn btn-danger btn-sm" disabled>New Thread</button>
                    }
                </div>
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

function mapStateToProps(state) {
    return {
        threads: state.threads,
        toggledTopic: state.toggledTopic,
        user: state.user,
        pendingEdits: state.pendingEdits
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getThreads: getThreads,
        toggleTopic: toggleTopic,
        getUser: getUser,
        flagThreadRemoval: flagThreadRemoval,
        resetEditFlags: resetEditFlags
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Topic);