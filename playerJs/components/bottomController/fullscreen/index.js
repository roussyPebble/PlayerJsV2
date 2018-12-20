import React, { Component } from 'react';
import { connect } from 'react-redux';
import { enterFullscreen, exitFullscreen, a11yFocus } from '../../../actions/ui';
import { FULLSCREEN_OUT, FULLSCREEN } from '../../../constants/labels';
import Icon from '../../icon';

const mapStateToProps = (state) => {
    return {
        isFullscreen: state.playerState.fullscreen,
        controllerElementAsFocus: state.playerState.ctrlKeyboardFocused
    };
};

const mapDispatchToProps = dispatch => {
    return {
        enterFullscreen: () => {
            dispatch(enterFullscreen());
        },
        exitFullscreen: () => {
            dispatch(exitFullscreen());
        },
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        }
    };
};

/**
 * Fullscreen buttons
 * @hideconstructor
 */
class FullscreenBtn extends Component {

    /**
     * Handle fulscreen according to state
     */
    handleOnClick() {
        this.props.isFullscreen ? this.props.exitFullscreen() : this.props.enterFullscreen();
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
                className={`btn ${(this.asFocus) ? 'a11y-focus' : ''}`}
                aria-label={this.props.isFullscreen ? FULLSCREEN_OUT : FULLSCREEN}
                onFocus={this.handleA11yFocus.bind(this)}
                onBlur={this.handleA11yFocus.bind(this)}
                onMouseUp={this.handleA11yFocus.bind(this)}
                onClick={this.handleOnClick.bind(this)}>
                {(this.props.isFullscreen ? <Icon name="player-fullscreen-exit"/> : <Icon name="player-fullscreen"/>)}
            </button>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullscreenBtn);