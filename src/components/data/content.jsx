import React, { Component } from 'react'
import DataElement from './data_element.jsx'
import ChooseDataList from './choose_data_list.jsx'
import Page from '../../refs/page.jsx'

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
                        borderBottom: '4px solid #333',
                        marginBottom: '40px',
                        padding: '40px 0px'
                     }}
                >
                    <ChooseDataList 
                        {...this.props}
                    />
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
                        上传数据
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

                />
            </section>
        )
    }
}

export default Content
