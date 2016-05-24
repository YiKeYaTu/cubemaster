import React, { Component } from 'react'

let ChooseDataList = React.createClass({
    render () {
        return (
            <ChooseDataListComponent />
        )
    }
})

class ChooseDataListComponent extends Component {
    render () {
        return (
            <ul
                style={{
                    width: '120px',
                    textAlign: 'center',
                    color: '#f5f5f5',
                    float: 'left',
                    cursor: 'pointer'
                }}
            >
                <li>
                    <p
                        style={{
                            width: '100%',
                            height: '40px',
                            lineHeight: '40px',
                            borderRadius: '6px',
                            background: '#333',
                            position: 'relative'
                        }}
                    >
                        所有数据
                    </p>
                    <ul
                        style={{
                            position: 'absolute',
                        }}
                    >
                        <li>
                            我的数据
                        </li>
                        <li>
                            推荐数据
                        </li>
                    </ul>
                </li>
            </ul>
        )
    }
}

export default ChooseDataList