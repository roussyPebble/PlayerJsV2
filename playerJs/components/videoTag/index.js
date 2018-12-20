import React, { Component } from 'react';
import { connect } from 'react-redux';
import './videoTag.scss';
import { mediaPlaying, mediaError, mediaTimeUpdate, seeking } from '../../actions/media';
import {enterFullscreen, exitFullscreen, subtitlesToggle} from '../../actions/ui';

const mapStateToProps = (state) => {
    return {
        isFullscreen: state.playerState.fullscreen,
        subtitlesActive: state.providers.subtitlesActive
    };
};

const mapDispatchToProps = dispatch => {
    return {
        mediaPlaying: () => {
            dispatch(mediaPlaying());
        },
        seeking: (status) => {
            dispatch(seeking(status));
        },
        mediaError: (errorData) => {
            dispatch(mediaError(errorData));
        },
        mediaTimeUpdate: (time) => {
            dispatch(mediaTimeUpdate(time));
        },
        toggleFullscreen: (isFullscreen) => {
            !isFullscreen ? dispatch(enterFullscreen()) : dispatch(exitFullscreen());
        },
        setSubtitle: (subtitlesActive) => {
            dispatch(subtitlesToggle(subtitlesActive));
        }
    };
};

/**
 * HTML video tag use to play media
 * @hideconstructor
 */
class VideoTag extends Component {

    constructor() {
        super();
        this.element = React.createRef();
    }

    componentDidMount() {
        this.bindVideoTagEvents();
    }

    bindVideoTagEvents() {
        this.element.current.onplaying = () => {
            this.props.mediaPlaying();
        };
        this.element.current.onseeking = () => {
            this.props.seeking(true);
        };
        this.element.current.onseeked = () => {
            this.props.seeking(false);
        };
        this.element.current.onerror = () => {
            this.props.mediaError(this.element.current.error);
        };
        this.element.current.textTracks.onaddtrack = () => {
            this.props.setSubtitle(this.props.subtitlesActive);
        };
        this.element.current.ontimeupdate = () => {
            this.props.mediaTimeUpdate(this.element.current.currentTime);
        };
    }
    /**
     * Handle the fullscreen on double click
     */
    fullscreen() {
        this.props.toggleFullscreen(this.props.isFullscreen);
    }

    render() {
        return (
            <video className="video-tag" onDoubleClick={this.fullscreen.bind(this)} ref={this.element} />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoTag);