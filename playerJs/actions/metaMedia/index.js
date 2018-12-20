import { SET_MEDIA_INFO, SET_META_MEDIA } from '../../constants/action-types';

export function setMediaInfo(idMedia, appCode) {
    return {
        type: SET_MEDIA_INFO,
        payload: {
            idMedia: idMedia,
            appCode: appCode
        }
    };
}

export function setMetaMedia(metas) {
    return {
        type: SET_META_MEDIA,
        payload: metas
    };
}