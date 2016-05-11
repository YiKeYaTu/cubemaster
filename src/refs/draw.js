export default class Draw {
    constructor (context, conf) {

        this.context = context
        this.context.lineWidth = conf.lineWidth
        this.context.lineJoin = conf.lineJoin
        this.context.strokeStyle = conf.strokeStyle
        this.content = conf.content
        this.disTop = conf.disTop
        this.disLeft = conf.disLeft

    }
    reDraw (connectIndex) {
        let child

        this.clear()

        connectIndex.forEach((item, index) => {
            while (item) {
                this.context.beginPath()
                child = item.child[0]
                child && this.lineTo(
                    item.data.pos.x + this.disLeft, 
                    item.data.pos.y + this.disTop,
                    child.data.pos.x,
                    child.data.pos.y + this.disTop,
                    true //不开启反转
                )
                item = child
            }  
        })
    }
    drawAng (beginx, beginy, wayArr) {
        const angWidth = 10, angHeight = 10, showAng = 50

        let prvX = beginx, prvY = beginy
        let disX, disY

        this.context.beginPath()
        this.context.lineJoin = 'miter'
        
        wayArr.forEach((item) => {
            disX = item.x - prvX
            disY = item.y - prvY
            if (disX === 0) { //竖

                if (Math.abs(disY) >= showAng) {

                    if (disY > 0) {
                        __draw.call(
                            this,
                            prvX - angWidth / 2, prvY + (disY - angHeight) / 2,
                            prvX + angWidth / 2, prvY + (disY - angHeight) / 2,
                            prvX, prvY + (disY + angHeight) / 2
                        )
                    } else {
                        __draw.call(
                            this,
                            prvX - angWidth / 2, prvY + (disY + angHeight) / 2,
                            prvX + angWidth / 2, prvY + (disY + angHeight) / 2,
                            prvX, prvY + (disY - angHeight) / 2
                        )
                    }

                }
                
                

            } else if (disY === 0) { //横

                if (Math.abs(disX) >= showAng) {

                    if (disX > 0) {
                        __draw.call(
                            this,
                            prvX + (disX - angWidth) / 2, prvY + (disY - angHeight) / 2,
                            prvX + (disX - angWidth) / 2, prvY + (disY + angHeight) / 2,
                            prvX + (disX + angWidth) / 2, prvY
                        )
                    } else {
                        __draw.call(
                            this,
                            prvX + (disX + angWidth) / 2, prvY + (disY - angHeight) / 2,
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
    lineTo (oldx, oldy, x, y, r) {

        const wayArr = _findWay(oldx, oldy, x, y, r)

        this.context.moveTo(oldx, oldy)

        wayArr.forEach((item) => {

            this.context.lineTo(item.x, item.y)

        })

        this.context.stroke()
        this.drawAng(oldx, oldy, wayArr)
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
    this.context.stroke()
}
