import InitialState from '../../store/initialState';
import { INIT_MEDIA, ON_VALIDATION_MEDIA_COMPLETED } from '../../constants/action-types';

export default function reducer(state = InitialState.validationMedia, action) {
    switch (action.type) {
        case INIT_MEDIA: {
            return {
                ...state, dataLoaded: 'inProgress'
            };
        }
        case ON_VALIDATION_MEDIA_COMPLETED: {
            let autoBitrate = {
                bitrate: 0,
                lines: 'Auto',
                param: null,
            };
            action.payload.vmData.bitrates.push(autoBitrate);
            return {
                ...state,
                data: action.payload,
                dataLoaded: true,
                bitrates: action.payload.vmData.bitrates
            };
        }
        default:
            return state;
    }
}