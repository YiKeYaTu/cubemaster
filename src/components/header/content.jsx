import React, { Component } from 'react'
import Nav from './nav.jsx'
import Mover from './mover.jsx'
import UserButton from './user_button.jsx'
import { moveAnimation } from '../../actions/header_action'

let navList = [{
    val: '主页',
    href: './index_index.html'
}, {
    val: '工具',
    href: ''
}, {
    val: '算法',
    href: ''
}, {
    val: '数据',
    href: './data_index.html'
}, {
    val: '组合',
    href: './combination_index.html'
}, {
    val: '可视化',
    href: ''
}]

let userButton = [{
    val: '注册',
    href: 'http://172.22.146.20/CubeApiStore/html/signUp.html',
    type: 0,
    width: '120px',
    height: '40px',
    background: '#333',
    color: 'rgb(240, 240, 240)',
    marginLeft: '300px',
    marginTop: '10px'
}, {
    val: '登录',
    href: '',
    type: 1,
    color: 'rgb(240, 240, 240)',
    width: '80px',
    height: '38px',
    marginLeft: '10px',
    border: '1px solid #fff',
    marginTop: '10px'
}]

let Header = React.createClass({
    handleMouseOut () {
        this.props.dispatch(moveAnimation(this.props.INIT_LEFT));
    },
    render () {
        return (
            <HeaderComponent 
                handleMouseOut={this.handleMouseOut}
                {...this.props}
            />
        );
    }
})

class HeaderComponent extends Component {
    render () {
        return (
            <section
                style={{
                    width: '100%',
                    background: 'rgb(84, 182, 231)',
                }}
            >
                <header 
                    onMouseOut={this.props.handleMouseOut}
                    style={{
                        width: '1160px',
                        margin: '0 auto',
                    }}
                >
                    <ul 
                        style={{
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <li 
                            style={{
                                color: '#f1f1f1',
                                textAlign: 'center',
                                width: '200px',
                                height: '60px',
                                lineHeight: '60px',
                                fontSize: '30px',
                                fontWeight: 'bold',
                                float: 'left',
                                marginRight: '20px'
                            }}
                        >
                            Cube Master
                        </li>
                        {navList.map(function (item, index) {
                            return (
                                <Nav 
                                    {...this.props}
                                    keys={index} 
                                    key={index} 
                                    {...item}
                                />
                            )
                        }.bind(this))}
                        {userButton.map(function (item, index) {
                            return (
                                <UserButton
                                    loginInf={this.props.loginInf}
                                    key={index}
                                    keys={index + navList.length} 
                                    {...item}
                                    dispatch={this.props.dispatch}
                                />
                            )
                        }.bind(this))}
                        <Mover move={this.props.move} />
                    </ul>
                </header>
            </section>
        )
    }
}
export default Header

