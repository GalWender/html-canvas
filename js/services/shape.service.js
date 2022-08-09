'use strict'

var gShape = {}
// borderColor, fillColor
function createShape(pos) {
    gShape = {
        shape:gCurrShape,
        pos,
        size: 50,
        borderColor: 'blue',
        fillColor: 'white',
        isDrag: false
    }
}

function getShape() {
    return gShape
}

function isShapeClicked(clickedPos) {
    // const pos = gShape.pos
    const { pos } = gShape
    const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
    return distance <= gShape.size
}

function draggedFarEnough(clickedPos) {
    // const pos = gShape.pos
    console.log(gShape.size);
    if (gShape === null) return
    const { pos } = gShape
    if (gShape.shape === 'circle' || gShape.shape === 'triangle' || gShape.shape === 'rectangle') {
        const distance = Math.sqrt((pos.x - clickedPos.x) ** 2 + (pos.y - clickedPos.y) ** 2)
        if (distance > gShape.size) return true
    }
}

function setShapeDrag(isDrag) {
    if (gShape === null) return
    gShape.isDrag = isDrag
}

function moveShape(dx, dy) {
    gShape.pos.x += dx
    gShape.pos.y += dy
}