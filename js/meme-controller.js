'use strict';
var gCanvas;
var gCtx;
var gImg;

function initCanvas() {
    var imgData = loadImgData()
    createImgs()
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d')
    for (let i = 0; i < 7; i++) {
        resizeCanvas()
    }
    gMeme = creategMeme(imgData.id, gCanvas)
    drawImg(imgData.imgUrl)
    renderGallery()
    setCtx()
    setInterval(() => {
        updateCanvas()
    }, 100)
    selectInput()
}

function setCtx() {
    gCtx.textAlign = 'center'
    gCtx.fillStyle = 'white'
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
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height);

    gMeme.txts.forEach(function (txt) {
        drawTxt(txt, txt.locX, txt.locY);
    });
}

function drawTxt(txt, x, y) {
    gCtx.fillStyle = txt.color
    gCtx.strokeStyle = 'black'
    gCtx.textAlign = txt.align;
    gCtx.lineWidth = txt.lineWidth
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
    var size = meme.txts[meme.selectedTxtIdx].size
    updateCanvas()
    document.querySelector('.meme-txt').focus()
}

function onAddTxt() {
    addTxt(gCtx, gCanvas)
    selectInput()
    updateCanvas()
}

function onSwitchTxt() {
    updateTxtIdx()
    selectInput()
}

function selectInput() {
    var meme = getgMeme()
    var elInput = document.querySelector('.meme-txt')
    elInput.value = meme.txts[meme.selectedTxtIdx].line
    elInput.select()
}

function onRemoveTxt() {
    removeTxt()
    updateCanvas()
}

function changeAlignment(meme, action) {
    if (action === 'left') {
        meme.txts[meme.selectedTxtIdx].align = 'left'
        meme.txts[meme.selectedTxtIdx].locX = 50
    }
    if (action === 'center') {
        meme.txts[meme.selectedTxtIdx].align = 'center'
        meme.txts[meme.selectedTxtIdx].locX = gCanvas.width / 2
    }
    if (action === 'right') {
        meme.txts[meme.selectedTxtIdx].align = 'right'
        meme.txts[meme.selectedTxtIdx].locX = gCanvas.width - 50
    }
    updateCanvas()
}

function changeFont(font) {
    var meme = getgMeme()
    meme.txts[meme.selectedTxtIdx].font = font
    updateCanvas()
    selectInput()

}

// function setFontData(size, fontFamily) {
//     var fontData = gCtx.font.split(' ')
//     size = + fontData[0].slice(0, -2)
//     fontFamily = fontData[1]

//     gCtx.font = `${size}` 
// }





















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