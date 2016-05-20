import React, { Component } from 'react'
import DeleteButton from './delete.jsx'
import MoreButton from './more.jsx'
import MoreContent from './more_content.jsx'
import getOffset from '../../refs/getOffset'

let CombinationElement = React.createClass({
    handleClick (e) {
        e.stopPropagation()
        this.props.handleRemoveButtonClick(this.props.type, this.props.index)
    },
    handleMouseDown (e) {
        let offset = getOffset(e.currentTarget)

        this.props.handleItemMouseDown(this.props.type, this.props.index, {
            x: e.pageX - offset.x,
            y: e.pageY - offset.y
        })
    },
    handleConnectClick (e) {
        e.stopPropagation()
        let buttonOuter = this.refs.CombinationElementComponent.refs.buttonOuter
        return {
            x: parseFloat(buttonOuter.style.left),
            y: parseFloat(buttonOuter.style.top),
        }
    },
    render () {
        return (
            <CombinationElementComponent
                ref='CombinationElementComponent'
                {...this.props}
                handleRemoveButtonClick={this.handleClick}
                handleConnectClick={this.handleConnectClick}
                handleMouseDown={this.handleMouseDown}
                handleStopPropagation={this.handleStopPropagation}
            />
        )
    }
})

class CombinationElementComponent extends Component {  
    render () {
        let index = this.props.index,
            type = this.props.type
        return (
            <div
                onMouseDown={this.props.handleMouseDown}
                ref='buttonOuter'
                className='combination-element'
                style={{
                    width: '80px',
                    height: '80px',
                    boxShadow: '#333 1px 1px 10px',
                    padding: `${this.props.outerPadding}px ${this.props.outerPadding}px`,
                    transition: 'transform .4s, box-shadow .4s',
                    // transform: this.props.itemHasAdd ? 'scale(1, 1)' : 'scale(0, 0)',
                    opacity: .8,
                    position: 'absolute',
                    borderRadius: type == 1 ? '20px' : '100%',
                    left: this.props.itemLeft,
                    top: this.props.itemTop,
                    background: this.props.background,
                    cursor: 'pointer'
                }}
            >
                <p
                    style={{
                        width: '80%',
                        margin: '0 auto',
                        textAlign: 'center',
                        color: '#000',
                        height: '40px',
                        lineHeight: '40px',
                        fontSize: '14px',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        borderBottom: '2px solid #000',
                    }}
                >
                    {this.props.value}
                </p>
                <DeleteButton 
                    {...this.props}
                />
                <MoreButton 
                    {...this.props}
                />
                <MoreContent 
                    {...this.props}
                />
                <InInterface 
                    buttonType={0}
                    type={0}
                    handleConnectClick={this.props.handleConnectClick}
                    {...this.props}
                />
                <InInterface 
                    buttonType={1}
                    type={1}
                    handleConnectClick={this.props.handleConnectClick}
                    {...this.props}
                />
            </div>
        )
    }
}

let InInterface = React.createClass({
    handleConnectClick (e) {
        let pos = this.props.handleConnectClick(e)
        
        this.props.handleConnectButtonClick(
            this.props.type,
            this.props.index,
            this.props.buttonType,
            pos
        )
    },
    handleMouseDown (e) {
        e.stopPropagation()
    },
    // 次组件在初始化一次后除非接口变化便不再render
    shouldComponentUpdate (nextProps, nextState) {
        if (!nextProps.connectInterface) {
            return false
        } else {
            return true
        }
    },
    render () {
        return (
            <InInterfaceComponent
                {...this.props}
                handleMouseDown={this.handleMouseDown}
                handleConnectClick={this.handleConnectClick}
                buttonTypeLeft={this.buttonTypeLeft}
                interfaceTop={this.interfaceTop}
            />
        )
    }
})

class InInterfaceComponent extends Component {
    render () {
        let buttonType = this.props.buttonType,
            connectInterface = this.props.connectInterface
        let background
        if (connectInterface) {
            if (buttonType === 0 && !connectInterface.inInterface) {
                background = '#000'
            } 
            if (buttonType === 1 && !connectInterface.outInterface) {
                background = '#000'
            }
        }
        return (
            <div
                onClick={this.props.handleConnectClick}
                onMouseDown={this.props.handleMouseDown}
                className='interface'
                style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid #000',
                    position: 'absolute',
                    top: '50%',
                    marginTop: '-7px',
                    display: this.props.buttonType == 0 && this.props.type == 0 ? 'none' : 'block',
                    left: this.props.buttonType == 1 ? '82px' : '0px',
                    color: '#333',
                    textAlign: 'center',
                    lineHeight: '14px',
                    borderRadius: '100%'
                }}
            >
                <div
                    className='interface-bg'
                    style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '100%',
                        margin: '2px auto',
                        background: background,
                    }}
                >
                </div>
            </div>
        )
    }
}

export default CombinationElement
