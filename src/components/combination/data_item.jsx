import React, { Component } from 'react'


let DataItem = React.createClass({
    handleMouseOver () {
        this.props.handleMouseOver(this.props.type, this.props.index)
    },
    handleMouseOut () {
        this.props.handleMouseOut(this.props.type, this.props.index)
    },
    handleClick () {
        this.props.handleClick(this.props.type, this.props.index)
    },
    render () {
        return (
            <DataItemComponent
                {...this.props}
                background={this.props.background}
                handleClick={this.handleClick}
                handleMouseOut={this.handleMouseOut}
                handleMouseOver={this.handleMouseOver}
             />
        )
    }
})

class DataItemComponent extends Component {
    render () {
        let index = this.props.index,
            dataInf = this.props.dataInf
        return (
            <div
                onMouseOver={this.props.handleMouseOver}
                onMouseOut={this.props.handleMouseOut}
                onClick={this.props.handleClick}
                style={{
                    opacity: this.props.itemOpacity,
                    width: '100px',
                    height: '30px',
                    float: 'left',
                    marginLeft: this.props.index % 2 === 0 ? '0px' : '16px',
                    marginBottom: '10px',
                    background: dataInf[index].background,
                    color: '#fff',
                    position: 'relative',
                    textAlign: 'center',
                    lineHeight: '30px',
                    cursor: 'pointer',
                    transition: 'all .4s',
                    overflow: 'hidden',
                    borderRadius: this.props.type == '0' ? '20px' : '2px',
                }}
            >
                {this.props.value}
                <span
                    ref='addInf'
                    style={{
                        display: 'block',
                        width: '60px',
                        height: '30px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        position: 'absolute',
                        right: dataInf[index].right,
                        top: '0px',
                        transition: 'all .4s',
                        color: 'rgb(84, 182, 231)'
                    }}
                >
                    {dataInf[index].buttonInnerHTML}
                </span>
            </div>
        )
    }
}

export default DataItem