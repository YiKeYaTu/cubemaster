import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/header/content.jsx'
import Content from '../components/alg/content.jsx'
import Footer from '../components/footer/content.jsx'

let App = React.createClass({
    render () {
        return (
            <AppComponent 
                {...this.props} 
            />
        )
    }
})

class AppComponent extends Component {
    render () {
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
                <Footer />
            </section>
        )
    }
}

export default connect(function (state) {
    return {
        move: state.move,
        INIT_LEFT: state.INIT_LEFT,
        loginInf: state.loginInf,
        alg: state.alg
    }
})(App)