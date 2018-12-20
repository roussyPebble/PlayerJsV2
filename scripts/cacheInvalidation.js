const Axios = require('axios');
const Env = process.argv[2];
const Prefix = require('./prefix').prefix(Env);
const serverUrlInvalidateCache = `${Prefix}services.radio-canada.ca/media/player/InvalidateCache`;

init();

function init() {
    Axios.get(serverUrlInvalidateCache).then((response) => {
        console.log('Cache is invalidated => ', response.data);
    }).catch((error) => {
        console.log('An error is occured durring cache invalidation => ', error);
    });
}

