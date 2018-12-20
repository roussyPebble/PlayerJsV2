import React, { Component } from 'react';
import { connect } from 'react-redux';
import './playBtn.scss';
import { pauseMedia, playMedia, a11yFocus } from '../../../actions/ui';
import { initMedia } from '../../../actions/media';
import { PAUSE_CONTENT, PLAY_CONTENT } from '../../../constants/labels';
import Icon from '../../icon';

const mapStateToProps = (state) => {
    return {
        uuid: state.playerState.uuid,
        mediaIsPlaying: state.playerState.playing,
        mediaPlayedOnce: state.playerState.playedOnce,
        mediaInfo: state.media,
        isLiveFeed: state.metaMedia.metas.SrcAvDiffusion === 'direct',
        controllerElementAsFocus: state.playerState.ctrlKeyboardFocused
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initMedia: (mediaInfo) => {
            dispatch(initMedia(mediaInfo));
        },
        pauseMedia: () => {
            dispatch(pauseMedia());
        },
        playMedia: () => {
            dispatch(playMedia());
        },
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        }
    };
};

/**
 * @description The small play - pause bouton
 * @prop {bool} mediaPlayedOnce - Check is media played at least one. If not Initialize the media.
 * @prop {bool} mediaIsPlaying  - Check the playing state of a media to assign the correct btn style and actions
 * @prop {bool} isLiveFeed - Flag for live feed
 * @prop {object} mediaInfo - Media inforation such as mediaId appCode.
 */
class PlayBtn extends Component {
    /**
     * Trigger play - pause and check if media initialisation in needed
     */
    handleOnClick() {
        this.props.mediaPlayedOnce ? this.handlePlayPause() : this.props.initMedia(this.props.mediaInfo);
    }

    /**
     * Call play and pause according to state
     */
    handlePlayPause() {
        if (this.props.mediaIsPlaying) {
            this.props.pauseMedia();
        } else {
            this.props.playMedia();
        }
    }

    /**
     * Handle a11y style focus
     * @description - Dispatch event to keep controller open and add style to button
     */
    handleA11yFocus(event) {
        this.props.a11yFocus(event.type === 'focus');
        this.asFocus = event.type === 'focus';
    }

    render() {
        return (
            <button
                className={`btn ${(this.props.mediaIsPlaying) ? 'pause-btn' : 'play-btn'} ${(this.asFocus) ? 'a11y-focus' : ''}`}
                aria-label={this.props.mediaIsPlaying ? PAUSE_CONTENT : PLAY_CONTENT}
                onFocus={this.handleA11yFocus.bind(this)}
                onBlur={this.handleA11yFocus.bind(this)}
                onClick={this.handleOnClick.bind(this)}
                onMouseUp={this.handleA11yFocus.bind(this)}>
                {this.props.mediaIsPlaying ? <Icon name="player-pause"/> : <Icon name="player-play"/>}
            </button>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayBtn);