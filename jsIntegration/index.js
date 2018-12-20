import ReactDOM from 'react-dom';
import React from 'react';

import Player from '../playerJs';

exports.initPlayerJs = (element, idMedia, appCode, params = {}) => {
    return ReactDOM.render(
        <Player idMedia={idMedia} appCode={appCode} params={params} />,
        document.getElementById(element)
    );
};