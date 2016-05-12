import React, { Component } from 'react'
import DataItem from './data_item.jsx'
import Combination from './combination.jsx'
import { addActiveIndex } from '../../actions/combination_action'

function getFreeContentHeight () {
    return window.innerHeight - 60
}

function objToArr (obj) {
    let dataInf = []
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            dataInf.push(obj[key])
        }
    }
    return dataInf
}



let Content = React.createClass({
    //初始化 数据元素   算法元素的stateINIT_POS = '-60px',
    nextPos: '0px',
    initPos: '-60px',
    initInnerHTML: '待插入',
    nextInnerHTML: '已插入',
    getInitialState () {
        return {
            dataInf: this.props.initData,
            algorithmInf: this.props.initAlgorithmItem,
            activeIndex: [], // 正在执行连接元素
            parentIndex: null, //正在执行连接元素的父节点
            childIndex: null,
            activeEl: null, //正在被拖动的dom元素
            connectIndex: [], // 已经连接的元素  通过树进行连接 通过接口判断是否可以连接
        }
    },
    //给连接点添加事件  点击后将该元素纳入state里面的activeIndex里面
    //如果activeIndex的length === 2那么就执行连接判断
    
    //将connectIndex进行更新
    updateConnectIndex (activeIndex) {
        let root = this.state.connectIndex,
            parent = this.state.parentIndex,
            child = this.state.childIndex

        let createStateConnectNode = this.createStateConnectNode,
            clearRootChild = this.clearRootChild,
            judInterface = this.judInterface

        if (!judInterface(parent, child)) {
            this.cannotConnect('端口被占用')
        } else {
            if (parent && child) {
                clearRootChild()
                parent.child.push(child)
                parent.data.connectInterface.outInterface = false
                child.data.connectInterface.inInterface = false
            } else if (parent && !child) {
                parent.child.push(createStateConnectNode(activeIndex[1]))
                parent.data.connectInterface.outInterface = false
            } else if (!parent && child) {
                child.data.connectInterface.inInterface = false
                let temp = createStateConnectNode(activeIndex[0])
                temp.child.push(child)
                clearRootChild()
                root = this.state.connectIndex
                root.push(temp)
            } else {
                let temp = createStateConnectNode(activeIndex[0])
                temp.child.push(createStateConnectNode(activeIndex[1]))
                root.push(temp)
            }
        }
        this.setState({
            parentIndex: null,
            childIndex: null,
            activeIndex: [],
            connectIndex: this.state.connectIndex,
        }, () => {
            // console.log(this.state.connectIndex)
        })
    },
    //删除root节点中的将要被插入其他子节点的节点
    clearRootChild () {
        let child = this.state.childIndex

        this.state.connectIndex = this.state.connectIndex.filter((item, index) => {
            if (item.data.type != child.data.type || item.data.index != child.data.index) {
                return item
            }
        })
    },
    //点击时判断这个节点端口是否已经被占用
    judClickInterface (typeId, indexId, buttonType) {
        let id = typeId + indexId
        let data
        if (typeId == 0) {
            data = this.state.dataInf
        } else if (typeId == 1) {
            data = this.state.algorithmInf
        }
        if (buttonType == 0) {
            return !data[id].connectInterface || data[id].connectInterface.inInterface
        } else if (buttonType == 1) {
            return !data[id].connectInterface || data[id].connectInterface.outInterface
        }
    },
    judInterface (parent, child) {
        if (parent && child) {
            return parent.data.connectInterface.outInterface && child.data.connectInterface.inInterface
        } else if (parent && !child) {
            return parent.data.connectInterface.outInterface
        } else if (!parent && child) {
            return child.data.connectInterface.inInterface
        } else {
            return true
        }
    },
    // 创建节点 放入树中
    createStateConnectNode (inf) {
        let data
        let type = inf.type,
            buttonType = inf.buttonType
        if (type == 0) {
            data = this.state.dataInf[inf.type + inf.index]
        } else if (type == 1) {
            data = this.state.algorithmInf[inf.type + inf.index]
        }
        data.connectInterface = {
            inInterface: buttonType === 1 ? true : false,
            outInterface: buttonType === 1 ? false : true,
        }
        data.pos = inf.pos
        return {
            data: data,
            child: [],
        }
    },
    cannotConnect (error) {
        console.error(error)
    },

    //遍历整个树
    walkTree (node, callback) {
        let i = 0
        callback(node)
        node = node.child
        while (node[i]) {
            node && this.walkTree(node[i++], callback)
        }
    },
    //找出对应type的state
    getData (type) {
        return type == 0 ? this.state.dataInf : this.state.algorithmInf
    },
    //设定对应type的state
    chooseDataToset (typeId, data, callback) {
        if (typeId == 0) {
            this.setState({
                dataInf: data
            }, callback)
        } else if (typeId == 1) {
            this.setState({
                algorithmInf: data
            }, callback)
        }
    },
    //判断两点是否可以连接  并且拿出父节点
    handleConnectButtonJudConnect (activeIndex) {
        let connectIndex = this.state.connectIndex
        let flag = 200
        let parent
        if (activeIndex[0].buttonType === activeIndex[1].buttonType) { //是不是不同的接口 左  右
            flag = 400
            return flag
        }
        connectIndex.forEach((item, index) => {
            if (item) {
                this.walkTree(item, (node) => {
                    if (node.data.type == activeIndex[0].type && node.data.index == activeIndex[0].index) {
                        this.state.parentIndex = node
                    } else if (node.data.type == activeIndex[1].type && node.data.index == activeIndex[1].index) {
                        this.state.childIndex = node
                    }
                })
            }
        })
        return flag
    },
    //连接端口
    handleConnectButtonClick (typeId, indexId, buttonType, pos) {
        let activeIndex = this.state.activeIndex.slice()
        let status
        
        if (!this.judClickInterface(typeId, indexId, buttonType)) {
            return this.cannotConnect('端口被占用')
        }
        
        activeIndex.push({
            type: typeId,
            index: indexId,
            buttonType: buttonType,
            pos: pos
        })
        if (activeIndex.length === 2) {
            //交换button位置 
            if (activeIndex[0].buttonType == 0) {
                let temp = activeIndex[0]
                activeIndex[0] = activeIndex[1]
                activeIndex[1] = temp
            }

            if ((status = this.handleConnectButtonJudConnect(activeIndex)) !== 200) {
                this.cannotConnect(status)
            } else {
                this.updateConnectIndex(activeIndex)
            }
        } else if (activeIndex.length === 1) {
            this.setState({
                activeIndex: activeIndex
            })
        }
    },
    //封装数据 算法元素的鼠标事件
    handleOverAndOut (typeId, indexId, type) {
        let data = this.getData(typeId)
        let id = typeId + indexId
        if (data[id].itemHasAdd) return
        data[id].right = (type === 0 ? this.nextPos : this.initPos)
        this.chooseDataToset(typeId, data)
    },
     //封装数据 算法元素的鼠标事件
    handleMouseOver (type, index) {
        this.handleOverAndOut(type, index, 0)
       
    },
     //封装数据 算法元素的鼠标事件
    handleMouseOut (type, index) {
        this.handleOverAndOut(type, index, 1)
    },
     //封装数据 算法元素的鼠标事件
    //点击元素后 将该元素加入到组合池里
    handleClick (typeId, indexId, buttonType) {
        let data = this.getData(typeId)
        let id = typeId + indexId
        if (data[id].itemHasAdd) return
        data[id].right = this.nextPos
        data[id].itemHasAdd = true
        data[id].buttonInnerHTML = this.nextInnerHTML
        this.chooseDataToset(typeId, data)
    },
    //插入元素的删除按钮点击后删除该元素
    handleRemoveButtonClick (typeId, indexId) {
        let data = this.getData(typeId)
        let id = typeId + indexId
        data[id].right = this.initPos
        data[id].itemHasAdd = false
        data[id].buttonInnerHTML = this.initInnerHTML
        this.chooseDataToset(typeId, data)
        this.removeConnectIndex(typeId, indexId)
    },
    //点击元素后 执行拖动的准备工作
    handleItemMouseDown (typeId, indexId, downPos) {
        let data = this.getData(typeId)
        this.setState({
            activeEl: {
                downPos: downPos,
                data: data[typeId + indexId]
            },
        })
    },
    //放开元素后 将activeEl设置为null
    handleItemMouseUp (typeId, indexId) {
        this.setState({
            activeEl: null,
        })
    },
    handleItemOuterClearClick () {
        this.setState({
            activeIndex: []
        })
    },
    //元素拖动逻辑
    handleItemMouseMove (x, y) {
        if (this.state.activeEl) {
            this.state.activeEl.data.itemLeft = x + 'px'
            this.state.activeEl.data.itemTop = y + 'px'
            this.state.activeEl.data.pos = {
                x: x,
                y: y,
            }
            this.setState({
                connectIndex: this.state.connectIndex,
                dataInf: this.state.dataInf,
                algorithmInf: this.state.algorithmInf,
            })
        }
    },
    //点击删除按钮之后删除链接
    removeConnectIndex (typeId, indexId) {
        let connectIndex = this.state.connectIndex
        let parent, child, i, iIndex

        connectIndex.forEach((item, index) => {
            if (item.data.type == typeId && item.data.index == indexId) {
                i = item
                iIndex = index
                child = item.child[0]
            } else {
                this.walkTree(item, (node) => {
                    let temp = node.child[0]
                    if (temp && temp.data.type == typeId && temp.data.index == indexId) {
                        parent = node
                        i = temp
                        child = temp.child[0]
                    }
                })
            }
        })
        if (i) {
            i.data.connectInterface = {
                inInterface: true,
                outInterface: true,
            }
            i.child.pop() 
        }
        if (child) {
            child.data.connectInterface.inInterface = true
        }
        if (!parent) {
            if (i) {
                connectIndex.splice(iIndex, 1)
            }
        } else {
            parent.data.connectInterface.outInterface = true
            parent.child.pop()
            this.state.connectIndex = connectIndex.filter((item, index) => {
                if (item.data.type != parent.data.type || item.data.index != parent.data.index) {
                    return item
                }
            })
        }
        if (child && child.child) {
            this.state.connectIndex.push(child)
        }
    }, 
    render () {  
        let dataInf = objToArr(this.state.dataInf),
            algorithmInf = objToArr(this.state.algorithmInf)
        return (
            <ContentComponent 
                handleConnectButtonClick={this.handleConnectButtonClick}
                handleRemoveButtonClick={this.handleRemoveButtonClick}
                handleMouseOver={this.handleMouseOver}
                handleMouseOut={this.handleMouseOut}
                handleClick={this.handleClick}
                handleItemMouseDown={this.handleItemMouseDown}
                handleItemMouseUp={this.handleItemMouseUp}
                handleItemMouseMove={this.handleItemMouseMove}
                handleItemOuterClearClick={this.handleItemOuterClearClick}
                {...this.state}
                dataInf={dataInf}
                algorithmInf={algorithmInf}
            />
        )
    }
})

class ContentComponent extends Component {
    componentDidMount() {
        this.rebuild()
        window.onresize = function () {
            this.rebuild()
        }.bind(this)
    }
    rebuild () {
        let container = this.refs.container
        let containerHeight = parseFloat(getComputedStyle(container)['height'])
        function rebuildMargin () {
            let freeHeight = getFreeContentHeight()
            if (containerHeight < freeHeight) {
                container.style.marginTop = (freeHeight - containerHeight) / 2 + 'px'
            }
        }  
        rebuildMargin()
    }
    render () {  
        let dataInf = objToArr(this.props.dataInf),
            algorithmInf = objToArr(this.props.algorithmInf)
        return (
            <section
                ref='container'
                style={{
                    width: '1160px',
                    margin: '0 auto',
                    overflow: 'hidden',
                }}
            >
                <section
                    style={{
                        width: '300px',
                        float: 'left',
                    }}
                >    
                    <Container 
                        {...this.props}
                        dataInf={dataInf}
                        val='选择数据' 
                        type='0' 
                    />
                    <Container 
                        {...this.props}
                        dataInf={algorithmInf}
                        val='选择算法' 
                        type='1' 
                    />
                </section>
                <section
                    style={{
                        width: '800px',
                        float: 'right',
                    }}
                >    
                    <Combination
                        {...this.props}       
                        dataInf={dataInf}
                        algorithmInf={algorithmInf}
                     />
                </section>
            </section>
        )
    }
}

class Container extends Component {
    componentDidMount() {
        this.rebuildMargin()
    }
    rebuildMargin () {
        let itemContent = this.refs.itemContent
        let itemContentHeight = parseFloat(getComputedStyle(itemContent)['height'])
        const CONTAINER_HEIGHT = 160

        if (itemContentHeight < CONTAINER_HEIGHT) {
            itemContent.style.marginTop = (CONTAINER_HEIGHT - itemContentHeight) / 2 + 'px'
        }
    }
    render () {  
        let dataInf = objToArr(this.props.dataInf),
            algorithmInf = objToArr(this.props.algorithmInf)
        return (
            <section
                style={{
                    width: '280px',
                    height: '280px',
                    background: '#f5f5f5',
                    borderRadius: '100%',
                    marginTop: '20px',
                    overflow: 'hidden',
                    border: '10px solid #f5f5f5'
                }}
            >  
                <div
                    style={{
                        background: 'rgb(84, 182, 231)',
                        width: '100%',
                        height: '60px',
                        textAlign: 'center',
                        lineHeight: '60px',
                        color: '#f5f5f5',
                        fontSize: '20px'
                    }}
                >
                    {this.props.val}
                </div>
                <div
                    ref='itemContent'
                    style={{
                        width: '232px',
                        maxHeight: '150px',
                        overflowY: 'scroll',
                        margin: '10px auto',
                        paddingTop: '10px'
                    }}
                >
                    {dataInf.map((item, index) => {
                        return (
                            <DataItem 
                                index={index} 
                                key={index} 
                                {...item}
                                {...this.props}
                            />
                        )
                    })}
                </div>
            </section>
        )
    }
}

export default Content
