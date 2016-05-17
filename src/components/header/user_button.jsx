import React, { Component } from 'react'
import { getLoginInf } from '../../actions/header_action';

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
                loginInf={loginInf}
                {...this.props}
            />
        )
    }
})

class UserButtonComponent extends Component {
    render () {

        let href = this.props.href,
            loginInf = this.props.loginInf

        if (loginInf && loginInf.redirect && this.props.type === 1) {
            href = `/cubemaster/user/redirectLogin?redirect=${loginInf.redirect}`   
        }

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
                    href={href}
                >
                    {loginInf ? this.props.val : '加载中...'}
                </a>
            </li>
        )
    }
}

let UserButtonTypeTwo = React.createClass({
    handleClick () {
        if (this.props.type === 1) {
            this.props.dispatch(getLoginInf(true))
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

        let type = this.props.type

        return (
            <UserButtonComponent 
                {...this.props}
                val={type === 0 ? this.props.loginInf.user_name : '登出'}
                href='#'
            />
        )
    }
}


export default UserButton