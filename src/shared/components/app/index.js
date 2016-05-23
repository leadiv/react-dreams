import React, { Component, PropTypes } from 'react';

// Styles are only for the browser.
if (process.env.BROWSER) {
    require('./app.scss');
}

class App extends Component {
    render () {
        return (<span className="app">The App content starts here.</span>);
    } 
}

export default App;