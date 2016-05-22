import React from 'react';
import { render } from 'react-dom';

import App from '../shared/components/app';

// Create root mounting node
const mountNode = document.getElementById('mount');

// Client-side rendering
render(<App />, mountNode);

if (module.hot) {
    module.hot.accept('../shared/components/app', () => {
        const NextApp = require('../shared/components/app').default;
        
        render(<NextApp />, mountNode);
    });
}