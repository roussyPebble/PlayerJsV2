/**
 * Logger
 * @module Logger
 */

/**
 * Log error
 * @param {string} text - Error massage
 * @param {*} data - The error data when want to pass to the logger
 * @param {object} store - Store
 */
export function logError(text, data = null, store = null) {
    let log = {
        ErrorText: text,
        errorData: data,
        PlayerState: store
    };
    /* eslint-disable-next-line no-console */
    console.log(log);
}

/**
 * Log Info
 * @param {string} text - Info massage
 */
export function logInfo(type, data = null) {
    /* eslint-disable-next-line no-console */
    console.info(`${type} => `, data);
}

/**
 * Log state
 * @description Log state when pressing `s` key need to be remove for prod.
 */
export function logState(store) {
    window.addEventListener('keydown', (event) => {
        if (event.keyCode === 83) {
            /* eslint-disable-next-line no-console */
            console.log('Debugger', store.getState());
        }

        if (event.keyCode === 69) {
            /* eslint-disable-next-line no-console */
            console.log('Debugger', event.target);
        }
    });
}