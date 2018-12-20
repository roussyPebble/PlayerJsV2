const path = require('path');
const versionManager = require('./version.config');

module.exports = async (env) => {
    var folder = env === 'development' ? 'dev' : 'prod';
    var version = await versionManager.getVersion('react', folder);
    var entryPath = './playerJs/index.js';
    var versionPath = `${folder}/${version}/react/dist`;
    var latestPath = `${folder}/latest/react/dist`;
    
    var entries = {};
    entries[versionPath] = entryPath;
    entries[latestPath] = entryPath;
    
    return {
        entry: entries,
        output: {
            path: path.resolve("build"),
            filename: `[name].js`,
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /\.(pdf|jpg|png|gif|svg|ico)$/,
                    use: [
                        {
                            loader: 'url-loader'
                        },
                    ]
                }
            ]
        }
    }
};
