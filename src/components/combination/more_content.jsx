import React, { Component } from 'react'

let MoreContent = React.createClass({

    render () {
        return (
            <MoreContentComponent 
                {...this.props}
            />
        )
    }
})

class MoreContentComponent extends Component {

    render () {
        let parameters = this.props.serverData.parameters,
            type = this.props.type,
            indexId = this.props.index
            
        return (
            <div
                style={{
                    width: '100px',
                    height: '100px',
                    padding: '10px 10px',
                    background: this.props.background,
                    borderRadius: '20px',
                    transition: 'transform .4s',
                    transform: this.props.showParameter ? 'scale(1, 1)' : 'scale(0, 0)',
                    boxShadow: '#333 1px 1px 10px',
                    position: 'absolute',
                    display: (type == 1 && parameters && parameters.length > 0) ? 'block' : 'none',
                    top: '-100%',
                    left: '100%'
                }}
            >
                <h3
                    style={{
                        margin: '0',
                        fontSize: '14px',
                        lineHeight: '14px',
                        height: '14px',
                        textAlign: 'center'
                    }}
                >
                    <span>算法参数</span>
                    <span
                        style={{
                            marginLeft: '4px',
                            color: 'red'
                        }}
                    >0/{parameters && parameters.length}</span>
                </h3>
                <div 
                    style={{
                        width: '100%',
                        paddingTop: '10px',
                        height: '80px',
                        overflowY: 'scroll'
                    }}
                >
                {
                    parameters && parameters.map(function (item, index) {
                        return (
                            <div
                                style={{
                                    width: '100px',
                                    height: '24px',
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: '14px',
                                        width: '32px'
                                    }}
                                >
                                    {item.parameter_name}({item.parameter_type})
                                </span>
                                <input 
                                    onChange={function () {

                                        let val = this.refs['pValue' + index].value

                                        this.props.handleSetParameters(
                                            type, 
                                            indexId,
                                            item.parameter_id,
                                            val
                                        )

                                    }.bind(this)}

                                    ref={'pValue' + index}
                                    style={{
                                        width: '60px',
                                        marginLeft: '8px',
                                        textAlign: 'center',
                                        outline: 'none',
                                        height: '18px',
                                        border: 'none',
                                        marginTop: '3px',
                                        borderRadius: '6px',
                                        padding: '0px 0px',
                                        fontWeight: 'bold',
                                        background: '#f5f5f5'
                                    }}
                                    type='text' 
                                    defaultValue={item.parameter_value}
                                />
                            </div>
                        )
                    }.bind(this))
                }
                </div>
            </div>
        )
    }
}

export default MoreContent