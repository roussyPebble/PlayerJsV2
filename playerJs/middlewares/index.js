import playerState from './playerState';
import providers from './providers';
import metaMedia from '../services/metaMedia';
import validationMedia from '../services/validationMedia';
import tracking from './tracking';
import event from './event';
import {applyMiddleware} from 'redux';

export default applyMiddleware(
    playerState,
    metaMedia,
    validationMedia,
    providers,
    tracking,
    event
);