import React from 'react';
import { Link } from 'react-dom';
import Replies from './Replies';
import Breadcrumb from './Breadcrumb';
import ModalQuote from './ModalQuote';
import ModalDeleteReply from './ModalDeleteReply';
import EditThread from './EditThread';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneThread } from '../actions/getOneThreadAction.js';
import { getReplies } from '../actions/getRepliesAction.js';
import { toggleTopic } from '../actions/toggleTopicAction.js';
import { handleNewReply, handleNewQuote } from '../actions/handleNewReplyAction.js';
import { flagThreadEdit } from '../actions/editAction.js';
import { handleEdit } from '../actions/handleEditAction.js';
import { getUser } from '../actions/getUserAction.js';

class Thread extends React.Component {

    componentDidMount() {
        this.props.getUser();
        this.props.toggleTopic(this.props.match.params.topicid);
        this.props.getOneThread(this.props.match.params.threadid);
    }

    createMarkup(html) {
        return { __html: html }
    }

    render() {
        return (
            <div>
                {this.props.oneThread != null
                    ? (
                        <div id="thread">
                            <Breadcrumb topic={this.props.toggledTopic} thread={this.props.oneThread.title} />
                            <div className="thread">
                                <div className="thread-header">Thread</div>
                                <div className="thread-container">
                                    <div className='thread-signature'>
                                        <img className='avatar' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png' />
                                        <br /> {this.props.oneThread.poster}
                                        <br /> {this.props.oneThread.time_posted.substring(0, 10)}
                                    </div>
                                    <div className='thread-body'>
                                        <div id="thread-title">{this.props.oneThread.title}</div>
                                        <hr />
                                        {
                                            !this.props.pendingEdits.threadToEdit
                                                ? <div className="thread-message" dangerouslySetInnerHTML={this.createMarkup(this.props.oneThread.message)}></div>
                                                : <EditThread
                                                    originalMessage={this.props.oneThread.message}
                                                    originalTitle={this.props.oneThread.title}
                                                    getOneThread={() => this.props.getOneThread(this.props.match.params.threadid)}
                                                />
                                        }
                                    </div>
                                    {
                                        this.props.user
                                            ? (
                                                <div className="thread-options">
                                                    <i className="fa fa-reply option-icon" aria-hidden="true" data-toggle="modal" data-target="#modal-quote" onClick={() => this.props.handleNewQuote(this.props.oneThread.poster, this.props.oneThread.message)}></i>
                                                    <ModalQuote
                                                        quote={this.props.oneThread}
                                                        getReplies={this.props.getReplies}
                                                        toggledTopic={this.props.toggledTopic}
                                                        threadId={this.props.match.params.threadid}
                                                    />
                                                    {
                                                        this.props.user == this.props.oneThread.poster && this.props.user != 'Anonymous'
                                                        ? <i className="fa fa-info option-icon" aria-hidden="true" onClick={(event) => this.props.flagThreadEdit(this.props.oneThread._id) && this.props.handleEdit(event, this.props.oneThread.message, this.props.oneThread.title)}></i>
                                                        : <i className="fa fa-info disabled-icon" aria-hidden="true"></i>
                                                    }
                                                </div>
                                            )
                                            : (
                                                <div className="thread-options">
                                                    <i className="fa fa-reply disabled-icon" aria-hidden="true"></i>
                                                    <i className="fa fa-info disabled-icon" aria-hidden="true"></i>
                                                </div>
                                            )
                                    }
                                </div>
                            </div>
                            <Replies
                                topicId={this.props.match.params.topicid}
                                threadId={this.props.match.params.threadid}
                            />
                        </div>
                    )
                    : false
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        oneThread: state.oneThread,
        toggledTopic: state.toggledTopic,
        pendingEdits: state.pendingEdits,
        user: state.user
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getReplies: getReplies,
        getOneThread: getOneThread,
        toggleTopic: toggleTopic,
        handleNewQuote: handleNewQuote,
        flagThreadEdit: flagThreadEdit,
        handleEdit: handleEdit,
        getUser: getUser
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Thread);