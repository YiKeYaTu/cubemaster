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