import React, { Component } from 'react';
import { connect } from 'react-redux';
import { a11yFocus, setVideoDescription } from '../../../actions/ui';
import './videoDescription.scss';
// import { toggleVideoDescription } from '../../../providers';
import { VIDEO_DESCRIPTION_OFF, VIDEO_DESCRIPTION_ON } from '../../../constants/labels';
import Icon from '../../icon';

const mapStateToProps = (state) => {
    return {
        controlerElementAsFocus: state.playerState.ctrlKeyboardFocused,
        isActive: state.playerState.videoDescriptionActive
    };
};

const mapDispatchToProps = dispatch => {
    return {
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        },
        toggleVideoDescription: (status) => {
            dispatch(setVideoDescription(!(status === true)));
        }
    };
};

/**
 * VideoDescription buttons
 * @hideconstructor
 */
class VideoDescriptionBtn extends Component {

    /**
     * Handle fulscreen according to state
     */
    handleOnClick() {
        // toggleVideoDescription(this.props.isActive);
        this.props.toggleVideoDescription(this.props.isActive);
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
                className={`btn video-description-btn ${(this.asFocus) ? 'a11y-focus' : ''} ${(this.props.isActive) ? 'active' : ''}`}
                aria-label={(this.props.isActive) ? VIDEO_DESCRIPTION_ON : VIDEO_DESCRIPTION_OFF}
                onFocus={this.handleA11yFocus.bind(this)}
                onBlur={this.handleA11yFocus.bind(this)}
                onMouseUp={this.handleA11yFocus.bind(this)}
                onClick={this.handleOnClick.bind(this)}>
                <Icon name="player-video-description"/>
            </button>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoDescriptionBtn);