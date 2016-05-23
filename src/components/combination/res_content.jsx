import React, { Component } from 'react'
import { controlResWapper } from '../../actions/combination_action';

let ResContent = React.createClass({
    handleWapperClick () {
        this.props.dispatch(controlResWapper())
    },
    render () {
        return (
            <ResContentComponent 
                {...this.props}
                handleWapperClick={this.handleWapperClick}
            />
        )
    }
})

class ResContentComponent extends Component {
    render () {
        return (
            <div
                onClick={this.props.handleWapperClick}
                style={{
                    cursor: 'pointer',
                    width: '100%',
                    height: '100%',
                    transition: 'transform .4s',
                    transform: this.props.resContentWapperShow ? 'scale(1, 1)' : 'scale(0, 0)',
                    position: 'fixed',
                    zIndex: '1',
                    top: 0,
                    let: 0,
                    background: 'rgba(0, 0, 0, 0.5)'
                }}
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    style={{
                        width: '330px',
                        height: '330px',
                        padding: '10px 10px',
                        position: 'fixed',
                        background: 'rgb(84, 182, 231)',
                        borderRadius: '20px',
                        position: 'relative',
                        cursor: 'auto',
                        left: '50%',
                        top: '50%',
                        overflowY: 'scroll',
                        margin: '-175px -175px'
                    }}
                >
                    <ResContentShowListComponent  
                        {...this.props}
                    />
                    <div
                        onClick={this.props.handleWapperClick}
                        style={{
                            width: '20px',
                            height: '20px',
                            fontSize: '30px',
                            position: 'absolute',
                            right: '10px',
                            top: '8px',
                            border: '2px solid #f5f5f5',
                            transform: 'rotate(45deg)',
                            borderRadius: '100%',
                            lineHeight: '20px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            color: '#f5f5f5'
                        }}
                    >
                        +
                    </div>
                </div>
            </div>
        )
    }
}

class ResContentShowListComponent extends Component {
    render () {
        return (
            <ul
                style={{
                    width: '100%',
                    color: '#f5f5f5'
                }}
            >
                <ListNameComponent     
                    {...this.props}
                />
                <ListContentComponent     
                    {...this.props}
                />
            </ul>
        )
    }
}

class ListNameComponent extends Component {
    render () {
        return (
            <li
                style={{
                    width: '30%',
                    float: 'left'
                }}
            >
                <p
                    style={{
                        width: '100%',
                        height: '30px',
                        lineHeight: '32px',
                        background: `url(${require('../../images/list.png')}) no-repeat 0px center`,
                        backgroundSize: '16px 16px'
                    }}
                >
                    <span
                        style={{
                            marginLeft: '26px'
                        }}
                    >
                        运算条目
                    </span>
                </p>
                <LisetComponent 
                    {...this.props}
                    type='0'
                />
            </li>
        )
    }
}

class ListContentComponent extends Component {
    render () {
        return (
            <li
                style={{
                    width: '65%',
                    paddingLeft: '5%',
                    float: 'left'
                }}
            >
                <p
                    style={{
                        width: '100%',
                        height: '30px',
                        lineHeight: '32px',
                        background: `url(${require('../../images/result.png')}) no-repeat 0px center`,
                        backgroundSize: '16px 16px'
                    }}
                >
                    <span
                        style={{
                            marginLeft: '26px'
                        }}
                    >运算结果</span>
                </p>
                <LisetComponent
                    {...this.props}
                    type='1'
                />
            </li>
        )
    }
}

class LisetComponent extends Component {
    render () {

        let res = this.props.resContentList,
            type = this.props.type

        return (
            <ul
                style={{
                    width: '100%'
                }}
            >
                {
                    res && res.map((item, index) => {
                        return (
                            <li
                                style={{
                                    width: '100%',
                                    height: '30px',
                                    lineHeight: '30px',
                                    paddingTop: index === 0 ? '10px' : '0px',
                                    borderTop: index === 0 ? '2px solid #f5f5f5' : ''
                                }}
                            >
                                {type == 0 ? index : item.content}
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}

export default ResContent