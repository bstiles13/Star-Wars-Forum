import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getThreads } from '../actions/getThreadsAction.js';
import Breadcrumb from './Breadcrumb';
import { toggleTopic } from '../actions/toggleTopicAction.js';

class Topic extends React.Component {

    componentDidMount() {
        console.log(this.props.match);
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
                        <td>Placeholder</td>
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
                {"Topic: " + this.props.match.params.id}
                <Breadcrumb topic={this.props.toggledTopic}/>
                <Link to={'/newthread/' + this.props.match.params.id}>New Thread</Link>
                <Link to={'/thread/' + this.props.match.params.id + '/1'}>Test</Link>
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
        toggledTopic: state.toggledTopic
    }
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({
        getThreads: getThreads,
        toggleTopic: toggleTopic
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Topic);