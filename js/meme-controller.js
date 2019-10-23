'use strict';
var gCanvas;
var gCtx;

function initCanvas() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    renderImgs()
    renderGallery()
    // resizeCanvas()
    // drawImg(imgUrl)
    // gCtx.globalCompositeOperation = 'destination-out'

}



function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function drawText(txt, x, y) {
    gCtx.fillStyle = 'white'
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 5
    gCtx.font = "70px Impact";
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function drawImg(imgUrl) {
    var img = new Image();
    img.src = imgUrl
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
        onclick="onChooseImg(${img.id})">`
    )
    elImgsContainer.innerHTML = strHTMLs.join('')
}

function renderImgs() {
    var imgs = getImgs()
    var elImgsContainer = document.querySelector('.opening-gallery')
    var strHTMLs = imgs.map(img =>
        `<img class="meme-img" src="${img.imgUrl}" alt="${img.keywords.join('')}"
        onclick="onChooseImg(${img.id})">`
    )
    elImgsContainer.innerHTML = strHTMLs.join('')
}

function onChooseImg(imgId) {
    var imgs = getImgs()
    var img = imgs.find(img => img.id === imgId)
    drawImg(img.imgUrl)
    document.querySelector('.container').classList.remove('hide')
    document.querySelector('.opening-gallery').classList.add('hide')
    // console.log(img.imgUrl);
}

function renderTxt(txt, x, y) {

    drawText(txt, 80, 80)

}

