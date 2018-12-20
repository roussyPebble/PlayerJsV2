import React, { Component } from 'react';
import { connect } from 'react-redux';
import './bigPlayBtn.scss';
import { playMedia } from '../../actions/ui';
import { PAUSE_CONTENT, PLAY_CONTENT } from '../../constants/labels';
import Icon from '../icon';

const mapStateToProps = (state) => {
    return {
        mediaIsPlaying: state.playerState.playing,
        mediaPlayedOnce: state.playerState.playedOnce,
        mediaInfo: state.media,
        isLiveFeed: state.metaMedia.metas.SrcAvDiffusion === 'direct'
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playMedia: () => {
            dispatch(playMedia());
        }
    };
};

/**
 * @description The small play - pause button
 * @prop {bool} mediaPlayedOnce - Check is media played at least one. If not Initialize the media.
 * @prop {bool} mediaIsPlaying  - Check the playing state of a media to assign the correct btn style and actions
 * @prop {bool} isLiveFeed - Flag for live feed
 * @prop {store.media.mediaInfo} mediaInfo - Media information such as mediaId appCode.
 */
class BigPlayBtn extends Component {

    /**
     * Call play and pause according to state
     */
    handleOnClick() {
        this.props.playMedia();
    }

    render() {
        return (
            <button
                className={`big-play-btn ${(this.props.mediaIsPlaying ? 'hide' : 'show')}`}
                aria-label={this.props.mediaIsPlaying ? PAUSE_CONTENT : PLAY_CONTENT}
                onClick={this.handleOnClick.bind(this)}>
                <Icon name="player-play" />
            </button>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BigPlayBtn);
