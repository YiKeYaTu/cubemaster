import React, { Component } from 'react'
import AlgElement from './alg_element.jsx'

let Content = React.createClass({

    render () {
        return (
            <ContentComponent
                {...this.props}
            />
        )
    }

})

class ContentComponent extends Component {

    render () {
        let finish = this.props.alg.finish,
            json = this.props.alg.json

        return (
            <section
                style={{
                    width: '1160px',
                    margin: '0 auto'
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '400px',
                        overflow: 'hidden',
                        position: 'relative',
                        marginTop: '50px',
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
                {
                    finish && json.algorithm.map((item, index) => {
                        return (
                            <AlgElement 
                                key={index}
                                {...item}
                            />
                        )
                    })
                }
                
            </section>
        )
    }

}

export default Content