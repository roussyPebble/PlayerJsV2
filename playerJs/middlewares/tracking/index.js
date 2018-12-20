import { PLAY_MEDIA, SET_META_MEDIA, PAUSE_MEDIA } from '../../constants/action-types';
import { liveVideoTrackingEvents } from '../../constants/events';
import { emitEvent } from '../../actions/events';
import { getProgramInfo } from '../../services/neuro';

export default store => next => action => {
    let state = store.getState();
    switch (action.type) {
        case PLAY_MEDIA: {
            if (state.media.isLive) {
                getProgramInfo(state.metaMedia.metas.broadcastingStation, (data) => {
                    store.dispatch(emitEvent(liveVideoTrackingEvents.LIVE_PROGRAM_START, data));
                });
            }
            break;
        }
        case PAUSE_MEDIA: {
            store.dispatch(emitEvent(liveVideoTrackingEvents.PAUSE));
            break;
        }
        case SET_META_MEDIA: {
            store.dispatch(emitEvent(SET_META_MEDIA, action.payload));
            break;
        }
    }
    next(action);
};