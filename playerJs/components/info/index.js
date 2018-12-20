import React, { Component } from 'react';
import { connect } from 'react-redux';
import './info.scss';
import {INFO_ON_CONTENT, CLOSE_INFO} from '../../constants/labels';
import {a11yFocus, displayInfo, playMedia, pauseMedia} from '../../actions/ui';
import {MIN_WIDTH_DISPLAY_INFO_MESSAGE, MAX_CHARS_INFO_TITLE, MAX_CHARS_INFO_DESCRIPTION} from '../../constants/ui';
import Icon from '../icon';

const mapStateToProps = (state) => {
    return {
        isMouseOverPlayer: state.playerState.mouseOver,
        infoDisplayed: state.playerState.infoDisplayed,
        infoTitle: state.metaMedia.metas.Title,
        infoDescription: state.metaMedia.metas.Description,
        mediaIsPlaying: state.playerState.playing,
        mediaPlayedOnce: state.playerState.playedOnce,
        ctrlKeyboardFocused: state.playerState.ctrlKeyboardFocused,
        sizes: state.playerState.sizes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleInfo: (infoDisplayed) => {
            dispatch(displayInfo(!infoDisplayed));
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

class Info extends Component {

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

    /**
     * Calculate button size
     */
    resizeButton() {
        if (this.element.current) {
            let playerHeight = this.props.sizes.height;
            let percent = playerHeight < 335 ? '6' : '10';
            let buttonSizes = (percent * playerHeight) / 100;
            this.element.current.style.setProperty('--button-size', `${buttonSizes}px`);
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

    /**
     * Return class name used for displaying button
     * @returns {string}
     */
    handleDisplay() {
        let className;
        if (this.props.isMouseOverPlayer || !this.props.mediaIsPlaying || this.props.ctrlKeyboardFocused || this.props.infoDisplayed) {
            className = 'show';
        } else {
            className = 'hide';
        }
        return className;
    }

    /**
     * Handle info button click
     */
    handleOnClick() {
        if (!this.props.infoDisplayed && this.props.mediaIsPlaying) {
            this.mediaWasPlaying = true;
            this.props.pauseMedia();
        }
        if (this.props.infoDisplayed && this.mediaWasPlaying === true) {
            this.mediaWasPlaying = false;
            this.props.playMedia();
        }
        this.props.toggleInfo(this.props.infoDisplayed);
    }

    /**
     * Get info title, max char with max char length
     * @returns {*}
     */
    getTitle() {
        if (!this.props.infoTitle) return '';
        if (this.props.infoTitle.length > MAX_CHARS_INFO_TITLE) return this.props.infoTitle.substring(0, MAX_CHARS_INFO_TITLE);
        return this.props.infoTitle;
    }

    /**
     * Get info description, max char with max char length
     */
    getDescription() {
        if (!this.props.infoDescription) return '';
        if (this.props.infoDescription.length > MAX_CHARS_INFO_DESCRIPTION) return this.props.infoDescription.substring(0, MAX_CHARS_INFO_DESCRIPTION);
        return this.props.infoDescription;
    }

    render() {
        if (this.getTitle() === '') return null;
        return (
            <div className="info-container" ref={this.element}>
                <div className={`info-message ${this.props.infoDisplayed ? 'active' : ''}`}>
                    <h2 className="info-message-title">{this.getTitle()}</h2>
                    {this.props.sizes.width >= MIN_WIDTH_DISPLAY_INFO_MESSAGE ? <p className="info-message-content">{this.getDescription()}</p> : ''}
                </div>
                <button
                    className={`btn info-btn ${this.handleDisplay()} ${(this.asFocus) ? 'a11y-focus' : ''}`}
                    aria-label={this.props.infoDisplayed ? CLOSE_INFO : INFO_ON_CONTENT}
                    onFocus={this.handleA11yFocus.bind(this)}
                    onBlur={this.handleA11yFocus.bind(this)}
                    onClick={this.handleOnClick.bind(this)}
                    onMouseUp={this.handleA11yFocus.bind(this)}>
                    {this.props.infoDisplayed ? <Icon name="player-fermer"/> : <Icon name="player-info"/>}
                </button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
