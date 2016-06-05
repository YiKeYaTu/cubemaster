import React, { Component } from 'react'
import DataElementCom from '../../refs/data_element_com.jsx'

let AlgElement = React.createClass({
    render () {
        return (
            <AlgElementComponent
                {...this.props}
            />
        )
    }
})

class AlgElementComponent extends Component {
    render () {

        let algorithm_class = this.props.algorithm_class,
            algorithms = this.props.algorithms

        return (
            <section
                style={{
                    width: '100%',
                    marginTop: '20px',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '40px'
                    }}
                >
                    <h2
                        style={{
                            lineHeight: '40px',
                            float: 'left'
                        }}
                    >
                        {algorithm_class}
                    </h2>
                    <a
                        className='more'
                        style={{
                            width: '80px',
                            height: '26px',
                            fontSize: '14px',
                            marginTop: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '6px',
                            lineHeight: '26px',
                            display: 'block',
                            float: 'left',
                            textAlign: 'center',
                            marginLeft: '20px',
                            textDecoration: 'none',
                            color: '#6d757a',
                        }}
                        href={`./alg_class.html?algorithmClass=${algorithm_class}&currentPage=1&perPageNumber=21`}
                    >
                        查看更多
                    </a>
                </div>
                <section
                    style={{
                        marginTop: '20px',
                        overflow: 'hidden'
                    }}
                >
                    {
                        algorithms.map((item, index) => {
                            return (
                                <DataElementCom 
                                    index={index}
                                    key={index}
                                    {...item}
                                />
                            )
                        })
                    }
                </section>
            </section>
        )
    }
}

export default AlgElement