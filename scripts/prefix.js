/* global exports */
exports.prefix=getPrefix;
function getPrefix(env) {
    switch (env) {
        case 'lcl': return 'http://lcl-';
        case 'dev': return 'https://dev-';
        case 'pp': return 'https://pp-';
        case 'prod': return 'https://';
        default: return 'http://lcl-';
    }
}
