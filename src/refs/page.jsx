import React, { Component } from 'react'
import { fetchDataset } from '../actions/data_action'

let Page = React.createClass({
    render () {
        return (
            <PageComponent 
                dispatch={this.props.dispatch}
                currentPage={this.props.dataset.data.current_page}
                totalPage={this.props.dataset.data.total_page}
            />
        )
    }
})

class PageComponent extends Component {
    render () {

        let pageArr = [],
            currentPage = parseInt(this.props.currentPage),
            totalPage = parseInt(this.props.totalPage)

        for (let i = currentPage - 2, len = currentPage + 2; i < len; i++) {

            if (i > totalPage) {
                break
            }

            if (i > 0) {
                pageArr.push(i)
            } else {
                len++
            }

        }

        if (pageArr.length < 4) {

            for (let i = currentPage - 3, len = currentPage -  3 - (4 - pageArr.length); i > len; i--) {

                if (i > 0) {
                    pageArr.unshift(i)
                }

            }

        }

        if (pageArr[0] > 1) {

            pageArr.unshift(1)

            if (pageArr[1] > 2) {

                pageArr.splice(1, 0, 'more')

            }

        }

        if (pageArr.slice(-1)[0] < totalPage) {

            pageArr.push(totalPage)

            if (pageArr.slice(-2)[0] < totalPage - 1) {

                pageArr.splice(pageArr.length - 1, 0, 'more')

            }

        }

        return (
            <section
                style={{
                    width: '100%',
                    overflow: 'hidden',
                    marginTop: '40px',
                    paddingBottom: '40px'
                }}
            >
                 <PrvButton 
                    dispatch={this.props.dispatch}
                    currentPage={currentPage}
                    totalPage={totalPage}
                 />
                {
                    pageArr.map((item, index) => {
                        return (
                            <PageNormalButton 
                                dispatch={this.props.dispatch}
                                currentPage={currentPage}
                                val={item}
                                key={index}
                            />
                        )
                    })
                }
                <NexButton
                    dispatch={this.props.dispatch}
                    currentPage={currentPage}
                    totalPage={totalPage}
                />
            </section>
        )
    }
}

let PageNormalButton = React.createClass({
    handleClick () {
        
    },
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

        let val = this.props.val

        return (
            <div
                onClick={() => {
                    this.props.dispatch(fetchDataset({
                        operate: 'total_data',
                        current_page: this.props.val,
                        per_page_number: '21',
                        showLoading: false,
                    }))
                }}
                className='page-button'
                style={{
                    width: '34px',
                    height: '34px',
                    textAlign: 'center',
                    lineHeight: '34px',
                    color: '#f5f5f5',
                    float: 'left',
                    marginRight: '10px',
                    background: this.props.currentPage == val ? 'rgb(84, 182, 231)' : '#333',
                    borderRadius: '6px'
                }}
            >
                {val == 'more' ? '...' : val}
            </div>
        )
    }
}

let PrvButton =  React.createClass({
    render () {
        return (
            <PrvButtonComponent 
                {...this.props}
            />
        )
    }
})

class PrvButtonComponent extends Component {
    render () {
        return (
            <div
                onClick={() => {
                    this.props.dispatch(fetchDataset({
                        operate: 'total_data',
                        current_page: this.props.currentPage - 1,
                        per_page_number: '21',
                        showLoading: false,
                    }))
                }}
                className='page-button'
                style={{
                    width: '34px',
                    height: '34px',
                    textAlign: 'center',
                    lineHeight: '34px',
                    color: '#f5f5f5',
                    float: 'left',
                    display: this.props.currentPage === 0 ? 'none' : 'block',
                    marginRight: '10px',
                    background: `#333 url(${require('../images/triangle.png')}) center center no-repeat`,
                    backgroundSize: '20px 20px',
                    transform: 'rotate(270deg)',
                    borderRadius: '6px'
                }}
            >
                
            </div>
        )
    }
}

let NexButton =  React.createClass({
    render () {
        return (
            <NexButtonComponent 
                {...this.props}
            />
        )
    }
})

class NexButtonComponent extends Component {
    render () {
        return (
            <div
                onClick={() => {
                    this.props.dispatch(fetchDataset({
                        operate: 'total_data',
                        current_page: this.props.currentPage + 1,
                        per_page_number: '21',
                        showLoading: false,
                    }))
                }}
                className='page-button'
                style={{
                    width: '34px',
                    height: '34px',
                    textAlign: 'center',
                    lineHeight: '34px',
                    color: '#f5f5f5',
                    float: 'left',
                    display: this.props.currentPage === this.props.totalPage ? 'none' : 'block',
                    marginRight: '10px',
                    background: `#333 url(${require('../images/triangle.png')}) center center no-repeat`,
                    backgroundSize: '20px 20px',
                    transform: 'rotate(90deg)',
                    borderRadius: '6px'
                }}
            >

            </div>
        )
    }
}

export default Page