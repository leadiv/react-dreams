import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '../shared/components/app';

// Create root mounting node
const mountNode = document.getElementById('mount');

// Client-side rendering
render(<AppContainer><App /></AppContainer>, mountNode);

if (module.hot) {
    module.hot.accept('../shared/components/app', () => {
        const NextApp = require('../shared/components/app').default;
        
        render(<AppContainer><NextApp /></AppContainer>, mountNode);
    });
}