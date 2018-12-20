import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayBtn from './playBtn';
import LiveIcon from './liveIcon';
import FullscreenBtn from './fullscreen';
import VolumeBtn from './volume/btn';
import SubtitleBtn from './subtitles';
import BitrateBtn from './bitrates';
import ReduceBtn from './reduce';
import VideoDescriptionBtn from './videoDescription';
import Seekbar from './seekbar';
import './bottomController.scss';

const mapStateToProps = (state) => {
    return {
        canReduce: state.userParams.integrationParams.canReduce,
        isMouseOverPlayer: state.playerState.mouseOver,
        mediaIsPlaying: state.playerState.playing,
        mediaPlayedOnce: state.playerState.playedOnce,
        infoDisplayed: state.playerState.infoDisplayed,
        playerSizes: state.playerState.sizes,
        ctrlKeyboardFocused: state.playerState.ctrlKeyboardFocused,
        describedVideo: state.metaMedia.metas.describedVideo,
        isLive: state.media.isLive
    };
};
/**
 * The bottom controller containing video controls
 * @hideconstructor
 */
class BottomController extends Component {
    constructor() {
        super();
        this.element = React.createRef();
    }

    componentDidUpdate() {
        this.resizeButton();
    }

    componentDidMount() {
        this.resizeButton();
    }

    resizeButton() {
        let playerHeight = this.props.playerSizes.height;
        let percent = playerHeight < 335 ? '6' : '10';
        let buttonSizes = (percent * playerHeight)/100;
        this.element.current.style.setProperty('--button-size', `${buttonSizes}px`);
    }

    handleDisplay() {
        let className;
        if (!this.props.mediaPlayedOnce || this.props.infoDisplayed) {
            className = 'hide';
        } else if (this.props.isMouseOverPlayer || !this.props.mediaIsPlaying || this.props.ctrlKeyboardFocused) {
            className = 'show';
        } else {
            className = 'hide';
        }
        return className;
    }

    render() {
        return (
            <div
                className={`bottom-controller ${this.handleDisplay()}`}
                ref={this.element}
            >
                <div className="bottom-controller--top">
                    <Seekbar/>
                </div>
                <div className="bottom-controller--bottom">
                    <div className="bottom-controller--left">
                        <PlayBtn />
                        <VolumeBtn />
                        {(this.props.isLive) ? <LiveIcon /> : ''}
                    </div>
                    <div className="bottom-controller--right">
                        {(this.props.describedVideo === 'true' || this.props.isLive) ? <VideoDescriptionBtn /> : ''}
                        <SubtitleBtn />
                        <BitrateBtn />
                        {(this.props.canReduce === true) ? <ReduceBtn /> : ''}
                        <FullscreenBtn />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(BottomController);