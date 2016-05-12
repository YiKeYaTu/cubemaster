import React, { Component } from 'react'
let DeleteButton = React.createClass({
    render () {
        return (
            <DeleteButtonComponent 
                {...this.props}
            />
        )
    }
})

class DeleteButtonComponent extends Component {
    render () {
        return (
            <span
                onClick={this.props.handleRemoveButtonClick}
                className='delete'
                style={{
                    width: '16px',
                    transition: 'all .4s',
                    height: '16px',
                    lineHeight: '16px',
                    fontSize: '20px',
                    borderRadius: '100%',
                    border: '2px solid #000',
                    display: 'block',
                    float: 'left',
                    textAlign: 'center',
                    color: '#000',
                    transform: 'rotate(45deg)',
                    margin: '10px 10px'
                }}
            >
                +
            </span>
        )
    }
}

export default DeleteButton
