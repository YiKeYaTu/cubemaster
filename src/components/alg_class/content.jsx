import React, { Component } from 'react'
import DataElement from '../data/data_element.jsx'
import Page from '../../refs/page.jsx'

let Content = React.createClass({
    render () {
        return (
            <ContentComponent />
        )
    }
})

class ContentComponent extends Component {
    render () {
        return (
            <section
                style={{
                    width: '1160px',
                    margin: '0 auto',
                }}
            >
                <section
                    className='user-input-section'
                    style={{
                        width: '100%',
                        overflow: 'hidden',
                        borderBottom: '4px solid #333',
                        marginBottom: '40px',
                        padding: '40px 0px'
                    }}
                >
                    <div
                        style={{
                            float: 'left',
                            width: '120px',
                            height: '40px',
                            lineHeight: '40px',
                            transition: 'all .4s',
                            background: '#333',
                            textAlign: 'center',
                            borderRadius: '6px',
                            color: '#f5f5f5',
                            cursor: 'pointer'
                        }}
                    >
                        我的算法
                    </div>
                    <div
                        className='upload-data'
                        style={{
                            float: 'left',
                            width: '120px',
                            height: '40px',
                            marginLeft: '10px',
                            lineHeight: '40px',
                            transition: 'all .4s',
                            background: 'rgb(84, 182, 231)',
                            textAlign: 'center',
                            borderRadius: '6px',
                            color: '#f5f5f5',
                            cursor: 'pointer'
                        }}
                    >
                        上传算法
                    </div>
                    <div
                        className='search'
                        style={{
                            float: 'right',
                        }}
                    >
                        <form>
                            <input 
                                style={{
                                    outline: 'none',
                                    width: '152px',
                                    padding: '4px 10px',
                                    height: '30px',
                                    background: '#f5f5f5',
                                    borderRadius: '2px',
                                    border: '1px solid #ccc',
                                    fontSize: '14px',
                                    float: 'left',
                                    lineHeight: '18px'
                                }}
                                type='text'
                            />
                            <input
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    float: 'left',
                                    display: 'block',
                                    background: '#f5f5f5',
                                    border: '1px solid #ccc',
                                    borderLeft: 'none',
                                    background: `url(${require('../../images/search.png')}) no-repeat center center`,
                                    backgroundSize: '26px 26px'
                                }}
                                value=''
                                type='submit'
                            />
                        </form>
                    </div>
                </section>
                <section
                    style={{
                        width: '100%',
                        marginTop: '10px',
                        overflow: 'hidden',
                    }}
                >
                    <DataElement 
                        {...this.props}
                    />  
                </section>
                <Page
                    {...this.props}
                />
            </section>
        )
    }
}

export default Content