import React, { Component } from 'react';
import { connect } from 'react-redux';
import './liveIcon.scss';

const mapStateToProps = (state) => {
    return {
        isLiveFeed: state.media.isLive
    };
};
/**
 * The bottom controller containing video controls
 * @hideconstructor
 */
class LiveIcon extends Component {
    render() {
        return (
            <div className={'live-icon'}>EN DIRECT</div>
        );
    }
}

export default connect(mapStateToProps)(LiveIcon);