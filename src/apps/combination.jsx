import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/header/content.jsx'
import Content from '../components/combination/Content.jsx'

class App extends Component {
    render () {
        // console.log(this.props)
        return (
            <section
                style={{
                    width: '100%',
                }}
            >
                <Header 
                    {...this.props} 
                />
                <Content 
                    {...this.props}
                />
            </section>
        )
    }
}

export default connect(function (state) {
    return {
        move: state.move,
        initData: state.getInitData,
        initAlgorithmItem: state.getInitAlgorithmItem,
        INIT_LEFT: state.INIT_LEFT
    }
})(App)