import { logError } from '../logger';

/**
 * Check if data layer is present in the page
 */
export function isDataLayerAvailable() {
    return typeof window.dataLayerHelper !== 'undefined';
}

/**
 * Get the page name from the datalayer or Omniture
 */
export function getPageName() {
    let pageName = 'undefined pageName';
    try {
        if (isDataLayerAvailable()) {
            pageName = getDataLayerVariable('page.NomPage');
        } else {
            /* eslint-disable-next-line */
            pageName = RadioCanada.Stats.Omniture.Code.s.pageName;
        }
    } catch (e) {
        logError(`Datalayer error => ${e.message}`, e);
    }
    return encodeURI(pageName);
}

/**
 * Get a variable by name in the datalaye
 * @param {string} name - Name of the variable to look for
 */
export function getDataLayerVariable(name) {
    return isDataLayerAvailable() ? window.dataLayerHelper.get(name) : '';
}

/**
 * Get meta data set in the page metas
 * @param {string} name - Name of the metas to get
 */
export function metaPage(name) {

    let metaTagToDataLayer_LinkTable = {
        'rc.idMedia': 'page.IdMedia',
        'rc.section': 'page.Section',
        'rc.groupeSection': 'page.GroupeSection',
        'rc.domaine': 'page.Domaine',
        'rc.formatApplication': 'page.FormatApplication',
        'rc.application': 'page.Application'
    };

    if (isDataLayerAvailable()) {
        var dataLayerVariableName = metaTagToDataLayer_LinkTable[name];
        return getDataLayerVariable(dataLayerVariableName);
    }

    var metas = document.getElementsByTagName('meta');
    if (!metas) return '';
    for (var i = 0; i < metas.length;i++) {
        if (metas[i].getAttribute('name') === name) return metas[i].getAttribute('content');
    }
    return '';
}