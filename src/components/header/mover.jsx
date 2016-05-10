import React, { Component } from 'react'

let Mover = React.createClass({
    render () {
        return (
            <MoverComponent 
                {...this.props}
            />
        )
    }
})

class MoverComponent extends Component {
    render () {
        return (
            <li
                style={{
                    width: '20px',
                    height: '4px',
                    background: '#fff',
                    position: 'absolute',
                    top: '44px',
                    transition: 'left .4s ease-out',
                    left: this.props.move,
                    borderRadius: '10px'
                }}
            >
            </li>
        )
    }
}

export default Mover