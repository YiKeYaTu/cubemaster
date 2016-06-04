import React, { Component } from 'react'

let DataElementCom = React.createClass({
    render () {
        return (
            <DataElementComComponents 
                {...this.props}
            />
        )
    }
})

class DataElementComComponents extends Component {
    render () {

        let index = this.props.index,
            data = this.props.dataSet || this.props.algorithm

        return (
            <div
                className='data-element'
                style={{
                    width: '280px',
                    height: '80px',
                    padding: '10px 10px',
                    overflow: 'hidden',
                    background: '#333',
                    borderRadius: '6px',
                    float: 'left',
                    margin: index % 3 === 1 ? '0 130px 0 130px' : '',
                    marginBottom: '40px'
                }}
            >
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        color: '#f5f5f5',
                        lineHeight: '80px',
                        textAlign: 'center',
                        marginRight: '10px',
                        borderRadius: '100%',
                        background: 'rgb(84, 182, 231)',
                        float: 'left',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                    }}
                >
                    {data.dataset_name || data.algorithm_name}
                </div>
                <div
                    style={{
                        float: 'left',
                        width: '190px',
                        height: '39px',
                        lineHeight: '39px',
                        fontSize: '14px',
                        color: '#f5f5f5',
                        borderBottom: '2px solid rgb(84, 182, 231)',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        marginBottom: '10px'
                    }}
                >
                    简介: {data.description}
                </div>
                <a href={`xxxx?dataset_id=${data.dataset_id}`}>
                    <div
                        style={{
                            width: '60px',
                            height: '26px',
                            lineHeight: '26px',
                            textAlign: 'center',
                            background: 'rgb(84, 182, 231)',
                            borderRadius: '6px',
                            float: 'left',
                            fontSize: '14px',
                            color: '#f5f5f5',
                            cursor: 'pointer',
                        }}
                    >
                        详情
                    </div>
                </a>
                <div
                    style={{
                        width: '100px',
                        height: '26px',
                        lineHeight: '26px',
                        textAlign: 'center',
                        background: 'rgb(84, 182, 231)',
                        borderRadius: '6px',
                        float: 'right',
                        fontSize: '14px',
                        color: '#f5f5f5',
                        cursor: 'pointer',
                    }}
                >
                    加入清单
                </div>
            </div>
        )
    }
}

export default DataElementCom