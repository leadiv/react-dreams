import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import ServerChrome from '../shared/components/server-chrome';
import App from '../shared/components/app';

const renderApp = (path, callback) => {
    callback(null, `<!DOCTYPE html>${renderToStaticMarkup(<ServerChrome><App /></ServerChrome>)}`);
};

module.exports = renderApp;