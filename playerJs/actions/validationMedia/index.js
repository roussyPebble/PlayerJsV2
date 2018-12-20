import { ON_VALIDATION_MEDIA_COMPLETED } from '../../constants/action-types';

export function onValidationMediaCompleted(data, status) {
    return {
        type: ON_VALIDATION_MEDIA_COMPLETED,
        payload: {
            vmData: data,
            isPlaying: status
        }
    };
}