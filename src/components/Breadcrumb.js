import React from 'react';
import { Link } from 'react-router-dom';

class Breadcrumb extends React.Component {

    componentDidMount() {
        console.log('breadcrumb params', this.props);
    }

    render() {
        return (
            <div id='breadcrumb'>
                <h6><Link to={'/'} className="breadcrumb-link">Star Wars Fan Community</Link></h6>
                <h6 className="break">/</h6>
                {
                    this.props.topic
                        ? <h6><Link to={'/forum'} className="breadcrumb-link">Forum</Link></h6>
                        : <h6 className="breadcrumb-static">Forum</h6>
                }
                {
                    this.props.topic
                        ? (<h6 className="break">/</h6>)
                        : false
                }
                {
                    this.props.topic && this.props.thread
                        ? (<h6><Link to={'/topic/' + this.props.topic.order} className="breadcrumb-link">{this.props.topic.topic}</Link></h6>)
                        : this.props.topic
                            ? <h6 className="breadcrumb-static">{this.props.topic.topic}</h6>
                            : false
                }
                {
                    this.props.thread
                        ? <h6 className="break">/</h6>
                        : false
                }
                {
                    this.props.thread
                        ? (<h6 className="breadcrumb-static">{this.props.thread}</h6>)
                        : false
                }
            </div>
        )
    }
}

export default Breadcrumb;