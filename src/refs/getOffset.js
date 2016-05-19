let getOffset = (context) => {
    let left, top

    left = top = 0

    while (context) {
        left += context.offsetLeft
        top += context.offsetTop
        context = context.offsetParent
    }
    
    return {
        x: left,
        y: top
    }
}

export default getOffset