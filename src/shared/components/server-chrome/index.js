import React, { Component, PropTypes } from 'react';

const propTypes = {
    children: PropTypes.node
};

class ServerChrome extends Component {
    render () {
        return (
            <html>
                <head>
                    <title>React Dreams</title>
                    <link rel="stylesheet" href="css/index.bundle.css" />
                </head>
                <body>
                    <div id="mount">
                       {this.props.children} 
                    </div>
                    <script src="js/index.bundle.js"></script>
                </body>
            </html> 
        );
    } 
}

ServerChrome.propTypes = propTypes;

export default ServerChrome;