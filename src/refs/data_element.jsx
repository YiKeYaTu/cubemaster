import React, { Component } from 'react'
import DataElementCom from './data_element_com.jsx'

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
        let dataset,
            finish
            console.log(this.props)
        if (this.props.dataset) {
            dataset = this.props.dataset.data.dataset,
            finish = this.props.dataset.finish
        }

        let showDataInf

        if (finish && dataset.length > 0) {
            showDataInf = false
        } else if (finish && dataset.length === 0) {
            showDataInf = true
        }

        return (
            <section
                style={{
                    overflow: 'hidden',
                    maxHeight: '960px',
                    position: 'relative',
                    paddingBottom: '40px',
                    borderBottom: '4px solid #333'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '400px',
                        overflow: 'hidden',
                        background: 'rgba(0, 0, 0, 0.2)',
                        display: finish ? 'none' : 'block'
                    }}
                >
                    <div className="spinner">
                        <div className="rect1"></div>
                        <div className="rect2"></div>
                        <div className="rect3"></div>
                        <div className="rect4"></div>
                        <div className="rect5"></div>
                    </div>
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
                        <DataElementCom 
                            key={index}
                            index={index}
                            {...item}
                        />
                    )
                })
            }
            </section>
        )
    }
}

export default DataElement
