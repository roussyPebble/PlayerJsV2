const versionManager = require('./version.config');
const path = require('path');

module.exports = async (env) => {
    
    var folder = env === 'development' ? 'dev' : 'prod';
    var version = await versionManager.getVersion('js', folder);
    // var entryPath = "./examples/js/js/playerjs.js"
    var entryPath = "./jsIntegration/index.js";
    var versionPath = `${folder}/${version}/js/dist`;
    var latestPath = `${folder}/latest/js/dist`;
    
    var entries = {};
    entries[versionPath] = entryPath;
    entries[latestPath] = entryPath;
    
    return {
        entry: entries,
        output: {
            path: path.resolve("build"),
            filename: `[name].js`,
            library: 'RadioCanadaPlayer'
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
                    test: /\.(pdf|jpg|png|gif|ico)$/,
                    use: [
                        {
                            loader: 'url-loader'
                        },
                    ]
                },
                {
                    test: /\.svg$/,
                    loader: 'svg-sprite-loader'
                }
            ]
        }
    };
}
