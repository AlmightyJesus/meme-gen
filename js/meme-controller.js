'use strict';
var gCanvas;
var gCtx;
var gImg;
var gIsMouseDown = false
var gStartX;
var gStartY;
var gTimerTimeout;

function initCanvas() {
    var imgData = loadImgData()
    createImgs()
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    for (let i = 0; i < 7; i++) {
        resizeCanvas()
    }
    drawImg(imgData.imgUrl)
    gMeme = creategMeme(imgData.id, gCanvas)
    renderGallery()
    setCtx()
    setTimeout(updateCanvas, 200)
    showInput()
}

function setCtx() {
    gCtx.textAlign = 'center'
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = '3'
    gCtx.font = '30px Impact'
}

function renderCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    var imgUrl = loadImgUrl()
    drawImg(imgUrl)
}

function initHomepage() {
    createImgs()
    renderImgs()
}

function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function updateCanvas() {
    var meme = getgMeme()
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);

    meme.txts.forEach(txt => {
        drawTxt(txt, txt.locX, txt.locY);
    });
}

function drawTxt(txt, x, y) {
    gCtx.fillStyle = txt.color
    gCtx.strokeStyle = txt.outlineColor
    gCtx.textAlign = txt.align;
    gCtx.lineWidth = txt.lineWidth
    gCtx.setLineDash([0]);
    gCtx.font = `${txt.size}px ${txt.font}`;
    gCtx.fillText(txt.line, x, y);
    gCtx.strokeText(txt.line, x, y);
    txt.width = gCtx.measureText(txt.line).width;
    txt.height = txt.size
}

function drawRect(startX, startY, endX, endY) {
    gCtx.beginPath()
    gCtx.setLineDash([8]);
    gCtx.rect(startX, startY, endX, endY)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.closePath()
}

function drawImg(imgUrl) {
    var img = new Image();
    img.src = imgUrl
    gImg = img
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'Nice-Canvas.jpg'
}

function renderGallery() {
    var imgs = getImgs()
    var elImgsContainer = document.querySelector('.imgs')
    var strHTMLs = imgs.map(img =>
        `<img class="meme-gallery-img" src="${img.imgUrl}" alt="${img.keywords.join('')}"
        onclick="onChooseImg(${img.id},'change')">`
    )
    elImgsContainer.innerHTML = strHTMLs.join('')
}

function toggleGallery() {
    var items = document.querySelectorAll('.panel-item')
    for (let i = 0; i < items.length; i++) {
        items[i].classList.toggle('hide')
    }
    document.querySelector('.btns').classList.toggle('hide')
    document.querySelector('.panel').classList.toggle('scroll')
    document.querySelector('.imgs').classList.toggle('hide')
    setTimeout(() => {
        document.querySelector('.imgs').classList.toggle('img-hide')

    }, 1);
}


function renderImgs() {
    var imgs = getImgs()
    var elImgsContainer = document.querySelector('.opening-gallery')
    var strHTMLs = imgs.map(img =>
        `<img class="meme-img" src="${img.imgUrl}" alt="${img.keywords.join('')}"
        onclick="onChooseImg(${img.id},'choose')">`
    )
    elImgsContainer.innerHTML = strHTMLs.join('')
}

function onChooseImg(imgId, action) {
    var imgs = getImgs()
    var img = imgs.find(img => img.id === imgId)
    var imgData = { imgUrl: img.imgUrl, id: imgId }
    saveImgData(imgData)
    if (action === 'choose') window.open('generator.html')
    else if (action === 'change') {
        drawImg(img.imgUrl)
        setTimeout(updateCanvas, 50)
        toggleGallery()
    }
}


function handleBtns(action) {
    var meme = getgMeme()

    switch (action) {
        case 'switch':
            onSwitchTxt()
            break;
        case 'add':
            onAddTxt()
            break;
        case 'remove':
            onRemoveTxt()
            break;
        case 'increase':
            changeSize(meme, action)
            break;
        case 'decrease':
            changeSize(meme, action)
            break;
        case 'left':
            changeAlignment(meme, action)
            break;
        case 'center':
            changeAlignment(meme, action)
            break;
        case 'right':
            changeAlignment(meme, action)
            break;
        case 'up':
            moveImg(meme, action)
            break;
        case 'down':
            moveImg(meme, action)
            break;

        default:
            break;
    }
}

function updateTxt(txt) {
    var meme = getgMeme()
    meme.txts[meme.selectedTxtIdx].line = txt
    updateCanvas()
}

function changeSize(meme, action) {
    if (action === 'increase') meme.txts[meme.selectedTxtIdx].size += 3
    else meme.txts[meme.selectedTxtIdx].size -= 3
    updateCanvas()
    showInput()
}

function onAddTxt() {
    addTxt(gCtx, gCanvas)
    showInput()
    updateCanvas()
}

function onSwitchTxt() {
    var meme = getgMeme()
    updateTxtIdx()
    var txt = meme.txts[meme.selectedTxtIdx]
    markTxt(txt)
    showInput()
}

//mark text on select
function markTxt(txt) {
    updateCanvas()
    clearTimeout(gTimerTimeout)
    let startX;
    let startY;
    let endX = (txt.width) + 10
    let endY = (txt.height) + 5
    if (txt.align === 'left') {
        startX = txt.locX - 5;
        startY = txt.locY - txt.height + 5;
    }
    else if (txt.align === 'center') {
        startX = txt.locX - (txt.width / 2) - 5;
        startY = txt.locY - txt.height + 5;
    }
    else {
        startX = txt.locX - (txt.width) - 5;
        startY = txt.locY - (txt.height) + 5;
    }
    drawRect(startX, startY, endX, endY)
    gTimerTimeout = setTimeout(() => {
        gCtx.clearRect(startX, startY, endX, endY)
        updateCanvas()
    }, 3000);
    showInput()
}

function selectInput() {
    var meme = getgMeme()
    var elInput = document.querySelector('.meme-txt')
    elInput.value = meme.txts[meme.selectedTxtIdx].line
    elInput.select()
}

function showInput() {
    var meme = getgMeme()
    var elInput = document.querySelector('.meme-txt')
    elInput.value = meme.txts[meme.selectedTxtIdx].line

}

function onRemoveTxt() {
    removeTxt()
    updateCanvas()
}

function changeAlignment(meme, action) {
    var x;
    var currTxt = meme.txts[meme.selectedTxtIdx]
    if (action === 'left') x = 50
    else if (action === 'center') x = gCanvas.width / 2
    else if (action === 'right') x = gCanvas.width - 50
    currTxt.align = action
    currTxt.locX = x
    updateCanvas()
    showInput()
}

function changeFont(font) {
    var meme = getgMeme()
    meme.txts[meme.selectedTxtIdx].font = font
    updateCanvas()
    showInput()
}

function changeStrokeColor(color) {
    var meme = getgMeme()
    meme.txts[meme.selectedTxtIdx].outlineColor = color
    updateCanvas()
    document.querySelector('#stroke').value = "#ffffff"
}

function changeFillColor(color) {
    var meme = getgMeme()
    meme.txts[meme.selectedTxtIdx].color = color
    updateCanvas()
    document.querySelector('#fill').value = "#ffffff"
}

//not implemented no time :/
function drawSticker(imgUrl) {
    var img = new Image();
    img.src = imgUrl
    img.onload = () => {
        gCtx.drawImage(img, 30, 30, 100, 100)
    }
}

function moveImg(meme, action) {
    var y;
    if (action === 'up') {
        y = -10
    }
    else y = 10
    meme.txts[meme.selectedTxtIdx].locY += y
    updateCanvas()
}

function moveToGallery() {
    window.open('index.html')
}

//drag & drop control
function handleMouseEv(ev) {
    ev.preventDefault();
    var meme = getgMeme()
    var offsetX = gCanvas.offsetLeft;
    var offsetY = gCanvas.offsetTop;

    //considering alignment to determine txt location
    function textHittest(x, y, txtIdx) {
        var txt = meme.txts[txtIdx]
        let startX;
        let startY = txt.locY - txt.height
        let endX;
        let endY = txt.locY
        if (txt.align === 'left') {
            startX = txt.locX
            endX = txt.locX + txt.width
        }
        else if (txt.align === 'center') {
            startX = txt.locX - (txt.width / 2)
            endX = txt.locX + (txt.width / 2)
        }
        else {
            startX = txt.locX - txt.width
            endX = txt.locX
        }
        return (x >= startX && x <= endX && y >= startY && y <= endY);
    }

    if (ev.type === 'mousedown' || ev.type === 'touchstart') {
        //define gStarts for touch/mouse:
        if (ev.type === 'mousedown') {
            gStartX = parseInt(ev.clientX - offsetX);
            gStartY = parseInt(ev.clientY - offsetY)
        }
        else if (ev.type === 'touchstart') {
            gStartX = parseInt(ev.changedTouches[0].pageX - offsetX)
            gStartY = parseInt(ev.changedTouches[0].pageY - offsetY)
        }


        //makes sure that the txt is pressed on when dragging it
        for (var i = 0; i < meme.txts.length; i++) {
            if (textHittest(gStartX, gStartY, i)) {
                meme.selectedTxtIdx = i;
                markTxt(meme.txts[meme.selectedTxtIdx])
                gIsMouseDown = true
                break;
            }
            else gIsMouseDown = false

        }
    }

    if (ev.type === 'mouseup' || ev.type === 'touchend' || ev.type === 'mouseleave') gIsMouseDown = false

    if (ev.type === 'mousemove') {

        if (!gIsMouseDown) return

        var txt = meme.txts[meme.selectedTxtIdx];
        var mouseX = parseInt(ev.clientX - offsetX);
        var mouseY = parseInt(ev.clientY - offsetY);
        var dragX = mouseX - gStartX;
        var dragY = mouseY - gStartY;
        gStartX = mouseX;
        gStartY = mouseY;
        txt.locX += dragX;
        txt.locY += dragY;
        updateCanvas()
    }
}

// also touch supported :D
function dragWithTouch(ev) {
    if (!gIsMouseDown) return
    var rect = ev.target.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();
    var x = ev.changedTouches[0].pageX - (rect.left - bodyRect.left);
    var y = ev.changedTouches[0].pageY - (rect.top - bodyRect.top);
    var touchX = parseInt(x);
    var touchY = parseInt(y);
    var dragX = touchX - gStartX;
    var dragY = touchY - gStartY;
    var meme = getgMeme()
    var txt = meme.txts[meme.selectedTxtIdx];
    gStartX = touchX;
    gStartY = touchY;
    txt.locX += dragX;
    txt.locY += dragY;
    updateCanvas()
}
