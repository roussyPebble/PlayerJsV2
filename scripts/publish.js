const AppVersion = require('../playerJs/config/version').version;
const Fs = require('fs');
const Axios = require('axios');
const Env = process.argv[2];
const serverHost = `http://${Env}-services.radio-canada.ca/media/player/publish`;

init();

function init() {
    console.log(`Version=${AppVersion}, Env=${Env}`);
    let player = getFiles(`./build/dev/latest`);
    sendPlayers(player);
}
function getFiles(basePath) {
    console.log(`source path=${basePath}`);
    return {
        version: AppVersion,
        //reactPlayer:'test2',
        //jsPlayer:'test1'
        reactPlayer: getFile(`${basePath}/react/dist.js`),
        jsPlayer: getFile(`${basePath}/js/dist.js`)
    };
}
function getFile(path) {
    return Fs.readFileSync(path, 'utf-8');
}
function getFileContent(version, env) {
    let paths = Fs.readdirSync(`./build/${env}/latest`);
    let files = [];

    paths.forEach((item) => {
        let path = `./build/${env}/latest/${item}/dist.js`;
        console.log(`path=${path}`);
        let fileContent = Fs.readFileSync(path, 'utf-8');
        let result = {
            type: item,
            file: fileContent
        };
        files.push(result);
    });
    return files;
}

function sendPlayers(player) {
    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding':'gzip, compress'
        },
        maxContentLength: 52428890
    };
    let url = `${serverHost}`; //${Env}/${player.type}/${AppVersion}
    console.log(`url=${url}`);
    //Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    Axios({
        method:'put',
        url:url,
        data:player,
        config:config
    }).then((response) => {
            console.log('Publish to server => ', response.data);
        }).catch((error) => {
            console.log('An error is occured => ', error);
        });
}
