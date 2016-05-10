import React, { Component } from 'react'
import { moveAnimation } from '../../actions/header_action'

let Nav = React.createClass({
    handleMouseOver () {
        this.props.dispatch(moveAnimation(220 + this.props.keys * 70 + 25 + 'px'));
    },
    render () {
        return (
            <NavComponent
                handleMouseOver={this.handleMouseOver}
                {...this.props}
             />
        )
    }
})


class NavComponent extends Component {
    render () {
        return (
            <li
                onMouseOver={this.props.handleMouseOver}
                style={{
                    float: 'left',
                }}
            >
                <a 
                    style={{
                        display: 'block',             
                        width: '70px',
                        height: '60px',
                        textAlign: 'center',
                        lineHeight: '60px',
                        color: '#fff'
                    }}
                    href={this.props.href}
                >
                    {this.props.val}
                </a>
            </li>
        )
    }
}

export default Nav