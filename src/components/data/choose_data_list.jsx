import React, { Component } from 'react'
import { fetchDataset } from '../../actions/data_action'

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
                            zIndex: '2',
                            lineHeight: '40px',
                            borderRadius: '6px',
                            background: '#333',
                            transition: 'all .4s',
                        }}
                    >
                        <span>{this.props.datasetFocuse}</span>
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
                            zIndex: 1
                        }}
                    >
                        <Lister 
                            {...this.props}
                            val='所有数据'
                        />
                        <Lister 
                            {...this.props}
                            val='推荐数据'
                        />
                        <Lister 
                            {...this.props}
                            val='我的数据'
                        />
                    </ul>
                </li>
            </ul>
        )
    }
}

let Lister = React.createClass({
    handleClick () {
        let type

        switch (this.props.val) {
            case '所有数据':
                type = 'total_data'
                break
            case '推荐数据':
                type = ''
                break
            case '我的数据':
                type = 'mine_data'
                break
        }

        this.props.dispatch(fetchDataset({
            operate: type,
            current_page: '1',
            per_page_number: '21',
            showLoading: true
        }))
    },
    shouldComponentUpdate(nextProps, nextState) {
        return false  
    },
    render () {
        return (
            <ListerComponent 
                {...this.props}
                handleClick={this.handleClick}
            />
        )
    }
})

class ListerComponent extends Component {
    render () {
        return (
            <li
                onClick={this.props.handleClick}
                className='dataset-lister'
                style={{
                    width: '120px',
                    height: '40px',
                    background: 'rgba(51, 51, 51, 0.8)'
                }}
            >
                {this.props.val}
            </li>
        )
    }
}

export default ChooseDataList