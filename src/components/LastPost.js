import React from 'react';
import { Link } from 'react-router-dom';

class LastPost extends React.Component {

    componentWillMount() {
        lastThread = this.props.threads.find(object => object._id === this.props.lastPost.thread_id); 
    }

    render() {
        return (
            <div>
                <div><Link to={'/thread/' + this.props.topic.order + '/' + lastThread._id}>{lastThread.title}</Link></div>
                <div>by {this.props.lastPost.poster} on {this.props.lastPost.time_posted.substring(0, 10)} </div>
            </div>
        )
    }
}

export default LastPost;

let lastThread = null;