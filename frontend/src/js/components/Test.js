import React, { Component } from "react";

class Test extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>Testing that react is working: {this.props.isWorking}</h1>
        );
    }
}

export default Test;