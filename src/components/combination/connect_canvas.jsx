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
                style={{
                    width: this.props.canvasWidth / window.devicePixelRatio + 'px',
                    height: this.props.canvasHeight / window.devicePixelRatio + 'px'
                }}
                ref='context'
                width={this.props.canvasWidth}
                height={this.props.canvasHeight}
            ></canvas>
        )
    }
}

export default ConnectCanvas