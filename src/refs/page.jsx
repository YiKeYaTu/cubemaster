import React, { Component } from 'react'

let Page = React.createClass({
    render () {
        return (
            <PageComponent 
                currentPage='1'
                totalPage='20'
            />
        )
    }
})

class PageComponent extends Component {
    render () {

        let pageArr = [],
            currentPage = parseInt(this.props.currentPage)

        for (let i = currentPage - 3, len = currentPage + 3; i < len; i++) {

            if (i > totalPage) {
                break
            }

            if (i > 0) {
                pageArr.push(i)
            } else {
                len++
            }

        }

        console.log(pageArr)

        return (
            <section
                style={{
                    width: '100%',
                    overflow: 'hidden',
                    marginTop: '40px'
                }}
            >
                <PageNormalButton 
                    val='1'
                />
            </section>
        )
    }
}

let PageNormalButton = React.createClass({
    render () {
        return (
            <PageNormalButtonComponent 
                {...this.props}
            />
        )
    }
})

class PageNormalButtonComponent extends Component {
    render () {
        return (
            <div
                style={{
                    width: '30px',
                    height: '30px',
                    textAlign: 'center',
                    lineHeight: '30px',
                    color: '#f5f5f5',
                    background: '#333',
                    borderRadius: '6px'
                }}
            >
                {this.props.val}
            </div>
        )
    }
}

let PrvNexButton =  React.createClass({
    render () {
        return (
            <PrvNexButtonComponent />
        )
    }
})

class PrvNexButtonComponent extends Component {
    render () {
        return (
            <div>
            </div>
        )
    }
}

export default Page