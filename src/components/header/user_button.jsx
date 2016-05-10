import React, { Component } from 'react'

let UserButton = React.createClass({
    render () {
        return (
            <UserButtonComponent 
                {...this.props}
            />
        )
    }
})

class UserButtonComponent extends Component {
    render () {
        return (
            <li
                onMouseOver={function () {}}
                style={{
                    float: 'left',
                    marginLeft: this.props.marginLeft
                }}
            >
                <a className={this.props.val === '注册' ? 'reg' : 'login'}
                    style={{
                        display: 'block',          
                        marginTop: this.props.marginTop,   
                        width: this.props.width,
                        border: this.props.border,
                        borderRadius: '4px',
                        color: this.props.color,
                        background: this.props.background || '',
                        height: this.props.height,
                        textAlign: 'center',
                        lineHeight: this.props.height,
                        fontSize: '14px',
                        transition: 'all .4s'
                    }}
                    href={this.props.href}
                >
                    {this.props.val}
                </a>
            </li>
        )
    }
}

export default UserButton