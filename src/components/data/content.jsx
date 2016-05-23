import React, { Component } from 'react'
import DataElement from './data_element.jsx';

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
                    <DataElement />  
                </section>
            </section>
        )
    }
}
