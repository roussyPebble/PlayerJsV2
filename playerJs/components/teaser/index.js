import React, { Component } from 'react';
import { connect } from 'react-redux';
import './teaser.scss';

const mapStateToProps = (state) => {
    return {
        teaserUrl: state.configurations.teaser,
        playing: state.playerState.playing,
        playedOnce: state.playerState.playedOnce
    };
};

/**
 * Video teaser img
 * @hideconstructor
 */
/**
 * @prop {string} teaserUrl - Url of the teaser images
 */
class Teaser extends Component {
    render() {
        return (
            <img className={`rcplayer-teaser ${(!this.props.playing && !this.props.playedOnce) ? 'show' : 'hide'}`} src={this.props.teaserUrl} />
        );
    }
}

export default connect(mapStateToProps)(Teaser);
