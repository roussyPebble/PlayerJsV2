import React, { Component } from 'react';
import { connect } from 'react-redux';
import { volumeChanged, a11yFocus } from '../../../../actions/ui';
import './volumeSlider.scss';
import { VOLUME } from '../../../../constants/labels';

const mapStateToProps = (state) => {
    return {
        level: state.playerState.volume.level,
        isMute: state.playerState.volume.mute,
        controllerElementAsFocus: state.playerState.ctrlKeyboardFocused
    };
};

const mapDispatchToProps = dispatch => {
    return {
        volumeChanged: (level) => {
            dispatch(volumeChanged(level));
        },
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        }
    };
};
/**
 * The volume Slider
 * @hideconstructor
 * @prop {int} level - Volume level from state
 * @prop {bool} isMute - Mute flag from state
 */
class VolumeSlider extends Component {
    constructor() {
        super();
        this.slider = React.createRef();
    }

    componentWillReceiveProps(props) {
        props.isMute ? this.slider.current.value = 0 : this.slider.current.value = props.level;
    }
    /**
     * Set the volume on user slider input change
     */
    setVolume() {
        this.props.volumeChanged(this.slider.current.value);
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
            <input
                className={`volume-slider ${(this.props.btnIsHover) ? ' volume-slider--open': 'volume-slider--close'} ${(this.asFocus) ? 'a11y-focus' : ''}`}
                ref={this.slider}
                type="range"
                min="0"
                max="1"
                step="0.01"
                onFocus={this.handleA11yFocus.bind(this)}
                onBlur={this.handleA11yFocus.bind(this)}
                onClick={this.handleA11yFocus.bind(this)}
                onDrag={this.handleA11yFocus.bind(this)}
                aria-label={VOLUME}
                onChange={this.setVolume.bind(this)}>
            </input>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeSlider);