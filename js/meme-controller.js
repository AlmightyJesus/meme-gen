'use strict';
var gCanvas;
var gCtx;
var gImg;

function initCanvas() {
    var imgData = loadImgData()
    createImgs()
    gMeme = creategMeme(imgData.id)

    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    for (let i = 0; i < 7; i++) {
        resizeCanvas()
    }
    drawImg(imgData.imgUrl)
    renderGallery()
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
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);

    gMeme.txts.forEach(function (txt) {
        drawTxt(txt, txt.locX, txt.locY);
    });
}


function drawTxt(txt, x, y) {
    gCtx.fillStyle = txt.color
    gCtx.strokeStyle = 'black'
    gCtx.textAlign = txt.align;
    gCtx.lineWidth = 5
    gCtx.font = `${txt.size}px ${txt.font}`;
    gCtx.fillText(txt.line, x, y);
    gCtx.strokeText(txt.line, x, y);
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
    var imgData = { imgUrl: img.imgUrl, id: imgId }
    saveImgData(imgData)
    window.open('generator.html')
}

function updateTxt(txt, txtIdx) {
    var meme = getgMeme()
    meme.txts[0].line = txt
    updateCanvas()

    // need to figure out idx usage

}
function handleEvent(el) {
    gMeme.txts[0].size += 4
    el.focus()
    updateCanvas()
    document.querySelector('.meme-txt').focus()
    //figure out a way to not use this global every time
    // 2moro will handle all events - mb switch case or short ifs..

}

function onAddTxt(){
    addTxt(gCtx,gCanvas)
    console.log(gMeme);
    updateCanvas()
    
}






















// for later - to enable text click to select idx
// function canvasClicked(ev) {
//     var meme = getgMeme()
//     // console.log(ev.clientX);
//     // console.log(ev.clientY);
//     var txt = meme.txts[0]
//     console.log(gCtx.measureText(txt));
//     console.log(gMeme);



    // TODO: find out if clicked inside of star chart
    // let clickedTxt = meme.txts.find(txt => {
    //   return (
    //     ev.clientX > txt.x &&
    //     ev.clientX < txt.x + gBarWidth &&
    //     ev.clientY > txt.y &&
    //     ev.clientY < txt.y + txt.rate * gHeightFactor
    //   )
    // })

    // TODO: open the modal on the clicked coordinates if found a click on a star,
    //       close the modal otherwise
    // if (clickedStar) openModal(clickedStar.name, clickedStar.rate, ev.clientX, ev.clientY)
    // else closeModal()
//   }