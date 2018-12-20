import { createStore } from 'redux';
import reducers from '../reducers';
import initialState from './initialState';
import middlewares from '../middlewares';
import uuid from 'uuid/v1';

export default (idMedia, appCode) => {
    initialState.playerState.uuid = uuid();
    initialState.media.idMedia = idMedia;
    initialState.media.appCode = appCode;
    return createStore(reducers, initialState, middlewares);
};