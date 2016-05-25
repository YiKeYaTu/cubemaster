import React, { Component } from 'react'

let ChooseDataList = React.createClass({

    render () {
        return (
            <ChooseDataListComponent 
                {...this.props}
            />
        )
    }
})

class ChooseDataListComponent extends Component {
    render () {

        let downListInf = this.props.datasetChooseDownList

        return (
            <ul
                style={{
                    width: '120px',
                    height: '40px',
                    color: '#f5f5f5',
                    float: 'left',
                    cursor: 'pointer',
                }}
            >
                <li
                    style={{
                        position: 'relative',
                    }}
                >
                    <p
                        onClick={this.props.handleDatasetListClick}
                        className='data-list'
                        style={{
                            width: '100px',
                            height: '40px',
                            paddingLeft: '20px',
                            position: 'relative',
                            zIndex: '1',
                            lineHeight: '40px',
                            borderRadius: '6px',
                            background: '#333',
                            transition: 'all .4s',
                        }}
                    >
                        <span>所有数据</span>
                        <img
                            src={require('../../images/triangle.png')}
                            style={{
                                width: '20px',
                                height: '20px',
                                margin: '10px 10px 0 0',
                                float: 'right',
                                transform: downListInf.opacity == 0 ? 'rotate(180deg)' : '',
                            }}
                        >
                        </img>
                    </p>
                    <ul
                        style={{
                            top: downListInf.top,
                            opacity: downListInf.opacity,
                            position: 'absolute',
                            textAlign: 'center',
                            lineHeight: '40px',
                            borderRadius: '6px',
                            transition: 'all .4s',
                            overflow: 'hidden',
                        }}
                    >
                        <li
                            className='dataset-lister'
                            style={{
                                width: '120px',
                                height: '40px',
                                background: 'rgba(51, 51, 51, 0.8)'
                            }}
                        >
                            我的数据
                        </li>
                        <li
                            className='dataset-lister'
                            style={{
                                width: '120px',
                                height: '40px',
                                background: 'rgba(51, 51, 51, 0.8)'
                            }}
                        >
                            推荐数据
                        </li>
                    </ul>
                </li>
            </ul>
        )
    }
}

export default ChooseDataList