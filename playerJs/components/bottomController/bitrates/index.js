import React, { Component } from 'react';
import { connect } from 'react-redux';
import { QUALITE_VIDEO } from '../../../constants/labels';
import { a11yFocus, setBitrate, selectingBitrate, setProviderBitrate } from '../../../actions/ui';
import './bitrates.scss';

const mapStateToProps = (state) => {
    return {
        controllerElementAsFocus: state.playerState.ctrlKeyboardFocused,
        bitrates: state.validationMedia.bitrates,
        currentBitrate: state.providers.currentBitrate,
        validationMediaLoaded: state.validationMedia.dataLoaded,
        selectionInProgress: state.playerState.selectingBitrate,
        sizes: state.playerState.sizes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        a11yFocus: (isFocus) => {
            dispatch(a11yFocus(isFocus));
        },
        setProviderBitrate: (selectedBitrate) => {
            dispatch(setProviderBitrate(selectedBitrate));
        },
        setBitrate: (params) => {
            dispatch(setBitrate(params));
        },
        selectingBitrate: (inProgress) => {
            dispatch(selectingBitrate(inProgress));
        }
    };
};

/**
 * Bitrate buttons
 * @hideconstructor
 */
class BitrateBtn extends Component {

    componentDidMount() {
        this.isMenuOpen = false;
        this.menuElement = React.createRef();
        this.containerElement = React.createRef();
    }

    /**
     * Calculate container bottom position according to the number of bitrate options
     */
    calculateContainerHeight() {
        let sizes = this.menuElement.current.getBoundingClientRect();
        return sizes.height / 2;
    }

    /**
     * Handle bitrate onclick
     */
    handleOnClick() {
        if (this.isMenuOpen) {
            this.hideMenu();
        } else {
            this.showMenu();
            this.focusOnBitrateOption();
        }
    }

    /**
     * Put focus on the top bitrate option
     */
    focusOnBitrateOption() {
        let firstBitrateOption = this.menuElement.current.firstChild.childNodes[0];
        firstBitrateOption.focus();
    }

    /**
     * Select bitrate
     */
    selectBitrate(event) {
        let selectedBitrate = event.target.dataset;
        if (this.props.currentBitrate.bitrate !== selectedBitrate.bitrateindex) {
            this.props.setProviderBitrate(selectedBitrate);
            this.props.selectingBitrate(true);
        }
        this.hideMenu();
    }

    /**
     * Show bitrate menu
     */
    showMenu() {
        this.menuElement.current.style.display = 'block';
        this.isMenuOpen = true;
    }

    /**
     * Hide bitrate menu
     */
    hideMenu() {
        this.menuElement.current.style.display = 'none';
        this.containerElement.current.style.bottom = '0px';
        this.isMenuOpen = false;
    }

    /**
     * Handle a11y style focus
     * @description - Dispatch event to keep controller open and add style to button
     */
    handleA11yFocus(event) {
        this.props.a11yFocus(event.type === 'focus');
        this.asFocus = event.type === 'focus';
    }

    /**
     * Handle focus style for bitrate options
     * @param {object} event - Event triggered by UI
     */
    handleOptionsFocus(event) {
        event.target.className = 'bitrates-options';
        if (event.type === 'focus') {
            event.target.className += ' a11y-focus';
            this.props.a11yFocus(true);
            this.asFocus = false;
        } else {
            this.optionsAsFocus = false;
        }
    }

    render() {
        if (this.props.sizes.width < 480) return null;
        let bitratesLength = this.props.bitrates.length;
        let menu = this.props.bitrates.map((item, index) => {
            let bitrateIndex = bitratesLength - 2;
            bitratesLength--;
            return (
                <li key={index}>
                    <button
                        className={`bitrates-options ${(this.optionsAsFocus) ? 'a11y-focus' : ''}`}
                        onClick={this.selectBitrate.bind(this)}
                        key={index}
                        onFocus={this.handleOptionsFocus.bind(this)}
                        onBlur={this.handleOptionsFocus.bind(this)}
                        onMouseUp={this.handleOptionsFocus.bind(this)}
                        data-bitrateindex={bitrateIndex}
                        aria-label={`${QUALITE_VIDEO} ${item.lines}`}
                        data-lines={item.lines}>
                        {item.lines}
                    </button>
                </li>
            );
        });

        return (
            <div className="bitrateContainer" ref={this.containerElement}>
                <ul role="menu" className="bitrateMenu" ref={this.menuElement}>{menu}</ul>
                <button
                    className={`bitratesBtn ${(this.asFocus) ? 'a11y-focus' : ''} ${(this.props.selectionInProgress) ? 'wait' : ''}`}
                    aria-label={QUALITE_VIDEO}
                    onFocus={this.handleA11yFocus.bind(this)}
                    onBlur={this.handleA11yFocus.bind(this)}
                    onMouseUp={this.handleA11yFocus.bind(this)}
                    onClick={this.handleOnClick.bind(this)}>
                    {this.props.currentBitrate.lines}
                </button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BitrateBtn);