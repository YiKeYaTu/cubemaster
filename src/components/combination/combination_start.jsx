import React, { Component } from 'react'
import { fetchConnect, controlResWapper } from '../../actions/combination_action'


let CombinationStart = React.createClass({
    shouldComponentUpdate() {
        return false  
    },
    handleClick () {

        let connectIndex = this.props.connectIndex

        let data = [],
            model = []
        let lastItem

        let runFlag = true

        connectIndex.forEach((item, index) => {

            if (item.data.type != 0) {
                runFlag = false
            } else {
                data.push({
                    id: item.data.serverData.dataset_id
                })
            }

            if (!runFlag) {

            } else {

                item = item.child[0]

                while (item && !item.data.last) {

                    if (!lastItem) {
                        model.push({
                            id: item.data.serverData.algorithm_id,
                            parameters: item.data.serverData.parameters,
                            input: data[index].id,
                            output: item.child[0] && !item.child[0].data.last && item.child[0].data.serverData.algorithm_id,
                        })
                    } else {
                        model.push({
                            id: item.data.serverData.algorithm_id,
                            parameters: item.data.serverData.parameters,
                            input: lastItem.data.serverData.algorithm_id,
                            output: item.child[0] && !item.child[0].data.last && item.child[0].data.serverData.algorithm_id,
                        })
                    }
                    lastItem = item
                    item = item.child[0]
                }

            }

            this.props.dispatch(controlResWapper())

        })

        runFlag && this.props.dispatch(fetchConnect({
            protocol_id: 'A-3-2',
            platform: "java",
            data: data,
            model: model,
        }))
    },
    render () {
        return (
            <CombinationStartComponent 
                handleClick={this.handleClick}
            />
        )
    }
})

class CombinationStartComponent extends Component {
    render () {
        return (
            <div
                onClick={this.props.handleClick}
                className='combination-start-component'
                style={{
                    width: '48px',
                    height: '48px',
                    transition: 'all .4s',
                    border: '2px solid rgb(84, 182, 231)',
                    borderRadius: '100%',
                    background: '#f5f5f5',
                    cursor: 'pointer',
                    position: 'absolute',
                    right: '-35px',
                    top: '50%',
                    marginTop: '-70px',
                    textAlign: 'center',
                    lineHeight: '48px',
                    color: 'rgb(84, 182, 231)'
                }}
            >
                运行
            </div>
        )
    }
}

export default CombinationStart