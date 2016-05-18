import React, { Component } from 'react'
let MoreButton = React.createClass({

    handleClick () {
        this.props.handleShowMore(this.props.type, this.props.index)
    },

    render () {
        return (
            <MoreButtonComponent 
                {...this.props}
                handleClick={this.handleClick}
            />
        )
    }
})

class MoreButtonComponent extends Component {
    render () {

        let parameters = this.props.serverData.parameters,
            type = this.props.type

        return (
            <span
                className='more'
                onClick={this.props.handleClick}
                style={{
                    width: '16px',
                    height: '16px',
                    transition: 'all .4s',
                    lineHeight: '8px',
                    fontSize: '20px',
                    borderRadius: '100%',
                    border: `2px solid ${this.props.showParameter ? 'red' : '#000'}`,
                    display: 'block',
                    float: 'left',
                    textAlign: 'center',
                    color: this.props.showParameter ? 'red' : '#000',
                    display: (type == 1 && parameters && parameters.length > 0) ? 'block' : 'none',
                    margin: '10px 10px'
                }}
            >
                ..
            </span>
        )
    }
}

export default MoreButton