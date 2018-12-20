/**
 * @module Meta media
 */
import axios from 'axios';
import appConfig from '../../config';
import { SET_META_MEDIA } from '../../constants/action-types';
import { setMetaMedia } from '../../actions/metaMedia';
import {playMedia, seekTo} from '../../actions/ui';

/**
 * Meta media middleware
 * @returns {Function}
 */
export default store => next => action => {
    switch (action.type) {
        case SET_META_MEDIA: {
            getMetaMedia(action.payload.idMedia, action.payload.appCode, (err, data) => {
                if (!err) {
                    let state = store.getState();
                    next(setMetaMedia(
                        Object.assign({
                            idMedia: action.payload.idMedia,
                            appCode: action.payload.appCode
                        }, data)
                    ));
                    if (state.media.restoring) {
                        store.dispatch(playMedia());
                        if (state.media.restoringTime) store.dispatch(seekTo(state.media.restoringTime));
                    }
                } else {
                    setTimeout(() => {
                        store.dispatch(setMetaMedia(store.getState().media));
                    }, 5000);
                }
            });
            break;
        }
        default: {
            next(action);
        }
    }
};

/**
 * Get meta media from service
 * @param idMedia {string} Media identifier
 * @param appCode {string} Application code
 * @param next {getMetaMediaCallback} callback
 */
function getMetaMedia(idMedia, appCode, next) {
    let requestParams = {
        headers: {'Authorization': appConfig.metaMedia.clientKey},
        params: {
            appCode: appCode,
            idMedia: idMedia,
            output: 'json'
        }
    };

    axios.get(appConfig.metaMedia.url, requestParams).then((response) => {
        parseMetaMedia(response.data.Metas).then((data) => {
            next(null, data);
        });
    }).catch(function(error) {
        next(error);
    });
}
/**
 * @callback getMetaMediaCallback
 * @param error {object} Service error
 * @param [data] {Array.<metaData>} Service meta data
 */

/**
 * Meta data
 * @typedef {Object} metaData
 * @property {string} name - Meta name
 * @property {string} text - Meta value
 */

/**
 * Get needed meta data
 * @param response
 * @returns {Promise<Array.<{text: string, name: string}>>}
 */
function parseMetaMedia(response) {
    return new Promise((resolve) => {
        let neededMetas = [
            'closedCaption',
            'imageHR',
            'providerId',
            'SrcAvDiffusion',
            'describedVideo',
            'Title',
            'Description',
            'watermark',
            'length',
            'Chapitres',
            'Thumbnail',
            'plancheContact',
            'plancheContactHR',
            'webdiffusion',
            'SrcTypeDocument',
            'broadcastingStation',
            'Date',
            'Network',
            'RcTheme',
            'Chaine'
        ];
        let result = findInMetaMediaArray(response, neededMetas);
        resolve(result);
    });
}

/**
 * Find a meta in the meta array
 * @param response {Array.<Object>} Meta array
 * @param metas {Array.<string>} Array of needed meta names
 * @return {Object.<string, string>} Parsed meta data
 */
function findInMetaMediaArray(response, metas) {
    let data = {};
    if (response && response.length) {
        response.find((element) => {
            if (metas.includes(element.name)) data[element.name] = element.text;
        });
    }
    return data;
}
