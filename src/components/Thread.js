import React from 'react';

class Thread extends React.Component {

    componentDidMount() {
        console.log(this.props.match);
    }

    render() {
        return (
            <div>
                {"Topic: " + this.props.match.params.topicid}
                <br />
                {"Thread: " + this.props.match.params.threadid}
            </div>
        )
    }
}

export default Thread;