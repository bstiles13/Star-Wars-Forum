import React from 'react';

class Tweets extends React.Component {
    render() {
        return (
            <div id="tweets">
                <a class="twitter-timeline"
                    href="https://twitter.com/starwars"
                    data-height="700">
                    Tweets by @starwars
                </a>
            </div>
        )
    }
}

export default Tweets;