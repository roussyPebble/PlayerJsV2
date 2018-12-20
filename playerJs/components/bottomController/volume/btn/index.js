import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mute, unmute, volumeBtnHover, a11yFocus } from '../../../../actions/ui';
import VolumeSlider from '../slider';
import './volumeBtn.scss';
import { MUTE, UNMUTE } from '../../../../constants/labels';
import Icon from '../../../icon';

const mapStateToProps = (state) => {
    return {
        isMute: state.playerState.volume.mute,
        level: state.playerState.volume.level,
        btnIsHover: state.playerState.volume.btnIsHover,
        controllerElementAsFocus: state.playerState.ctrlKeyboardFocused
    };
};

const mapDispatchToProps = dispatch => {
    return {
        mute: (level) => {
            dispatch(mute(level));
        },
        unmute: (level) => {
            dispatch(unmute(level));
        },
        onVolumeBtnHover: (isHover) => {
            dispatch(volumeBtnHover(isHover));
        },
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        }
    };
};
/**
 * The volume button
 * @hideconstructor
 * @prop {int} level - Volume level from state
 * @prop {bool} isMute - Mute flag from state
 */
class VolumeBtn extends Component {

    constructor() {
        super();
        this.icon = 'player-sound-hi';
        this.isHover = false;
    }

    componentWillReceiveProps(props) {
        this.manageIcon(props.level, props.isMute);
    }

    /**
     * Manage icon according to level of volume
     * @param {int} level
     * @param {bool} isMute
     */
    manageIcon(level, isMute) {
        if (isMute || level <= 0) {
            this.icon = 'player-sound-mute';
        } else if (level <= 0.5) {
            this.icon = 'player-sound-low';
        } else {
            this.icon = 'player-sound-hi';
        }
    }

    /**
     * Handle mute btn click
     */
    handleBtnClick() {
        this.props.isMute === true || this.props.level === 0 ? this.props.unmute(this.props.level) : this.props.mute(this.props.level);
    }

    /**
     * Handle container hover
     */
    handleHover(event) {
        let flag = event.type === 'mouseenter' || event.type === 'focus';
        this.props.onVolumeBtnHover(flag);
        this.isHover = flag;
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
            <div className={`volume-container ${(this.isHover) ? 'volume-container--open' : 'volume-container--close'}`}
                onMouseEnter={this.handleHover.bind(this)}
                onFocus={this.handleHover.bind(this)}
                onBlur={this.handleHover.bind(this)}
                onMouseLeave={this.handleHover.bind(this)}
                tabIndex={1}>
                <div className="volume-btn-container">
                    <button
                        className={`btn volume-btn ${(this.asFocus) ? 'a11y-focus' : ''}`}
                        onFocus={this.handleA11yFocus.bind(this)}
                        onBlur={this.handleA11yFocus.bind(this)}
                        onMouseUp={this.handleA11yFocus.bind(this)}
                        aria-label={this.props.isMute ? UNMUTE : MUTE}
                        onClick={this.handleBtnClick.bind(this)}>
                        <Icon name={this.icon} />
                    </button>
                </div>
                <div className="volume-slider-container">
                    <VolumeSlider btnIsHover={this.isHover} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeBtn);