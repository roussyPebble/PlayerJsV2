/**
 * Parse url to make sure every requests are with the same protocol
 * @param url {string} Url to parse
 * @returns {string}
 */
export function parseUrl(url) {
    if (location.protocol === 'https:') {
        url = url.replace('http://', 'https://');
    } else {
        url = url.replace('https://', 'http://');
    }
    return url;
}