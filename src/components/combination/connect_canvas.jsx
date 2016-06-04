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
                onClick={this.props.handleRemoveLine}
                style={{
                    width: this.props.canvasWidth / window.devicePixelRatio + 'px',
                    height: this.props.canvasHeight / window.devicePixelRatio + 'px',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                }}
                ref='context'
                width={this.props.canvasWidth}
                height={this.props.canvasHeight}
            ></canvas>
        )
    }
}

export default ConnectCanvas