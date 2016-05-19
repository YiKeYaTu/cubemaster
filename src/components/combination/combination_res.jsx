import React, { Component } from 'react'
import getOffset from '../../refs/getOffset'

let CombinationRes = React.createClass({

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.inf == this.props.inf  
    },
    handleClick (e) {
        const type = '2',
            index = 0,
            buttonType = 0

        const containerOffset = this.props.getContainerffset()

        const pos = getOffset(e.target)


        this.props.handleConnectButtonClick(type, index, buttonType, {
            x: pos.x - containerOffset.x,
            y: pos.y - containerOffset.y - this.props.disTop + this.props.outerPadding
        })
    },

    render () {
        return (
            <CombinationResComponent
                inf={this.props.inf}
                handleClick={this.handleClick}
            />

        )
    }
})

class CombinationResComponent extends Component {
    render () {
        return (
            <div
                onClick={this.props.handleClick}
                style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgb(84, 182, 231)',
                    borderRadius: '100%',
                    background: '#f5f5f5',
                    position: 'absolute',
                    top: '50%',
                    right: '-20px',
                    cursor: 'pointer',
                    marginTop: '-10px'
                }}
            >
            </div>
        )
    }
}

export default CombinationRes