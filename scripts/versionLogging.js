const AppVersion = require('./playerJs/config/version').version;
const Axios = require('axios');
const Env = process.argv[2];
const Prefix = require('./prefix').prefix(Env);
const serverUrlLogging = `${Prefix}services.radio-canada.ca/media/player/VersionLogging?version=${AppVersion}`;

init();

function init() {
    Axios.get(serverUrlLogging).then((response) => {
        console.log(`Version is logged => ${AppVersion}`, response.data);
    }).catch((error) => {
        console.log('An error is occured durring version logging => ', error);
    });
}
