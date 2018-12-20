import React, { Component } from 'react';
import { connect } from 'react-redux';
import { a11yFocus } from '../../actions/ui';
import './thumbnail.scss';
import {time_to_formattedTime} from '../../helpers/time';
import { THUMBNAILS_CONTAINER_SIZE, THUMBNAILS_IMG_SIZE, THUMBNAILS_IMAGES } from '../../constants/ui';

const mapStateToProps = (state) => {
    return {
        thumbnails: state.metaMedia.metas.plancheContact,
        thumbnailsHR: state.metaMedia.metas.plancheContactHR,
        mediaPosition: state.playerState.thumbnail.mediaPosition,
        mediaPlayedOnce: state.playerState.playedOnce,
        xPosition: state.playerState.thumbnail.xPosition,
        yPosition: state.playerState.thumbnail.yPosition,
        mediaLength: state.metaMedia.metas.length,
        isFullscreen: state.playerState.fullscreen
    };
};

const mapDispatchToProps = dispatch => {
    return {
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        }
    };
};
/**
 * The video thumbnail
 * @hideconstructor
 */
class Thumbnail extends Component {
    constructor() {
        super();
        this.background = React.createRef();
        this.container = React.createRef();
        this.preload = React.createRef();
    }

    /**
     * Handle a11y style focus
     * @description - Dispatch event to keep controller open and add style to button
     */
    handleA11yFocus(event) {
        if (!this.dragging) {
            this.props.a11yFocus(event.type === 'focus');
            this.asFocus = event.type === 'focus';
        }
    }

    /**
     * Get thumbnail container width
     * @returns {number}
     */
    getWidth() {
        return (this.props.isFullscreen ? THUMBNAILS_CONTAINER_SIZE.FULLSCREEN.WIDTH : THUMBNAILS_CONTAINER_SIZE.NORMAL.WIDTH);
    }

    /**
     * Get thumbnail container height
     * @returns {number}
     */
    getHeight() {
        return (this.props.isFullscreen ? THUMBNAILS_CONTAINER_SIZE.FULLSCREEN.HEIGHT : THUMBNAILS_CONTAINER_SIZE.NORMAL.HEIGHT);
    }

    /**
     * Get thumbnail time label
     * @returns {string}
     */
    getLabel() {
        let format = (this.props.mediaLength >= 3600) ? 'HH:mm:ss' : 'mm:ss';
        return time_to_formattedTime(this.props.mediaLength * this.props.mediaPosition, format);
    }

    /**
     * Get position to display thumbnail
     * @returns {number|string}
     */
    getPosition() {
        if (this.container.current) {
            let bckRect = this.background.current.getBoundingClientRect(),
                width = this.getWidth(),
                offset = width / 2;
            if (this.props.xPosition - offset > 0) {
                if (this.props.xPosition + offset < bckRect.width){
                    return `${this.props.xPosition - offset}px`;
                } else {
                    return `${bckRect.width - width}px`;
                }
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    /**
     * Construct thumbnail positions array
     * @returns {Array.<{x: string, y: string}>}
     */
    getThumbnailPositions() {
        if (this.preload.current && this.preload.current.width > 0) {
            if (!this.thumbnailPositions) {
                this.thumbnailPositions = [];
                let cellWidth = this.preload.current.width / 8,
                    cellHeight = this.preload.current.height / 8;
                for (var row = 0; row < THUMBNAILS_IMAGES.ROWS; row++) {
                    for (var col = 0; col < THUMBNAILS_IMAGES.COLS; col++) {
                        this.thumbnailPositions.push({
                            x: `${(col * cellWidth) * -1}px`,
                            y: `${(row * cellHeight) * -1}px`
                        });
                    }
                }
            }
            return this.thumbnailPositions;
        } else {
            return [];
        }
    }

    /**
     * Get background position to display the thumbnail
     * @returns {string}
     */
    getImgPosition() {
        let thumbnailPosition = this.getThumbnailPositions();
        if (thumbnailPosition.length > 0){
            let index = Math.floor(this.props.mediaPosition * THUMBNAILS_IMAGES.TOTAL);
            if (index < 0) index = 0;
            if (index >= thumbnailPosition.length) index = thumbnailPosition.length - 1;
            let position = thumbnailPosition[index];
            if (position){
                return `${position.x} ${position.y}`;
            } else {
                return '0 0';
            }
        } else {
            return '0 0';
        }
    }

    /**
     * Get thumbnail-container style
     * @returns {{left: (number|string)}}
     */
    getContainerStyle() {
        let height = this.getHeight();
        return {
            left: this.getPosition(),
            top: this.props.yPosition - height,
            '--thumbnail-container-width': `${this.getWidth()}px`,
            '--thumbnail-container-height': `${this.getHeight()}px`,
            '--thumbnail-img-width': `${this.props.isFullscreen ? THUMBNAILS_IMG_SIZE.FULLSCREEN.WIDTH : THUMBNAILS_IMG_SIZE.NORMAL.WIDTH}px`,
            '--thumbnail-img-height': `${this.props.isFullscreen ? THUMBNAILS_IMG_SIZE.FULLSCREEN.HEIGHT : THUMBNAILS_IMG_SIZE.NORMAL.HEIGHT}px`
        };
    }

    /**
     * Get thumbnail image style
     * @returns {{backgroundImage: string, backgroundPosition: string}}
     */
    getImgStyle() {
        return {
            backgroundImage: `url(${this.props.isFullscreen ? this.props.thumbnailsHR : this.props.thumbnails})`,
            backgroundPosition: `${this.getImgPosition()}`
        };
    }

    /**
     * Is thumbnail active
     * @returns {boolean}
     */
    isActive() {
        return (this.props.mediaPlayedOnce === true && this.props.mediaPosition > 0);
    }

    render() {
        return (
            <div className="thumbnail-background" ref={this.background}>
                <div className="thumbnail-preload">
                    <img src={this.props.thumbnails} ref={this.preload} />
                    <img src={this.props.thumbnailsHR} ref={this.preload} />
                </div>
                <div className={`thumbnail-container ${this.isActive() ? 'active' : ''}`}
                    ref={this.container}
                    style={this.getContainerStyle()}
                >
                    <div className="thumbnailImg" style={this.getImgStyle()} />
                    <div className="thumbnailLabel">{this.getLabel()}</div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail);