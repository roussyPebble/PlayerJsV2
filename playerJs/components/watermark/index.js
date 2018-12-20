import React, { Component } from 'react';
import { connect } from 'react-redux';
import './watermark.scss';

const mapStateToProps = (state) => {
    return {
        watermarkParam: state.userParams.integrationParams.watermark,
        watermarkMeta: state.metaMedia.metas.watermark,
        playedOnce: state.playerState.playedOnce,
        isLive: state.media.isLive
    };
};

class Watermark extends Component {

    watermarkEnabled() {
        this.watermark = this.props.watermarkParam || this.props.watermarkMeta;
        return (this.watermark != null
            && this.watermark !== ''
            && this.watermark.indexOf('display:none') === -1
            && this.props.playedOnce === true
            && this.props.isLive !== true
        );
    }

    render() {
        if (!this.watermarkEnabled()) return null;
        return (
            <div className="watermark-container">
                <img src={this.watermark} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Watermark);
