import moment from 'moment';

/**
 * Get ration from 0.0 to 1.0 of a time versus the total time
 * @param time {number} time
 * @param total {number} total time
 * @returns {number} ratio
 */
export function getTimeRatio(time, total){
    time = parseFloat(time);
    total = parseFloat(total);
    if (!isNaN(time) && !isNaN(total) && total > 0) {
        return time / total;
    } else {
        return -1;
    }
}

/**
 * Translate a time in seconds to a formatted time
 * @param time {number} Time in seconds
 * @param format {string} Format to apply default HH:mm:ss
 * @returns {string} Formatted time
 */
export function time_to_formattedTime(time, format = 'HH:mm:ss') {
    return moment().startOf('day').add(time, 'seconds').format(format);
}

/**
 * Parse a formatted time to a time in seconds
 * @param formattedTime {string} Time in format to parse
 * @param originFormat {string} Origin format
 * @returns {number} Time in seconds
 */
export function formattedTime_to_time(formattedTime, originFormat = 'HH:mm:ss') {
    let time = moment(formattedTime, originFormat);
    if (time.isValid()) {
        return time.diff(moment().startOf('day'), 'seconds');
    } else {
        return -1;
    }
}

/**
 * Convert UTC date string to millesecond
 * @param {string} isoDate Utc date to convert
 */
export function getEpochTimeFromUtc(isoDate) {
    return moment(isoDate).valueOf();
}