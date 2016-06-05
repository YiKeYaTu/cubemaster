import React, { Component } from 'react'

let Footer = React.createClass({
    render () {
        return (
            <FooterComponent/>
        )   
    }
})

class FooterComponent extends Component {
    render () {
        return (
            <footer
                style={{
                    width: '100%',
                    background: '#333',
                    overflow: 'hidden',
                    marginTop: '50px',
                    paddingTop: '30px'
                }}
            >
                <ul
                    style={{
                        width: '268px',
                        margin: '0 auto',
                        overflow: 'hidden',
                        padding: '10px 0px',
                        borderBottom: '1px solid #f5f5f5'
                    }}
                >
                    <List 
                        val='关于我们'
                    />
                    <List
                        margin='0 20px' 
                        val='联系我们'
                    />
                    <List 
                        val='加入我们'
                    />
                </ul>
                <h2
                    style={{
                        background: '#333',
                        textAlign: 'center',
                        color: '#f5f5f5',
                        fontSize: '12px',
                        fontWeight: 'normal',
                        padding: '10px 0px'
                    }}
                >
                    Copyright © 2016 Suowen Inc. All Rights Reserved
                </h2>
            </footer>
        )
    }
}

class List extends Component {
    render () {
        return (
            <li
                style={{
                    width: '76px',
                    textAlign: 'center',
                    float: 'left',
                    color: '#f5f5f5',
                    margin: this.props.margin ? this.props.margin : '',
                    fontSize: '14px'
                }}
            >
                <div
                    style={{
                        width: '36px',
                        height: '36px',
                        margin: '0 auto',
                        background: '#f5f5f5',
                        backgroundImage: this.props.backgroundImage,
                        borderRadius: '100%',
                        marginBottom: '6px',
                        textAlign: 'center',
                        color: '#333',
                        lineHeight: '36px',
                        fontSize: '20px'
                    }}
                >
                    C
                </div>
                <p
                    style={{
                        width: '100%',
                        height: '20px',
                        lineHeight: '20px',
                    }}
                >
                    {this.props.val}
                </p>
            </li>
        )
    }
}

export default Footer