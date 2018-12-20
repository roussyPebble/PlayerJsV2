import { getVideoTag } from '../../helpers/dom';

/**
 * @Module Player state
 */
/**
 * Set video tag volume
 * @param uuid {string} Instance uuid
 * @param level {number} Volume level
 */
export function setVolume(uuid, level) {
    let videoTag = getVideoTag(uuid);
    videoTag.volume = level;
}