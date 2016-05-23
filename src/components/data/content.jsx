import React from 'react'
import { Component } from 'react'

export default class Content extends Component {
    render () {
        return (
            <section
                style={{
                    width: '1160px',
                    margin: '0 auto',
                }}
            >
                <section
                     style={{
                        width: '100%',
                        overflow: 'hidden',
                     }}
                >
                    <ul>
                        <li></li>
                        <li></li>
                    </ul>
                    <div
                        className='search'
                        style={{
                            marginTop: '30px',
                            float: 'right'
                        }}
                    >
                        <input 
                            style={{
                                outline: 'none',
                                width: '180px',
                                padding: '4px 10px',
                                height: '20px',
                                background: '#f5f5f5',
                                borderRadius: '2px',
                                border: '1px solid #ccc',
                                fontSize: '14px',
                                lineHeight: '18px'
                            }}
                            type='text'
                        />
                    </div>
                </section>
                <section
                    style={{
                        width: '100%',
                        marginTop: '10px',
                    }}
                >
                    <div
                        className='data-element'
                        style={{
                            width: '280px',
                            height: '80px',
                            padding: '10px 10px',
                            overflow: 'hidden',
                            background: '#333',
                            borderRadius: '6px',
                        }}
                    >
                        <div
                            style={{
                                width: '80px',
                                height: '80px',
                                color: '#f5f5f5',
                                lineHeight: '80px',
                                textAlign: 'center',
                                marginRight: '10px',
                                borderRadius: '100%',
                                background: 'rgb(84, 182, 231)',
                                float: 'left'
                            }}
                        >
                            数据1
                        </div>
                        <div
                            style={{
                                float: 'left',
                                width: '190px',
                                height: '39px',
                                lineHeight: '39px',
                                fontSize: '14px',
                                color: '#f5f5f5',
                                borderBottom: '2px solid rgb(84, 182, 231)',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                marginBottom: '6.5px'
                            }}
                        >
                            然而这并没有什么卵用哦萨芬的
                        </div>
                        <div
                            style={{
                                width: '60px',
                                height: '26px',
                                lineHeight: '26px',
                                textAlign: 'center',
                                background: 'rgb(84, 182, 231)',
                                borderRadius: '6px',
                                float: 'left',
                                fontSize: '14px',
                                color: '#f5f5f5',
                            }}
                        >
                            详情
                        </div>
                        <div
                            style={{
                                width: '100px',
                                height: '26px',
                                lineHeight: '26px',
                                textAlign: 'center',
                                background: 'rgb(84, 182, 231)',
                                borderRadius: '6px',
                                float: 'right',
                                fontSize: '14px',
                                color: '#f5f5f5',
                            }}
                        >
                            加入清单
                        </div>
                    </div>
                </section>
            </section>
        )
    }
}
