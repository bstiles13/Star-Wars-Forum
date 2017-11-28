import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleNewThread } from '../actions/handleNewThreadAction.js';
import { toggleTopic } from '../actions/toggleTopicAction.js';

class NewThread extends React.Component {

    renderOptions() {
        let topics = this.props.topics;
        return topics.map((topic, index) => {
            return <option key={index} value={topic._id} selected={this.props.match.params.id == topic.order ? true : false}>{topic.topic}</option>
        })
    }

    componentDidMount() {
        this.props.toggleTopic(this.props.match.params.id);
    }

    submitThread() {
        axios.post('/newthread', this.props.newThread).then(data => {
            console.log('new thread success', data);
            this.props.history.push('/thread/' + this.props.match.params.id + '/' + data.data._id);          
        })
    }

    render() {
        return (
            <div id="new-thread">
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
        toggledTopic: state.toggledTopic
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        handleNewThread: handleNewThread,
        toggleTopic: toggleTopic
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(NewThread);