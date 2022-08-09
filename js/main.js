'use strict'

var gElCanvas
var gCtx
var gStartPos
var gCurrShape
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addListeners()
    onSetShape()
}

function onSetColors(ev, elForm) {
    SetColors(ev, elForm)
}

function onSetShape(shape = 'circle') {
    console.log(shape)
    setShape(shape)
    //need to save to storage
}

function renderCanvas() {
    // gCtx.fillStyle = "black"
    // gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
    renderShape()
}

function renderShape() {
    const shape = getShape()
    // console.log(circle.pos)
    // if(circle.pos ===undefined){return}
    const { pos } = shape
    loadPrefFromStorage()
    // drawArc(pos.x, pos.y)

    switch (gCurrShape) {
        case 'circle':
            drawArc(pos.x, pos.y);
            break;
        case 'triangle':
            drawTriangle(pos.x, pos.y);
            break;
        case 'rectangle':
            drawRect(pos.x, pos.y);
            break;
        // case 'text':
        //     drawText('שלום', offsetX, offsetY);
        //     break;
        case 'line':
            drawLine(pos.x, pos.y);
            break;
    }
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        // resizeCanvas()
        // const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        // createCircle(center)
        // renderCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    console.log(gShape)
    // renderCircle()
    // Getting the clicked position
    const pos = getEvPos(ev)
    createShape(pos)
    // { x: 15, y : 15 }
    setShapeDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // document.body.style.cursor = 'grabbing'
    const shape = getShape();
    // console.log(circle)
    if (shape === null) return
    if (!shape.isDrag) return
    const pos = getEvPos(ev)
    if (gShape.shape === 'circle') {
        if (draggedFarEnough(pos)) {
            const dx = pos.x - gStartPos.x
            const dy = pos.y - gStartPos.y
            moveShape(dx, dy)
            gStartPos = pos
            renderCanvas()
        }
    }
    if (gShape.shape === 'triangle') {
        if (draggedFarEnough(pos)) {
            const dx = pos.x - gStartPos.x
            const dy = pos.y - gStartPos.y
            moveShape(dx, dy)
            gStartPos = pos
            renderCanvas()
        }
    }
    if (gShape.shape === 'rectangle') {
        if (draggedFarEnough(pos)) {
            const dx = pos.x - gStartPos.x
            const dy = pos.y - gStartPos.y
            moveShape(dx, dy)
            gStartPos = pos
            renderCanvas()
        }
    }
    if (gShape.shape === 'line') {
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        moveShape(dx, dy)
        gStartPos = pos
        renderCanvas()
    }
}

function onUp() {
    setShapeDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 100
    gElCanvas.height = elContainer.offsetHeight - 100

}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = '2'
    gCtx.arc(x, y, gShape.size, 0, 2 * Math.PI)
    gCtx.strokeStyle = gShape.borderColor
    gCtx.stroke()
    gCtx.fillStyle = gShape.fillColor
    gCtx.fill()
    // gCtx.endPath()
}

function drawLine(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(x, y);
    gCtx.lineTo(x+1, y-1);
    gCtx.strokeStyle = gShape.borderColor;
    gCtx.stroke();
    gCtx.closePath();
}

function drawTriangle(x, y) {
    gCtx.beginPath();
    gCtx.lineWidth = 2;
    gCtx.moveTo(x, y);
    gCtx.lineTo(x + 50, y + 50);
    gCtx.lineTo(x - 50, y + 50);
    gCtx.lineTo(x, y);
    gCtx.fillStyle = gShape.fillColor;
    gCtx.fill();
    gCtx.strokeStyle = gShape.borderColor;
    gCtx.stroke();
    gCtx.closePath();
}

function drawRect(x, y) {
    console.log('hello')
    gCtx.beginPath();
    // gCtx.rect(x, y, 50, 50);
    gCtx.rect(x - 25, y - 25, 50, 50)
    gCtx.fillStyle = gShape.fillColor;
    gCtx.fillRect(x - 25, y - 25, 50, 50)
    gCtx.strokeStyle = gShape.borderColor;
    gCtx.stroke();
    gCtx.closePath();
}

function drawText(txt, x, y) {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle';
    gCtx.textAlign = 'center';
    gCtx.lineWidth = 1;
    gCtx.font = '40px david';
    gCtx.fillStyle = 'yellow';
    gCtx.fillText(txt, x, y);
    gCtx.strokeStyle = 'green';
    gCtx.strokeText(txt, x, y);
    gCtx.closePath()
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gElCanvas.width / 2, gElCanvas.height / 2);
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-canvas';
}
