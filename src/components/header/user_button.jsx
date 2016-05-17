import React, { Component } from 'react'

let UserButton = React.createClass({
    render () {
        let loginInf = this.props.loginInf

        let UserInput

        if (loginInf && loginInf.user_id) {
            UserInput = UserButtonTypeTwo
        } else {
            UserInput = UserButtonComponent
        }

        return (
            <UserInput 
                {...this.props}
            />
        )
    }
})

class UserButtonComponent extends Component {
    render () {
        return (
            <li
                style={{
                    float: 'left',
                    marginLeft: this.props.marginLeft
                }}
            >
                <a className={this.props.val === '注册' ? 'reg' : 'login'}
                    onClick={this.props.handleClick}
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
                    href={this.props.href || '#'}
                >
                    {this.props.val}
                </a>
            </li>
        )
    }
}

let UserButtonTypeTwo = React.createClass({
    handleClick () {
        if (this.props.val === '登录') { 
            
        }
    },
    render () {
        return (
            <UserButtonTypeTwoComponent 
                handleClick={this.handleClick}
                {...this.props}
            />
        )
    }
})

class UserButtonTypeTwoComponent extends Component {
    render () {

        let val = this.props.val

        return (
            <UserButtonComponent 
                {...this.props}
                val={val === '注册' ? this.props.loginInf.user_name : '登出'}
            />
        )
    }
}


export default UserButton