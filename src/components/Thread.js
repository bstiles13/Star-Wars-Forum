import React from 'react';
import { Link } from 'react-dom';
import Replies from './secondary/Replies';
import Breadcrumb from './secondary/Breadcrumb';
import ModalQuote from './secondary/ModalQuote';
import ModalDeleteReply from './secondary/ModalDeleteReply';
import EditThread from './secondary/EditThread';
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
import { setPath } from '../actions/pathTraceAction.js';

class Thread extends React.Component {

    componentDidMount() {
        this.props.setPath(window.location.href);                
        this.props.getUser();
        this.props.toggleTopic(this.props.match.params.topicid);
        this.props.getOneThread(this.props.match.params.threadid);
    }

    createMarkup(html) {
        let cleanHtml = html.replace(/\n/g, "<br />");        
        return { __html: cleanHtml }
    }

    render() {
        let thread = this.props.oneThread;
        return (
            <div>
                {thread != null
                    ? (
                        <div id="thread">
                            <Breadcrumb topic={this.props.toggledTopic} thread={thread.title} />
                            <div className="thread">
                                <div className="thread-header">Thread</div>
                                <div className="thread-container">
                                    <div className='thread-signature'>
                                        <img className='avatar' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png' />
                                        <br /> {thread.poster}
                                        <br /> {thread.time_posted.substring(0, 10)}
                                    </div>
                                    <div className='thread-body'>
                                        <div id="thread-title">{thread.title}</div>
                                        <hr />
                                        {
                                            !this.props.pendingEdits.threadToEdit
                                                ? <div className="thread-message" dangerouslySetInnerHTML={this.createMarkup(thread.message)}></div>
                                                : <EditThread
                                                    originalMessage={thread.message}
                                                    originalTitle={thread.title}
                                                    getOneThread={() => this.props.getOneThread(this.props.match.params.threadid)}
                                                />
                                        }
                                    </div>
                                    {
                                        this.props.user
                                            ? (
                                                <div className="thread-options">
                                                    <i className="fa fa-reply option-icon" aria-hidden="true" data-toggle="modal" data-target="#modal-quote" onClick={() => this.props.handleNewQuote(thread.poster, thread.message)}></i>
                                                    <ModalQuote
                                                        quote={thread}
                                                        getReplies={this.props.getReplies}
                                                        toggledTopic={this.props.toggledTopic}
                                                        threadId={this.props.match.params.threadid}
                                                    />
                                                    {
                                                        this.props.user == thread.poster && this.props.user != 'Anonymous'
                                                        ? <i className="fa fa-pencil option-icon" aria-hidden="true" onClick={(event) => this.props.flagThreadEdit(thread._id) && this.props.handleEdit(event, thread.message, thread.title)}></i>
                                                        : <i className="fa fa-pencil disabled-icon" aria-hidden="true"></i>
                                                    }
                                                </div>
                                            )
                                            : (
                                                <div className="thread-options">
                                                    <i className="fa fa-reply disabled-icon" aria-hidden="true"></i>
                                                    <i className="fa fa-pencil disabled-icon" aria-hidden="true"></i>
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
        getUser: getUser,
        setPath: setPath
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Thread);