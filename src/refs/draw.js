export default class Draw {
    constructor (context, conf) {

        this.context = context
        this.lineWidth = conf.lineWidth
        this.context.lineWidth = conf.lineWidth
        this.context.lineJoin = conf.lineJoin
        this.context.strokeStyle = conf.strokeStyle
        this.content = conf.content
        this.disTop = conf.disTop
        this.disLeft = conf.disLeft
        this.saveLine = {}
        
        if (conf.scale) {
            this.context.scale(conf.scale, conf.scale)
        }

    }
    reDraw (connectIndex) {
        let child

        this.clear()

        connectIndex.forEach((item, index) => {
            while (item) {
                this.context.beginPath()
                child = item.child[0]
                if (child) {
                    this.lineTo(
                        item.data.pos.x + this.disLeft, 
                        item.data.pos.y + this.disTop,
                        child.data.pos.x,
                        child.data.pos.y + this.disTop,
                        true, //不开启反转
                        item.data.type + item.data.index, 
                        child.data.type + child.data.index
                    )
                }
                item = child
            }  
        })
    }
    drawAng (beginx, beginy, oldwayArr, r) {

        let wayArr = Array.from(oldwayArr)

        const DIS = this.lineWidth
        const angWidth = 10, angHeight = 10, showAng = 100

        let prvX = beginx, prvY = beginy
        let disX, disY

        this.context.beginPath()
        this.context.lineJoin = 'bevel'

        if (!r) { //反转
            wayArr.reverse()

            let temp = wayArr.shift()

            wayArr.push({
                x: beginx,
                y: beginy
            })

            prvX = temp.x
            prvY = temp.y
        }

        wayArr.forEach((item) => {
            disX = item.x - prvX
            disY = item.y - prvY
            if (disX === 0) { //竖

                if (Math.abs(disY) >= showAng) {

                    if (disY > 0) {
                        __draw.call(
                            this,
                            prvX - angWidth / 2 + DIS / 1, prvY + (disY - angHeight) / 2,
                            prvX + DIS / 1, prvY + disY / 2,
                            prvX + angWidth / 2 + DIS / 1, prvY + (disY - angHeight) / 2,
                            prvX + DIS / 1, prvY + (disY + angHeight) / 2
                        )
                    } else {
                        __draw.call(
                            this,
                            prvX - angWidth / 2 + DIS / 1, prvY + (disY + angHeight) / 2,
                            prvX + DIS / 1, prvY + disY / 2,
                            prvX + angWidth / 2 + DIS / 1, prvY + (disY + angHeight) / 2,
                            prvX + DIS / 1, prvY + (disY - angHeight) / 2
                        )
                    }

                }
                
                

            } else if (disY === 0) { //横
                if (Math.abs(disX) >= showAng) {
                    if (disX > 0) {
                        __draw.call(
                            this,
                            prvX + (disX - angWidth) / 2, prvY + (disY - angHeight) / 2,
                            prvX + disX / 2, prvY,
                            prvX + (disX - angWidth) / 2, prvY + (disY + angHeight) / 2,
                            prvX + (disX + angWidth) / 2, prvY
                        )
                    } else {
                        __draw.call(
                            this,
                            prvX + (disX + angWidth) / 2, prvY + (disY - angHeight) / 2,
                            prvX + disX / 2, prvY,
                            prvX + (disX + angWidth) / 2, prvY + (disY + angHeight) / 2,
                            prvX + (disX - angWidth) / 2, prvY
                        )
                    }
                }

            }

            
            prvX = item.x
            prvY = item.y
        })
        this.context.lineJoin = 'round'

    }
    lineTo (oldx, oldy, x, y, r, id1, id2) {

        let colorArr
        const DIS = 2
        const wayArr = _findWay(oldx, oldy, x, y, r)

        if (id1 && id2) {
            let cp = Array.from(wayArr)
            cp.unshift({
                x: oldx,
                y: oldy
            })
            this.saveLine[id1 + '&' + id2] = cp
        }

        this.drawAng(oldx, oldy, wayArr, r)
        this.context.moveTo(oldx, oldy)

        wayArr.forEach((item, index) => {

            this.context.lineTo(item.x + DIS, item.y)
            oldx = item.x
            oldy = item.y
            this.context.stroke()
        })
        this.context.strokeStyle = '#333'
    }
    beginPath () {
        this.context.beginPath();
    }
    clear () {
        this.context.clearRect(
            0, 
            0, 
            this.content.width, 
            this.content.height
        )
    }
    changeColor (x, y) {
        const saveLine = this.saveLine

        let flag

        for (let key in saveLine) {
            if (saveLine.hasOwnProperty(key)) {
                flag = __judInLine.call(this, x, y, saveLine[key])
            }
        }
    }
}

function __judInLine (x, y ,lineArr) {
    let disX, disY

    for (let i = 0, len = lineArr.length - 1; i < len; i++) {
        disX = lineArr[i + 1].x - lineArr[i].x,
        disY = lineArr[i + 1].y - lineArr[i].y

        if (disX === 0) {

            if (disY > 0) {

                if (
                    y >= lineArr[i].y && y <= lineArr[i + 1].y
                    &&
                    x >= lineArr[i].x && x <= lineArr[i].x + this.lineWidth * 4
                ) {
                    console.log()
                }

            } else {

                if (
                    y >= lineArr[i + 1].y && y <= lineArr[i].y
                    &&
                    x >= lineArr[i].x && x <= lineArr[i].x + this.lineWidth * 4
                ) {
                    console.log('diaole')
                }

            }

        } else if (disY === 0) {

            if (disX > 0) {

                if (
                    x >= lineArr[i].x && x <= lineArr[i + 1].x
                    &&
                    y >= lineArr[i].y && y <= lineArr[i].y + this.lineWidth * 4
                ) {
                    console.log('diaole')
                }

            } else {

                if (
                    x >= lineArr[i + 1].x && x <= lineArr[i].x
                    &&
                    y >= lineArr[i].y && y <= lineArr[i].y + this.lineWidth * 4
                ) {
                    console.log('diaole')
                }
            }

        }
    }
}

function _findWay (oldx, oldy, x, y, r) {
    let way = []

    let DIS = !r? -50 : 50

    let judOldx = oldx, judOldy = oldy,
        judx = x, judy = y

    if (!r) {

        judOldx = x
        judx = oldx

    }

    if (judx > judOldx) {
        way.push({
            x: (x - oldx) / 2 + oldx,
            y: oldy
        }, {
            x: (x - oldx) / 2 + oldx,
            y: y
        }, {
            x: x,
            y: y
        })
    } else {
        way.push({
            x: oldx + DIS,
            y: oldy,
        }, {
            x: oldx + DIS,
            y: (y - oldy) / 2 + oldy,
        }, {
            x: x - DIS,
            y: (y - oldy) / 2 + oldy,
        }, {
            x: x - DIS,
            y: y,
        }, {
            x: x,
            y: y,
        })
    }
    return way
}

function __draw () {
    for (let i = 0, len = arguments.length; i < len; i += 2) {
        if (i === 0) {
            this.context.moveTo(arguments[i], arguments[i + 1])
        } else {
            this.context.lineTo(arguments[i], arguments[i + 1])
        }
    }
    this.context.closePath()
    this.context.fill()
}


//将两个rgb值等分
function __handleRgb (rgb1, rgb2, len) {
    const matchRgb = /(\d+)/g

    const [x1, y1, z1] = rgb1.match(matchRgb),
        [x2, y2, z2] = rgb2.match(matchRgb)

    const [disX, disY, disZ] = [x2 - x1, y2 - y1, z2 - z1]

    let colorArr = []

    for (let i = 0; i < len + 1; i++) {
        colorArr.push(
            `rgb(${x1 * 1 + Math.floor(disX * i / len)},${y1 * 1 + Math.floor(disY * i / len)},${z1 * 1 + Math.floor(disZ * i / len)})`
        )
    }
    return colorArr
}
