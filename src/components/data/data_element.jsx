import React, { Component } from 'react'

let DataElement = React.createClass({
    render () {
        return (
            <DataElementComponent 
                {...this.props}
            />
        )
    }
})

class DataElementComponent extends Component {
    render () {

        let dataset = this.props.dataset.data.dataset,
            finish = this.props.dataset.finish

        let showDataInf

        if (finish && dataset.length > 0) {
            showDataInf = false
        } else if (finish && dataset.length === 0) {
            showDataInf = true
        }

        return (
            <section
                style={{
                    overflow: 'hidden'
                }}
            >
                <div
                    style={{
                        display: finish ? 'none' : 'block'
                    }}
                >
                    加载中...
                </div>
                <div
                    style={{
                        display: showDataInf ? 'block' : 'none',
                    }}
                >
                    暂无数据
                </div>
            {
                finish && dataset && dataset.map((item, index) => {
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
                                    float: 'left'
                                }}
                            >
                                {item.dataset.dataset_name}
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
                                简介: {item.dataset.description}
                            </div>
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
                })
            }
            </section>
        )
    }
}

export default DataElement
