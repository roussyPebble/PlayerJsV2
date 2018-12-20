import React, { Component } from 'react';
import { connect } from 'react-redux';
import './message.scss';

const mapStateToProps = (state) => {
    return {
        error: state.playerState.error
    };
};

/**
 * Message to display to user
 * @hideconstructor
 */
class Message extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className='message-container'>
                {this.props.error.message}
            </div>
        );
    }
}

export default connect(mapStateToProps)(Message);