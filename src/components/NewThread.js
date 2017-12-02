import React from 'react';
import axios from 'axios';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTopics } from '../actions/getTopicsAction.js';
import { handleNewThread, resetNewThread } from '../actions/handleNewThreadAction.js';
import { toggleTopic } from '../actions/toggleTopicAction.js';
import { setThreadUser } from '../actions/handleNewThreadAction.js';
import { handleWarning, clearWarnings } from '../actions/handleWarningsAction.js';
import { setPath } from '../actions/pathTraceAction.js';

class NewThread extends React.Component {

    renderOptions() {
        let topics = this.props.topics;
        if (topics) {
            return topics.map((topic, index) => {
                return <option key={index} value={topic._id} selected={this.props.match.params.id == topic.order ? true : false}>{topic.topic}</option>
            })
        }
    }

    renderWarning(type) {
        if (this.props.warnings[type]) {
            return (<div className='warning'>{this.props.warnings.text[type]}</div>)
        }
    }

    componentDidMount() {
        this.props.setPath(window.location.href);                
        this.props.getTopics();        
        this.props.setThreadUser(this.props.user);
        this.props.toggleTopic(this.props.match.params.id);
    }

    submitThread() {
        this.props.clearWarnings();
        if (this.props.newThread.title == '' || this.props.newThread.title == null) return this.props.handleWarning('invalidTitle');
        if (this.props.newThread.message == '' || this.props.newThread.message == null) return this.props.handleWarning('invalidMessage');
        axios.post('/newthread', this.props.newThread).then(data => {
            this.props.resetNewThread();
            this.props.history.push('/thread/' + this.props.match.params.id + '/' + data.data._id);
        })
    }

    render() {
        return (
            <div id="new-thread">
                {this.renderWarning('invalidTitle')}
                {this.renderWarning('invalidMessage')}
                <form>
                    <div className="form-group">
                        <label htmlFor="form-topic">Topic</label>
                        <select className="form-control" id="form-topic" name="topic_id" onChange={(event) => this.props.handleNewThread(event, this.props.toggledTopic._id)}>
                            {this.renderOptions()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="form-title">Title</label>
                        <input type="text" className="form-control" id="form-title" placeholder="Title" name="title" onChange={(event) => this.props.handleNewThread(event, this.props.toggledTopic._id)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="form-post">Message</label>
                        <textarea type="text" className="form-control" id="form-post" placeholder="Share what's on your mind" name="message" onChange={(event) => this.props.handleNewThread(event, this.props.toggledTopic._id)}></textarea>
                    </div>
                </form>
                <button type="submit" className="btn btn-outline-primary" onClick={this.submitThread.bind(this)}>Submit</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        topics: state.topics,
        newThread: state.newThread,
        toggledTopic: state.toggledTopic,
        user: state.user,
        warnings: state.warnings
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getTopics: getTopics,
        handleNewThread: handleNewThread,
        resetNewThread: resetNewThread,
        toggleTopic: toggleTopic,
        setThreadUser: setThreadUser,
        handleWarning: handleWarning,
        clearWarnings: clearWarnings,
        setPath: setPath
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(NewThread);