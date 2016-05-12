import React, { Component } from 'react'
import DeleteButton from './delete.jsx'
import MoreButton from './more.jsx'
import ConnectCanvas from './connect_canvas.jsx'
import Draw from '../../refs/draw';

let getOffset = (context) => {
    let left, top

    left = top = 0

    while (context) {
        left += context.offsetLeft
        top += context.offsetTop
        context = context.offsetParent
    }
    
    return {
        x: left,
        y: top
    }
}

let Combination = React.createClass({
    canvasWidth: 780 * window.devicePixelRatio,
    canvasHeight: 780 *  window.devicePixelRatio,
    disTop: 52,
    disLeft: 98,
    outerPadding: 10,
    drawContext: null,
    itemMouseMove (ev) {

        const ACTIVE_EL = this.props.activeEl

        const offset = getOffset(this.refs.component.refs.content)

        if (ACTIVE_EL) {

            this.props.handleItemMouseMove(
                ev.pageX - offset.x - ACTIVE_EL.downPos.x,
                ev.pageY - offset.y - ACTIVE_EL.downPos.y
            )
        }
    },
    getContext () {
        return this.refs.component.refs.canvas.refs.canvasContent.refs.context.getContext('2d')
    },
    getCanvas () {
        return this.refs.component.refs.canvas.refs.canvasContent.refs.context
    },
    componentDidMount () {
        this.drawContext = new Draw(this.getContext(), {
            lineWidth: 4,
            lineJoin: 'round',
            strokeStyle: '#333',
            disTop: this.disTop,
            disLeft: this.disLeft,
            content: this.getCanvas(),
            scale: window.devicePixelRatio
        })
    },
    componentWillUpdate (nextProps, nextState) {
        let activeIndex = nextProps.activeIndex
        this.drawSaveContext(nextProps.connectIndex)
    },
    drawSaveContext (connectIndex) {
        this.drawContext.reDraw(connectIndex)
    },
    drawLineMouseMove (ev, id) {
        let activeIndex = this.props.activeIndex

        if (activeIndex.length == 0) return

        let pos = getOffset(this.getCanvas())

        this.drawSaveContext(this.props.connectIndex)
        this.drawContext.beginPath()
        this.drawContext.lineTo(
            activeIndex[0].pos.x + (activeIndex[0].buttonType === 1 ? this.disLeft : 0), 
            activeIndex[0].pos.y + this.disTop, 
            ev.pageX - pos.x, 
            ev.pageY - pos.y,
            activeIndex[0].buttonType
        )
    },
    drawDeleteLineMouseMove (ev) {

        let pos = getOffset(this.getCanvas())
        this.drawContext.changeColor(
            ev.pageX - pos.x,
            ev.pageY - pos.y
        )

    },
    handleMouseMove (ev, id) {
        this.itemMouseMove(ev)
        this.drawLineMouseMove(ev, id)
        this.drawDeleteLineMouseMove(ev)
    },
    render () {
        return (
            <CombinationComponent
                ref='component' 
                {...this.props}
                canvasWidth={this.canvasWidth}
                canvasHeight={this.canvasHeight}
                handleMouseMove={this.handleMouseMove}
                outerPadding={this.outerPadding}
            />
        )
    }
})

class CombinationComponent extends Component {
    render () {
        return (
            <section
                ref='content'
                onMouseMove={this.props.handleMouseMove}
                onMouseUp={this.props.handleItemMouseUp}
                onClick={this.props.handleItemOuterClearClick}
                style={{
                    width: '780px',
                    height: '600px',
                    border: '10px solid #f5f5f5',
                    background: '#f5f5f5',
                    borderRadius: '40px',
                    marginTop: '20px',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        height: '50px',
                        lineHeight: '50px',
                        width: '100px',
                        color: '#f5f5f5',
                        fontSize: '20px',
                        background: 'rgb(84, 182, 231)',
                        textAlign: 'center',
                        position: 'absolute',
                        top: '-17px',
                        left: '-42px',
                        zIndex: '1',
                        fontWeight: 'bold',
                        transform: 'rotate(-45deg)',
                    }}
                >
                    组合
                </div>
                <section
                    style={{
                        width: '100%',
                        position: 'relative',
                        height: '100%'
                    }}
                >
                    <ConnectCanvas
                        ref='canvas' 
                        {...this.props}
                    />
                    {
                        this.props.dataInf.map((item, index) => {
                            return (
                                <CombinationElement 
                                    key={index}
                                    {...item}
                                    {...this.props}
                                />
                            )
                        })
                    }
                    {
                        this.props.algorithmInf.map((item, index) => {
                            return (
                                <CombinationElement 
                                    key={index}
                                    {...item}
                                    {...this.props}
                                />
                            )
                        })
                    }
                </section>
            </section>
        )
    }
}

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
                    transform: this.props.itemHasAdd ? 'scale(1, 1)' : 'scale(0, 0)',
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
    // 次组件在初始化一次后便不再render
    shouldComponentUpdate (nextProps, nextState) {
        return false
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
                    }}
                >
                </div>
            </div>
        )
    }
}

export default Combination


