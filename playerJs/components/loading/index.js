import React, { Component } from 'react';
import { connect } from 'react-redux';
import './loading.scss';

const mapStateToProps = (state) => {
    return {
        mediaIsPlaying: state.playerState.playing,
    };
};

class LoadingCurtain extends Component {

    render() {
        return (
            <div className="loading-container">
                <div className="loading-wheel"></div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(LoadingCurtain);
