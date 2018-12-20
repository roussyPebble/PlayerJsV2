import React, { Component } from 'react';
import { connect } from 'react-redux';
import { a11yFocus, subtitlesToggle } from '../../../actions/ui';
import { CLOSE_CAPTION } from '../../../constants/labels';
import './subtitles.scss';
import Icon from '../../icon';

const mapStateToProps = (state) => {
    return {
        controllerElementAsFocus: state.playerState.ctrlKeyboardFocused,
        subtitlesUrl: state.providers.subtitlesUrl,
        subtitlesActive: state.providers.subtitlesActive,
        isLive: state.media.isLive
    };
};

const mapDispatchToProps = dispatch => {
    return {
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        },
        subtitlesToggle: (isActive, track) => {
            dispatch(subtitlesToggle(isActive, track));
        }
    };
};

/**
 * Subtitles buttons
 * @hideconstructor
 */
class SubtitleBtn extends Component {

    /**
     * Handle fulscreen according to state
     */
    handleOnClick() {
        let isActive = !this.props.subtitlesActive;
        this.props.subtitlesToggle(isActive);
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
                className={`btn subtitleBtn ${(this.asFocus) ? 'a11y-focus' : ''} ${(!this.props.subtitlesUrl && !this.props.isLive) ? 'hide' : ''} ${this.props.subtitlesActive ? 'subtitleBtnShowing' : 'subtitleBtnHidden'}`}
                onFocus={this.handleA11yFocus.bind(this)}
                onBlur={this.handleA11yFocus.bind(this)}
                onMouseUp={this.handleA11yFocus.bind(this)}
                aria-label={CLOSE_CAPTION}
                onClick={this.handleOnClick.bind(this)}>
                <Icon name="player-subtitles-on" className="player-subtitles-on"/>
                <Icon name="player-subtitles-off" className="player-subtitles-off"/>
            </button>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubtitleBtn);