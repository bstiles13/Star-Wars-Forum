import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getReplies } from '../actions/getRepliesAction.js';
import { handleNewReply, handleNewQuote } from '../actions/handleNewReplyAction.js';
import { toggleTopic } from '../actions/toggleTopicAction';
import { setThreadUser } from '../actions/handleNewThreadAction.js';
import { setReplyUser } from '../actions/handleNewReplyAction.js';
import { flagReplyRemoval, flagReplyEdit, resetEditFlags } from '../actions/editAction.js';
import { handleEdit } from '../actions/handleEditAction.js';
import ModalQuote from './ModalQuote';
import ModalDeleteReply from './ModalDeleteReply';
import EditReply from './EditReply';
import NewReply from './NewReply';

class Replies extends React.Component {

    componentDidMount() {
        this.props.setReplyUser(this.props.user);
        this.props.getReplies(this.props.threadId);
        this.props.toggleTopic(this.props.topicId);
    }

    createMarkup(html) {
        return { __html: html }
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
                                {
                                    !this.props.pendingEdits.replyToEdit
                                        ? <span className="reply-message" dangerouslySetInnerHTML={this.createMarkup(reply.message)}></span>
                                        : <EditReply original={reply.message} getReplies={() => this.props.getReplies(this.props.threadId)} />
                                }
                            </div>
                            {
                                this.props.user
                                    ? (
                                        <div className="reply-options">
                                            <i className="fa fa-reply option-icon" aria-hidden="true" data-toggle="modal" data-target="#modal-quote" onClick={() => this.props.handleNewQuote(reply.poster, reply.message)}></i>
                                            <ModalQuote
                                                quote={reply}
                                                getReplies={this.props.getReplies}
                                                toggledTopic={this.props.toggledTopic}
                                                threadId={this.props.threadid}
                                            />
                                            {
                                                this.props.user == reply.poster && this.props.user != 'Anonymous'
                                                    ? (
                                                        <div>
                                                            <i className="fa fa-trash option-icon" aria-hidden="true" data-toggle="modal" data-target="#modal-delete-reply" onClick={() => this.props.flagReplyRemoval(reply._id)}></i>
                                                            <ModalDeleteReply
                                                                getReplies={() => this.props.getReplies(this.props.threadId)}
                                                                replyToDelete={this.props.pendingEdits.replyToDelete}
                                                                resetEditFlags={this.props.resetEditFlags}
                                                                reply={reply}
                                                            />
                                                        </div>
                                                    )
                                                    : <i className="fa fa-trash disabled-icon" aria-hidden="true"></i>

                                            }
                                            {
                                                this.props.user == reply.poster && this.props.user != 'Anonymous'
                                                    ? <i className="fa fa-info option-icon" aria-hidden="true" onClick={(event) => this.props.flagReplyEdit(reply._id) && this.props.handleEdit(event, reply.message)}></i>
                                                    : <i className="fa fa-info disabled-icon" aria-hidden="true"></i>
                                            }
                                        </div>
                                    )
                                    : <div className="reply-options">
                                        <i className="fa fa-reply disabled-icon" aria-hidden="true"></i>
                                        <i className="fa fa-trash disabled-icon" aria-hidden="true"></i>
                                        <i className="fa fa-info disabled-icon" aria-hidden="true"></i>
                                    </div>
                            }
                        </div>
                    </div>
                )
            })
        } else {
            return <div>No replies</div>
        }
    }

    render() {
        return (
            <div id="replies">
                {this.renderReplies()}
                <NewReply
                    handleNewReply={(event) => this.props.handleNewReply(event, this.props.toggledTopic._id, this.props.threadId)}
                    getReplies={() => this.props.getReplies(this.props.threadId)}
                />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        replies: state.replies,
        newReply: state.newReply,
        toggledTopic: state.toggledTopic,
        user: state.user,
        pendingEdits: state.pendingEdits
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getReplies: getReplies,
        handleNewReply: handleNewReply,
        handleNewQuote: handleNewQuote,
        toggleTopic: toggleTopic,
        setReplyUser: setReplyUser,
        flagReplyRemoval: flagReplyRemoval,
        flagReplyEdit: flagReplyEdit,
        resetEditFlags: resetEditFlags,
        handleEdit: handleEdit
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Replies);