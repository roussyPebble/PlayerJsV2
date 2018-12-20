/* global process:false */
var appEnv = process.env.NODE_ENV;

const environnement = {
    servicesUrl: {
        development: 'https://aq-services.radio-canada.ca',
        production: 'https://services.radio-canada.ca',
        preproduction: 'https://pp-services.radio-canada.ca',
        local: 'https://lcl-services.radio-canada.ca'
    },
    clientKey: {
        production: 'Client-Key 773aea60-0e80-41bb-9c7f-e6d7c3ad17fb',
        development: 'Client-Key c0a5fb4e-ea30-43f5-a340-c145c4f05ea5'
    }
};

const appConfig = {
    environnement: appEnv,
    metaMedia: {
        url: `${environnement.servicesUrl[appEnv]}/media/meta/v1/index.ashx`,
        clientKey: environnement.clientKey[appEnv]
    },
    validatonMedia: {
        url: `${environnement.servicesUrl[appEnv]}/media/validation/v2/?`,
        clientKey: environnement.clientKey[appEnv]
    },
    neuro: {
        url: `${environnement.servicesUrl.production}/neuro/v1`,
        clientKey: 'Client-Key 55e07958-9508-4084-b447-fff9b11a8b82'
    }
};

export default appConfig;
