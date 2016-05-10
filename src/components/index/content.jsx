import React from 'react'
import { Component } from 'react'
import { changeBanner } from '../../actions/index_action';

let buttonList = [{
    val: '选择数据',
    href: '',
    width: '200px',
    height: '40px',
    marginLeft: '370px',
    background: '#333'
}, {
    val: '选择算法',
    href: '',
    width: '196px',
    height: '36px',
    marginLeft: '20px',
    border: '2px solid #fff'
}];

let bannerArr = [{
    background: require('../../images/3.png')
}, {
    background: require('../../images/3.png')
}, {
    background: require('../../images/3.png')
}];

function getFreeContentHeight () {
    return window.innerHeight - 60;
}

export default class Content extends Component {
    constructor () {
        super();
        this.timer = null;
        this.speed = 4000;
    }
    componentDidMount () { 
        this.rebuild();
        this.changeBannerCount();
        window.onresize = this.rebuild.bind(this);
    }
    changeBannerCount () {
        let count;
        this.timer = setInterval(function () {
            count = this.props.banner.count + 1;
            this.props.dispatch(changeBanner(count));
        }.bind(this), this.speed);
    }
    clearBannerInterval () {
        clearInterval(this.timer);
    }
    rebuild () {
        let container = this.refs.container;
        let buttonOuter = this.refs.buttonOuter;
        let containerHeight = parseFloat(getComputedStyle(container)['height']);
        let buttonOuterHeight = parseFloat(getComputedStyle(buttonOuter)['height']);
        function rebuildMargin () {
            let freeHeight = getFreeContentHeight();
            if (containerHeight < freeHeight) {
                container.style.marginTop = (freeHeight - containerHeight) / 2 + 'px';
            }
        }
        function rebuildButtonTop () {
            let top = (containerHeight - buttonOuterHeight) / 2; 
            buttonOuter.style.top = top + 'px';
        }
        rebuildMargin();
        rebuildButtonTop();
    }
    render () {
        return (
            <section 
                ref='container'
                style={{
                    width: '1160px',
                    margin: '0 auto',
                    marginTop: '40px',
                    position: 'relative'
                }}
            >
                <p 
                    className='trd'
                    style={{
                        position: 'relative',
                        width: '200px',
                        height: '30px',
                        lineHeight: '30px',
                        margin: '0 auto',
                        textAlign: 'center',
                        color: '#fff',
                        fontSize: '22px'
                    }}
                >
                    创建你自己的
                </p>
                <h1
                    style={{
                        margin: '20px 0',
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '50px',
                    }}
                >
                    数据算法 组合
                </h1>
                {buttonList.map(function (item, index) {
                    return (
                        <Button key={index} {...item}/>
                    )   
                })}
                <div
                    style={{
                        position: 'relative',
                        width: '400px',
                        margin: '0 auto',
                        height: '400px',
                        clear: 'both'
                    }}
                >
                    {bannerArr.map(function (item, index) {
                        return  (
                            <Banner 
                                onMouseOut={this.changeBannerCount.bind(this)}
                                onMouseOver={this.clearBannerInterval.bind(this)} 
                                {...this.props} 
                                {...item} 
                                key={index} 
                                count={index} 
                            />
                        )
                    }.bind(this))}
                </div>
                <ul
                    ref='buttonOuter'
                    style={{
                        position: 'absolute',
                        right: '0px',
                        top: '0px',
                        Zindex: '10'
                    }}
                >
                     {bannerArr.map(function (item, index) {
                        return  (
                            <ChangeBannerButton 
                                {...this.props}
                                key={index} 
                                count={index} 
                            />
                        )
                    }.bind(this))}
                </ul>
            </section>
        )
    }
}

class Button extends Component {
    render () {
        return (
            <a
                href={this.props.href}
                style={{
                    display: 'block',
                    width: this.props.width,
                    height: this.props.height,
                    lineHeight: '40px',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '4px',
                    marginLeft: this.props.marginLeft,
                    float: 'left',
                    border: this.props.border,
                    background: this.props.background
                }}
            >
                {this.props.val}
            </a>
        )
    }
}


class ChangeBannerButton extends Component {
    handleClick () {
        this.props.dispatch(changeBanner(this.props.count));
    }
    render () {
        return (
            <li
                onClick={this.handleClick.bind(this)}
                style={{
                    width: '12px',
                    height: '12px',
                    marginTop: '10px',
                    background: this.props.count === this.props.banner.count ? '#fff' : '',
                    border: '1px solid #fff',
                    borderRadius: '100%',
                    cursor: 'pointer',
                    transition: 'all .4s'
                }}
            >
            </li>
        )
    }
}

class Banner extends Component {
    render () {
        let background = this.props.background;
        return (
            <div
                onMouseOut={this.props.onMouseOut}
                onMouseOver={this.props.onMouseOver}
                style={{
                    width: '100%',
                    height: '100%',
                    transition: 'all .6s',
                    position: 'absolute',
                    background: `url(${background}) no-repeat center center`,
                    // backgroundSize: 'cover cover',
                    opacity: this.props.count === this.props.banner.count ? '1' : '0',
                    left: '0',
                    top: '0'
                }}
            >
            </div>
        )
    }
}