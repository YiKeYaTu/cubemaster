import React, { Component } from 'react'
let MoreButton = React.createClass({
    render () {
        return (
            <MoreButtonComponent 
                {...this.props}
            />
        )
    }
})

class MoreButtonComponent extends Component {
    render () {
        return (
            <span
                className='more'
                style={{
                    width: '16px',
                    height: '16px',
                    transition: 'all .4s',
                    lineHeight: '8px',
                    fontSize: '20px',
                    borderRadius: '100%',
                    border: '2px solid #fff',
                    display: 'block',
                    float: 'left',
                    textAlign: 'center',
                    color: '#fff',
                    margin: '10px 10px'
                }}
            >
                ..
            </span>
        )
    }
}

export default MoreButton