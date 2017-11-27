import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleNewThread } from '../actions/handleNewThread.js';

class NewThread extends React.Component {

    renderOptions() {
        let topics = this.props.topics;
        return topics.map((topic, index) => {
            return <option key={index} value={topic._id} selected={this.props.match.params.id == topic.order ? true : false}>{topic.topic}</option>
        })
    }

    componentDidMount() {
        this.props.handleNewThread(null, this.props.match.params.id);
    }

    submitThread() {
        axios.post('/newthread', this.props.newThread).then(data => {
            console.log(data);
        })
    }

    render() {
        return (
            <div id="new-thread">
                <form>
                    <div className="form-group">
                        <label htmlFor="form-topic">Topic</label>
                        <select className="form-control" id="form-topic" name="topic_id" onChange={this.props.handleNewThread}>
                            {this.renderOptions()}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="form-title">Title</label>
                        <input type="text" className="form-control" id="form-title" placeholder="Title" name="title" onChange={this.props.handleNewThread} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="form-post">Message</label>
                        <textarea type="text" className="form-control" id="form-post" placeholder="Share what's on your mind" name="message" onChange={this.props.handleNewThread}></textarea>
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
        newThread: state.newThread
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        handleNewThread: handleNewThread
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(NewThread);