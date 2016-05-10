import React, { Component } from 'react'

let ConnectCanvas = React.createClass({
    render () {
        return (
            <ConnectCanvasComponent
                ref='canvasContent' 
                {...this.props}
            />
        )
    }
})

class ConnectCanvasComponent extends Component {
    
    render () {
        return (
            <canvas
                ref='context'
                width={this.props.canvasWidth}
                height={this.props.canvasHeight}
            ></canvas>
        )
    }
}

export default ConnectCanvas