import React, { Component } from 'react'

let Page = React.createClass({
    render () {
        return (
            <PageComponent />
        )
    }
})

class PageComponent extends Component {
    render () {
        return (
            <section
                style={{
                    width: '100%'
                }}
            >
            </section>
        )
    }
}


export default Page