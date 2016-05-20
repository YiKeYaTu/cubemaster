import React, { Component } from 'react'
import CombinationElement from './combination_element.jsx'
import ConnectCanvas from './connect_canvas.jsx'
import CombinationRes from './combination_res.jsx'
import CombinationStart from './combination_start.jsx'
import Draw from '../../refs/draw'
import getOffset from '../../refs/getOffset'

let Combination = React.createClass({
    canvasWidth: 780 * window.devicePixelRatio,
    canvasHeight: 780 *  window.devicePixelRatio,
    disTop: 52,
    disLeft: 98,
    outerPadding: 10,
    drawContext: null,
    focusParent: null,
    lastDrawIsFocuse: false,
    itemMouseMove (ev) {

        const ACTIVE_EL = this.props.activeEl

        const offset = this.getContainerffset()

        if (ACTIVE_EL) {

            this.props.handleItemMouseMove(
                ev.pageX - offset.x - ACTIVE_EL.downPos.x,
                ev.pageY - offset.y - ACTIVE_EL.downPos.y
            )
        }
    },
    getContainerffset () {
        return getOffset(this.refs.component.refs.content)
    },
    getContext () {
        return this.refs.component.refs.canvas.refs.canvasContent.refs.context.getContext('2d')
    },
    getCanvas () {
        return this.refs.component.refs.canvas.refs.canvasContent.refs.context
    },
    componentDidMount () {
        this.drawContext = new Draw(this.getContext(), {
            lineWidth: 2,
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
        let inf = this.drawContext.getFocusLineInf(
            ev.pageX - pos.x,
            ev.pageY - pos.y
        )

        let id = inf && inf.id,
            lineArr = inf && inf.lineArr

        if (id && lineArr) {

            this.lastDrawIsFocuse = true

            let id1 = id.split('&')[0]

            this.focusParent = {
                type: id1.split('.')[0],
                index: id1.split('.')[1],
            }
            this.drawContext.drawWithColor(lineArr, 'red')
        } else {

            if (this.lastDrawIsFocuse) {
                this.lastDrawIsFocuse = false
                this.drawContext.reDraw(this.props.connectIndex)
            }

            this.focusParent = null
        }   

    },
    handleMouseMove (ev, id) {
        this.itemMouseMove(ev)
        this.drawLineMouseMove(ev, id)
        this.drawDeleteLineMouseMove(ev)
    },
    handleRemoveLine () {

        let focusParent = this.focusParent

        if (focusParent) {
            this.props.handleRemoveLine(
                focusParent.type, 
                focusParent.index
            )
        }

    },
    render () {
        return (
            <CombinationComponent
                ref='component' 
                {...this.props} 
                disTop={this.disTop}
                disLeft={this.disLeft}
                outerPadding={this.outerPadding}
                getContainerffset={this.getContainerffset}
                canvasWidth={this.canvasWidth}
                canvasHeight={this.canvasHeight}
                handleMouseMove={this.handleMouseMove}
                outerPadding={this.outerPadding}
                handleRemoveLine={this.handleRemoveLine}
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
                    <CombinationRes 
                        inf={this.props.res}
                        disTop={this.props.disTop}
                        disLeft={this.props.disLeft}
                        outerPadding={this.props.outerPadding}
                        getContainerffset={this.props.getContainerffset}
                        handleConnectButtonClick={this.props.handleConnectButtonClick}
                    />
                    <CombinationStart
                        connectIndex={this.props.connectIndex}
                        dispatch={this.props.dispatch}
                    />
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



export default Combination


