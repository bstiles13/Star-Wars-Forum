import React from 'react';
import { Timeline } from 'react-twitter-widgets'

class Tweets extends React.Component {
    render() {
        return (
            <div id="tweets">
                <Timeline
                    dataSource={{
                        sourceType: 'profile',
                        screenName: 'starwars'
                    }}
                    options={{
                        username: 'starwars',
                        height: '600'
                    }}
                />
            </div>
        )
    }
}

export default Tweets;