import React from 'react';
import { Link } from 'react-router-dom';

class Topic extends React.Component {

    componentDidMount() {
        console.log(this.props.match);
    }

    render() {
        return (
            <div>
                {"Topic: " + this.props.match.params.id}
                <Link to={'/thread/' + this.props.match.params.id + '/1' }>Test</Link>
            </div>
        )
    }
}

export default Topic;