import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REDUCE } from '../../../constants/labels';
import { a11yFocus, setReduced } from '../../../actions/ui';
import Icon from '../../icon';

const mapStateToProps = (state) => {
    return {
        fullscreen: state.playerState.fullscreen,
        reduced: state.playerState.reduced,
        sizes: state.playerState.sizes,
        controllerElementAsFocus: state.playerState.ctrlKeyboardFocused
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setReduced: (isReduced) => {
            dispatch(setReduced(isReduced));
        },
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        }
    };
};

/**
 * Reduce button
 * @hideconstructor
 */
class ReduceBtn extends Component {

    /**
     * Handle reduced according to state
     */
    handleOnClick() {
        this.props.setReduced(!this.props.reduced);
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
        if (this.props.sizes.width < 640 || this.props.reduced || this.props.fullscreen) return null;
        return (
            <button
                className={`btn reduce-btn ${(this.asFocus) ? 'a11y-focus' : ''}`}
                aria-label={REDUCE}
                onFocus={this.handleA11yFocus.bind(this)}
                onBlur={this.handleA11yFocus.bind(this)}
                onMouseUp={this.handleA11yFocus.bind(this)}
                onClick={this.handleOnClick.bind(this)}>
                <Icon name="player-reduce"/>
            </button>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduceBtn);