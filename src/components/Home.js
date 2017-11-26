import React from 'react';
import News from './News';

class Home extends React.Component {

    render() {
        return (
            <div id="home">
                <h2>All things Star Wars</h2>
                <div id="home-content">
                    <News />
                </div>
            </div>
        )
    }
}

export default Home;