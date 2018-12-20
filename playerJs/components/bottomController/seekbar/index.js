import React, { Component } from 'react';
import { connect } from 'react-redux';
import { seekTo, seekNextSec, seekPreviousSec, showThumbnail, hideThumbnail, a11yFocus } from '../../../actions/ui';
import './seekbar.scss';
import {SEEKBAR} from '../../../constants/labels';
import { THUMBNAIL_SEEKBAR_OFFSET, SEEKBAR_DISPLAY_STARTING_AT } from '../../../constants/ui';
import {formattedTime_to_time, getTimeRatio} from '../../../helpers/time';

const mapStateToProps = (state) => {
    return {
        isLive: state.media.isLive,
        mediaTime: state.media.time,
        mediaLength: state.metaMedia.metas.length,
        mediaPlayedOnce: state.playerState.playedOnce,
        controllerElementAsFocus: state.playerState.ctrlKeyboardFocused,
        sizes: state.playerState.sizes,
        ads: [],
        chapters: state.metaMedia.metas.Chapitres
    };
};

const mapDispatchToProps = dispatch => {
    return {
        seekTo: (time) => {
            dispatch(seekTo(time));
        },
        seekNextSec: (sec) => {
            dispatch(seekNextSec(sec));
        },
        seekPreviousSec: (sec) => {
            dispatch(seekPreviousSec(sec));
        },
        showThumbnail: (mediaPosition, xPosition, yPosition) => {
            dispatch(showThumbnail(mediaPosition, xPosition, yPosition));
        },
        hideThumbnail: () => {
            dispatch(hideThumbnail());
        },
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        }
    };
};
/**
 * The seek bar
 * @hideconstructor
 */
class Seekbar extends Component {
    constructor() {
        super();
        this.background = React.createRef();
        this.slider = React.createRef();
    }

    /**
     * Flag dragging state
     */
    beginDrag() {
        this.dragging = true;
    }

    /**
     * Set the volume on user slider input change
     */
    seekTo() {
        this.dragging = false;
        this.props.seekTo(this.slider.current.value * this.props.mediaLength);
        this.props.hideThumbnail();
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
     * Handle key down for right arrow and left arrow
     * @param event
     */
    handleKeyDown (event) {
        switch (event.keyCode) {
            case 37: {
                this.props.seekPreviousSec(10);
                break;
            }
            case 39: {
                this.props.seekNextSec(10);
                break;
            }
        }
    }

    /**
     * Handle mouse move event to show thumbnail and set slider value if dragging
     * @param event
     */
    handleMouseMove(event) {
        let bckRect = this.background.current.getBoundingClientRect(),
            rect = this.slider.current.getBoundingClientRect(),
            position = (event.clientX - rect.left) / rect.width,
            ratio = getTimeRatio(this.props.mediaTime, this.props.mediaLength);
        if (ratio >= 0) {
            if (this.dragging && this.slider.current) this.slider.current.value = ratio;
            this.props.showThumbnail(position, event.clientX - bckRect.left, rect.top - THUMBNAIL_SEEKBAR_OFFSET);
        } else {
            this.props.hideThumbnail();
        }
    }

    /**
     * Handle mouse leave event to hide thumbnail
     */
    handleMouseLeave() {
        this.props.hideThumbnail();
    }

    /**
     * Get current value to apply to seek bar
     * @returns {number}
     */
    getCurrentValue() {
        if (!this.dragging) {
            let ratio = getTimeRatio(this.props.mediaTime, this.props.mediaLength);
            if (ratio >= 0 && this.slider.current) this.slider.current.value = ratio;
            return ratio;
        } else {
            return this.slider.current.value;
        }
    }

    /**
     * Get ads position array
     * @returns {Array}
     */
    getAds() {
        return this.props.ads;
    }

    /**
     * Get chapters position array
     * Chapters are HH:mm:ss format, parse to {position: 0.0} format based on video length
     * @returns {Array}
     */
    getChapters() {
        if (this.chapters) return this.chapters;
        if (this.props.mediaLength > 0 && typeof this.props.chapters === 'string') {
            let chapterLabels = this.props.chapters.split(',');
            this.chapters = [];
            chapterLabels.map((label) => {
                let seconds = formattedTime_to_time(label);
                if (seconds >= 0) {
                    this.chapters.push({
                        position: seconds / this.props.mediaLength
                    });
                }
            });
            return this.chapters;
        } else {
            return [];
        }
    }

    /**
     * Get ads and chapters marks
     * @returns {Array}
     */
    getMarks() {
        return this.getAds().concat(this.getChapters());
    }

    render() {
        if (!this.props.mediaPlayedOnce || this.props.isLive || this.props.sizes.width < SEEKBAR_DISPLAY_STARTING_AT) return null;
        let currentValue = this.getCurrentValue();
        if (currentValue < 0) return null;
        return (
            <div ref={this.background}>
                <div className="seekbar-container">
                    <div className="seekbar-marks">
                        {this.getMarks().map(mark => {
                            return (<div
                                className={`seekbar-mark ${mark.position <= currentValue ? 'seekbar-mark-dark' : ''}`}
                                key={mark.position}
                                style={{'--mark-position': `${mark.position * 100}%`}}
                            />);
                        })}
                    </div>
                    <input
                        className={`seekbar ${(this.asFocus) ? 'a11y-focus' : ''}`}
                        ref={this.slider}
                        type="range"
                        min="0"
                        max="1"
                        step="0.00000001"
                        onFocus={this.handleA11yFocus.bind(this)}
                        onBlur={this.handleA11yFocus.bind(this)}
                        onClick={this.handleA11yFocus.bind(this)}
                        onDrag={this.handleA11yFocus.bind(this)}
                        aria-label={SEEKBAR}
                        onMouseDown={this.beginDrag.bind(this)}
                        onMouseUp={this.seekTo.bind(this)}
                        onMouseMove={this.handleMouseMove.bind(this)}
                        onMouseEnter={this.handleMouseMove.bind(this)}
                        onMouseLeave={this.handleMouseLeave.bind(this)}
                        onKeyDown={this.handleKeyDown.bind(this)}
                    >
                    </input>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Seekbar);