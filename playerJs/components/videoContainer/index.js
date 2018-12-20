import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResizeObserver from 'react-resize-observer';
import VideoTag from '../videoTag';
import Teaser from '../teaser';
import BottomController from '../bottomController';
import './videoContainer.scss';
import { playerIsHover, setPlayerDimensions } from '../../actions/ui';
import BigBtnPlay from '../bigPlayBtn';
import LoadingCurtain from '../loading';
import Message from '../message';
import Info from '../info';
import Watermark from '../watermark';
import Thumbnail from '../thumbnail';

const mapStateToProps = (state) => {
    return {
        uuid: state.playerState.uuid,
        configs: state.configurations,
        userParams: state.userParams.integrationParams,
        mouseOver: state.playerState.mouseOver,
        fullscreen: state.playerState.fullscreen,
        playerIsReady: state.playerState.isReady,
        sizes: state.playerState.sizes,
        error: state.playerState.error.code,
        infoDisplayed: state.playerState.infoDisplayed
    };
};

const mapDispatchToProps = dispatch => {
    return {
        playerIsHover: (mouseIn) => {
            dispatch(playerIsHover(mouseIn));
        },
        setPlayerSize: (sizes) => {
            dispatch(setPlayerDimensions(sizes));
        }
    };
};
/**
 * The small play - pause bouton
 * @hideconstructor
 */
/**
 * @prop {object} configs - The configuration object that contains default configuration
 * @prop {object} userParams - Params passed by user on init
 * @prop {bool} mouseOver - Flag if a the user hover the player
 */
class VideoContainer extends Component {
    constructor() {
        super();
        this.element = React.createRef();
    }

    componentDidMount() {
        this.updateDimensions();
    }

    /**
     * Update player dimensions
     */
    updateDimensions() {
        if (this.element.current) {
            let domSizes = this.element.current.getBoundingClientRect();
            let sizes = {
                width: domSizes.width,
                height: domSizes.width > 0 ? domSizes.width * (9 / 16) : 0
            };
            this.props.setPlayerSize(sizes);
        }
    }

    /**
     * Set root element font size based on player width
     * @returns {string} fontSize
     */
    getRootFontSize() {
        let fontSize = '8px';
        if (this.props.sizes.width > 480) fontSize = '10px';
        if (this.props.sizes.width > 640) fontSize = '12px';
        if (this.props.sizes.width > 768) fontSize = '14px';
        if (this.props.sizes.width > 1024) fontSize = '16px';
        return fontSize;
    }

    /**
     * Get default configurations from `state.configurations` before component mount
     */
    getVideoWidth() {
        return this.props.userParams.width || this.props.configs.width;
    }

    /**
     * Get root element style
     * @returns {object} Style to apply
     */
    getVideoStyle() {
        let style = {
            width: this.getVideoWidth(),
            fontSize: this.getRootFontSize()
        };
        if (this.props.sizes.height > 0) style.minHeight = `${this.props.sizes.height}px`;
        return style;
    }

    /**
     * Handle mouse event
     */
    handleMouseEvent(event) {
        this.props.playerIsHover(event.type === 'mouseenter');
    }

    render() {
        return (
            <div
                data-uuid={this.props.uuid}
                ref={this.element}
                style={this.getVideoStyle()}
                className="rcplayer-container"
                onMouseEnter={this.handleMouseEvent.bind(this)}
                onMouseLeave={this.handleMouseEvent.bind(this)}>
                <ResizeObserver
                    onResize={this.updateDimensions.bind(this)} />
                {(this.props.error !== 0) ? '' : <Teaser />}
                {(this.props.error !== 0) ? '' : <Watermark />}
                {(this.props.error !== 0) ? '' : <Info />}
                {(this.props.playerIsReady || this.props.error !== 0) ? '' : <LoadingCurtain />}
                <VideoTag />
                {(!this.props.playerIsReady || this.props.error !== 0 || this.props.infoDisplayed) ? '' : <BigBtnPlay />}
                {(this.props.error !== 0) ? '' : <BottomController />}
                {(this.props.error !== 0) ? '' : <Thumbnail />}
                {(this.props.error !== 0) ? <Message /> : ''}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoContainer);