import React from 'react';
import { Link } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOneThread } from '../actions/getOneThreadAction.js';
import { getReplies } from '../actions/getRepliesAction.js';
import { toggleTopic } from '../actions/toggleTopicAction.js';
import { handleNewReply, handleNewQuote } from '../actions/handleNewReplyAction.js';
import Replies from './Replies';
import Breadcrumb from './Breadcrumb';
import ModalQuote from './ModalQuote';

class Thread extends React.Component {

    componentDidMount() {
        console.log(this.props.match);
        this.props.toggleTopic(this.props.match.params.topicid);
        this.props.getOneThread(this.props.match.params.threadid);
    }

    createMarkup(html) {
        return {__html: html}
    }

    render() {
        return (
            <div>
                {"Topic: " + this.props.match.params.topicid}
                <br />
                {"Thread: " + this.props.match.params.threadid}
                {this.props.oneThread != null
                    ? (
                        <div id="thread">
                            <Breadcrumb topic={this.props.toggledTopic} thread={this.props.oneThread.title} />
                            <div className="reply">
                                <div className="reply-header">Thread</div>
                                <div className="reply-container">
                                    <div className='reply-signature'>
                                        <img className='avatar' src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-person-128.png' />
                                        <br /> {this.props.oneThread.poster}
                                        <br /> {this.props.oneThread.time_posted.substring(0, 10)}
                                    </div>
                                    <div className='reply-body'>
                                        <div id="reply-title">{this.props.oneThread.title}</div>
                                        <hr />
                                        <div className="reply-message" dangerouslySetInnerHTML={this.createMarkup(this.props.oneThread.message)}></div>
                                    </div>
                                    <div className="reply-options">
                                        <ModalQuote
                                            quote={this.props.oneThread}
                                            getReplies={this.props.getReplies}
                                            toggledTopic={this.props.toggledTopic}
                                            threadId={this.props.match.params.threadid}
                                        />
                                    </div>
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
        toggledTopic: state.toggledTopic
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getReplies: getReplies,
        getOneThread: getOneThread,
        toggleTopic: toggleTopic,
        handleNewQuote: handleNewQuote
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Thread);