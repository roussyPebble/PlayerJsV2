/**
 * @module Local storage
 */
import { STORAGE_NAME } from '../../constants/storage';
import { logError } from '../logger';

/**
 * Return a value of the local storage
 * @param key {object} Key
 * @returns {any} Value found in local storage
 */
export function getLocalStorage(key) {
    let value = key ? window.localStorage.getItem(`${STORAGE_NAME}${key.name}`) : window.localStorage;
    if (value != null) {
        try {
            switch (key.type) {
                case 'json':
                    if (typeof value === 'string' && value.length > 0) value = JSON.parse(value);
                    break;
                case 'float':
                    value = parseFloat(value);
                    value = (!isNaN(value) ? value : 0);
                    break;
                case 'boolean':
                    value = (value === '1' || value === 'true');
                    break;
                default:
                    break;
            }
        } catch (ex) {
            logError(ex.message, { ex, key });
        }
    } else {
        value = undefined;
    }
    return value;
}

/**
 * Set a value in local storage
 * @param key {object} Key
 * @param value {*} Value to set
 */
export function setLocalStorage(key, value) {
    let name = `${STORAGE_NAME}${key.name}`;
    try {
        switch (typeof value){
            case 'object':
                value = JSON.stringify(value);
                break;
            default:
                break;
        }
    } catch (ex){
        logError(ex.message, { ex,  key, value });
    }
    window.localStorage.setItem(name, value);
}