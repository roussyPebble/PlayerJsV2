const AppVersion = require('../playerJs/config/version').version;
const Fs = require('fs');

var createJsonVersion = function(ver) {
    var outputJson = `{"version":"${ver}"}`;
    return new Promise((resolve, reject) => {
        var path = `../.version`;
        Fs.writeFile(path, outputJson, (err) => {
            if (err) throw err;
            console.log(`JSON ${outputJson} is created!`);
        });
    });
};
createJsonVersion(AppVersion);
