import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/header/content.jsx'
import Content from '../components/combination/Content.jsx'
import ResContent from '../components/combination/res_content.jsx'
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
                    overflow: 'hidden'
                }}
            >
                <Header 
                    {...this.props} 
                />
                <Content 
                    {...this.props}
                />  
                <ResContent
                    resContentWapperShow={this.props.resContentWapperShow} 
                    dispatch={this.props.dispatch}
                    resContentList={this.props.resContentList}
                />
                <Footer />
            </section>
        )
    }
}

export default connect(function (state) {
    return {
        resContentWapperShow: state.controlcontrolResWapper,
        resContentList: state.runServerRes,
        move: state.move,
        initData: state.getInitData,
        initAlgorithmItem: state.getInitAlgorithmItem,
        INIT_LEFT: state.INIT_LEFT,
        loginInf: state.loginInf
    }
})(App)