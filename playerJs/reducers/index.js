import { combineReducers } from 'redux';

// reducers
import playerState from './playerState';
import metaMedia from './metaMedia';
import media from './media';
import validationMedia from './validationMedia';
import configurations from './config';
import providers from './providers';
import userParams from './userParams';
import event from './event';

export default combineReducers({
    playerState,
    metaMedia,
    validationMedia,
    media,
    configurations,
    providers,
    userParams,
    event
});