/**
 * @module Validation media
 */
import axios from 'axios';
import {logError} from '../../helpers/logger';
import appConfig from '../../config';
import { INIT_MEDIA } from '../../constants/action-types';
import { VALIDATION_MEDIA, GENERIC } from '../../constants/errors';
import { emitError } from '../../actions/errors';
import { onValidationMediaCompleted } from '../../actions/validationMedia';

/**
 * Validation media middleware
 * @param store
 * @returns {Function}
 */
export default store => next => action => {
    switch (action.type){
        case INIT_MEDIA: {
            let requestParams = {
                headers: {'Authorization': appConfig.validatonMedia.clientKey},
                params: {
                    appCode: action.payload.appCode,
                    connectionType: 'hd',
                    deviceType: 'ipad',
                    idMedia: action.payload.idMedia,
                    multibitrate: true,
                    output: 'json'
                }
            };

            axios.get(appConfig.validatonMedia.url, requestParams).then((response) => {
                next(action);
                if (response.data.errorCode === 0) {
                    let isPlaying = store.getState().playerState.playing;
                    store.dispatch(onValidationMediaCompleted(response.data, isPlaying));
                } else {
                    let error = null;
                    logError('error', response, store.getState());
                    switch (response.data.errorCode) {
                        case VALIDATION_MEDIA.GEO_BLOCK.code: {
                            error = VALIDATION_MEDIA.GEO_BLOCK;
                            break;
                        }
                        default: {
                            error = GENERIC.UNKNOWN;
                            break;
                        }
                    }
                    store.dispatch(emitError(error));
                }
            });
            break;
        }
        default: {
            next(action);
        }
    }
};