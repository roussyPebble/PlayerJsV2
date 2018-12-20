import React from 'react';
import ReactDOM from 'react-dom';

// None build component
import Player from '../../../playerJs';

// Build component
// import Player from '../../../build/dev/latest/react/dist.js';

var params = {
    width: "300px"
}

ReactDOM.render(
    <Player idMedia="39" appCode="medianetlive" params={params} />
    , document.getElementById('App')
);
