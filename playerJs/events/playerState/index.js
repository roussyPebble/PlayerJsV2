import { emitEvent } from '../../actions/events';
import { REDUCED } from '../../constants/events';

export function onReduced(isReduced) {
    return emitEvent(REDUCED, isReduced);
}