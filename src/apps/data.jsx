import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../components/header/content.jsx'
import Content from '../components/data/Content.jsx'
import { changeDatasetDownlist } from '../actions/data_action'

let App = React.createClass({
    datasetDownFlag: false,

    handleDatasetListClick (e, id, ev,focus) {
        e.stopPropagation()
        this.datasetDownFlag = (focus === undefined ? !this.datasetDownFlag : focus)
        this.props.dispatch(changeDatasetDownlist(this.datasetDownFlag))
    },

    render () {
        return (
            <AppComponent 
                {...this.props}
                handleDatasetListClick={this.handleDatasetListClick}
            />
        )
    }
})

class AppComponent extends Component {
    render () {
        return (
            <section
                onClick={(e, id, ev) => {
                    this.props.handleDatasetListClick(e, id, ev, false)
                }}
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
        INIT_LEFT: state.INIT_LEFT,
        loginInf: state.loginInf,
        dataset: state.dataset,
        datasetChooseDownList: state.datasetChooseDownList
    }
})(App)