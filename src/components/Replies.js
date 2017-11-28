import React from 'react';
import axios from 'axios';
import { Link } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReplies } from '../actions/getRepliesAction.js';
import { handleNewReply } from '../actions/handleNewReplyAction.js';
import { toggleTopic } from '../actions/toggleTopicAction';

class Replies extends React.Component {

    componentDidMount() {
        console.log(this.props.match);
        this.props.getReplies(this.props.threadId);
        this.props.toggleTopic(this.props.topicId);
    }

    renderReplies() {
        let replies = this.props.replies;
        if (replies != null) {
            return replies.map((reply, index) => {
                return (
                    <div className="reply" key={index}>
                        <div className="reply-header">Reply</div>
                        <div className="reply-container">
                            <div className='reply-signature'>
                                <img className='avatar' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png' />
                                <br /> {reply.poster}
                                <br /> {reply.time_posted.substring(0, 10)}
                            </div>
                            <div className='reply-body'>
                                <span className="reply-message">{reply.message}</span>
                            </div>
                            <div className="reply-options">
                                <i className="fa fa-reply option-icon" aria-hidden="true"></i>
                                <i className="fa fa-trash option-icon" aria-hidden="true"></i>
                            </div>
                        </div>
                        <br />
                    </div>
                )
            })
        } else {
            return <div>No replies</div>
        }
    }

    submitReply() {
        axios.post('/newreply', this.props.newReply).then(data => {
            console.log(data);
            this.props.getReplies(this.props.threadId);            
        })
    }

    render() {
        return (
            <div id="replies">
                {this.renderReplies()}
                <div id='new-reply-container'>
                    <h5 className="warning">Sign in to leave a reply</h5>
                    <div className="form-group">
                        <label className="label" htmlFor="threadPost">Quick Reply:</label>
                        <textarea type="text" className="form-control" id="threadPost"
                            placeholder="Share what's on your mind" name="message" onChange={(event) => this.props.handleNewReply(event, this.props.toggledTopic._id, this.props.threadId )}></textarea>
                    </div>
                    <button type="submit" className="btn btn-outline-danger" onClick={this.submitReply.bind(this)}>Reply</button>
                    <span id='signature'> poster </span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        replies: state.replies,
        newReply: state.newReply,
        toggledTopic: state.toggledTopic
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getReplies: getReplies,
        handleNewReply: handleNewReply,
        toggleTopic: toggleTopic
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Replies);