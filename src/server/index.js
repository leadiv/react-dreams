import { isDevelopment } from './utilities/env';
const express = require('express');
const app = express();
const path = require('path');

if (isDevelopment) {
    const chokidar = require('chokidar');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../../webpack/webpack.config.dev.js');
    const webpack = require('webpack');
    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    }));

    app.use(webpackHotMiddleware(compiler, {
        log: console.log
    }));
    // Do "hot-reloading" of express stuff on the server
    // Throw away cached modules and re-require next time
    // Ensure there's no important state in there!
    const watcher = chokidar.watch(path.join(__dirname, '../../dist'));

    watcher.on('ready', function() {
        watcher.on('all', function() {
            console.log("Clearing server module cache from server");
            Object.keys(require.cache).forEach(function(id) {
                if (/[\/\\](server)[\/\\]/.test(id)) {
                    console.log(`Deleting cache key ${id}`);
                    delete require.cache[id];
                }
            });
        });
    });

    // Do "hot-reloading" of react stuff on the server
    // Throw away the cached client modules and let them be re-required next time
    compiler.plugin('done', function() {
        console.log("Clearing shared and client module cache from server");
        Object.keys(require.cache).forEach(function(id) {
            if (/[\/\\](shared|client)[\/\\]/.test(id)) {
                console.log(`Deleting cache key ${id}`);
                delete require.cache[id];
            }
        });
    });
}


app.use(express.static(path.join(__dirname, '../../dist/public')));

/**
 * The route's call back needs to be structured this was so as to force the
 * require to be reinspected when calling the route. If it isn't reinspected
 * then the require.cache keys that are deleted below are not picked up.
 *
 * app.js returns a function that takes a path and callback. The closure
 * created is used to send the generated content as the response from the
 * server.
 */
app.get('*', (request, response, next) => {
    require('./app.js')(request.path, (err, page) => {
        if (err) return next(err);

        response.send(page);
    });
});


app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`Example app listening on ip ${process.env.IP} with port ${process.env.PORT}.`);
});
