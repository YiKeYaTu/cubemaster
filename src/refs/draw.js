export default class Draw {
    constructor (context, conf) {

        this.context = context
        this.context.lineWidth = conf.lineWidth
        this.context.lineJoin = conf.lineJoin
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
    lineTo (oldx, oldy, x, y, r) {
        this.context.moveTo(oldx, oldy)

        _findWay(oldx, oldy, x, y, r).forEach((item) => {
            this.context.lineTo(item.x, item.y)
        })

        this.context.stroke()
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