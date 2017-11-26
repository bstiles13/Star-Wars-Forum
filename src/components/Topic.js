import React from 'react';
import { Link } from 'react-router-dom';

class Topic extends React.Component {

    componentDidMount() {
        console.log(this.props.match);
    }

    render() {
        return (
            <div id="topic">
                {"Topic: " + this.props.match.params.id}
                <Link to={'/thread/' + this.props.match.params.id + '/1' }>Test</Link>
                <br />
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Posted By</th>
                    <th>Date</th>
                    <th>Replies</th>
                    <th><i className="fa fa-pencil-square-o" aria-hidden="true"></i></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
                </table>
            </div>
        )
    }
}

export default Topic;