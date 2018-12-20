const AppVersion = require('../playerJs/config/version').version;
const Fs = require('fs');

exports.getVersion = async function(type, env) {
    var versionExist = env === 'dev' ? false : await checkVersion(type, env);
    if (versionExist) {
        throw new Error(`This version already exist => ${AppVersion}`);
    } else {
        return AppVersion;
    }
};

var checkVersion = function(type, env) {
    return new Promise((resolve, reject) => {
        var path = `./build/${env}/${AppVersion}/${type}`;
        Fs.open(path,
            'r',
            (error, result) => {
                resolve(!error);
            });
    });
};

