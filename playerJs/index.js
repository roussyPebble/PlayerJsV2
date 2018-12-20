import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { setMediaInfo } from '../playerJs/actions/metaMedia';
import VideoContainer from './components/videoContainer';
import { setMetaMedia } from './actions/metaMedia';
import { logState } from './helpers/logger';
import { setEventEmitter } from './helpers/window';
import { setUserParams } from './actions/userParams';
import { initShortcuts } from './internalApi/shortcuts';
import { loadLocalStorage } from './actions/localStorage';
import initConfigurations from './config/init';
import { API } from './userApi';
import createStore from './store';
import { EventEmitter } from 'events';
import { initPlugins } from './plugins';

/**
 *
 * @description Main component - Calls metamedia before render. Set usersParams passed in props params
 * @prop {int} idMedia - The id of the requested media on init
 * @prop {string} appCode - The media services appCode
 * @prop {object} params - A js object with the additional params pass on init
 */
class Player extends Component {

    constructor(props) {
        super(props);
        if (!this.store) this.store = createStore(this.props.idMedia, this.props.appCode);
        logState(this.store);
        initShortcuts(this.store);
        initConfigurations(this.store);
        this.initProperties();
        this.initEvents();
    }

    componentDidMount() {
        this.store.dispatch(setMediaInfo(this.props.idMedia, this.props.appCode));
        this.store.dispatch(setMetaMedia({idMedia: this.props.idMedia, appCode: this.props.appCode}));
        this.store.dispatch(loadLocalStorage());
        this.store.dispatch(setUserParams(this.props.params));
        initPlugins(this, this.props.params, this.store);
    }

    /**
     * Init public properties of player
     */
    initProperties() {
        Object.assign(this, API(this.store));
    }

    /**
     * Init player event emitter
     */
    initEvents() {
        this.events = new EventEmitter();
        setEventEmitter(this.store.getState().playerState.uuid, this.events);
    }

    /**
     * Player event registration
     */
    on() {
        this.events.on.apply(this.events, arguments);
    }

    render() {
        return (
            <Provider store={this.store}>
                <VideoContainer />
            </ Provider>
        );
    }
}

export default Player;