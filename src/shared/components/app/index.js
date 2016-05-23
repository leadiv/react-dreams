import React, { Component, PropTypes } from 'react';

// Styles are only for the browser.
if (process.env.BROWSER) {
    require('./app.scss');
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState({
            count: this.state.count - 1
        });
    }

    componentDidMount() {
        setInterval(this.increment, 1000);
    }

    render () {
        return (<span className="app">The App has started counting here: <span className="count">{this.state.count}</span>. And now it keeps state.</span>);
    } 
}

export default App;