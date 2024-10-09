// @ts-nocheck
import React, { Component } from 'react';
import MapComponent from './map';

class ClientMap extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // console.log('props')
    }

    render () {
        return (
            <MapComponent onSelect={this.props.onSelect} markers={this.props.markers} />
        )
    }
}

export default ClientMap