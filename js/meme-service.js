'use strict';
var gNextId = 101
var gImgs;
var gMeme;
// var gMeme = {
//     selectedImgId: 5,
//     selectedTxtIdx: 0,
//     txts:
//         [{
//             line: 'I never eat Falafel',
//             size: 70,
//             align: 'left',
//             color: 'red'
//         }]
// }

function createImgs() {
    if (gImgs) gNextId = gImgs[gImgs.length - 1].id + 1;
    var imgs = [
        createImg('img/img2.JPG', ['dance,', 'funny']),
        createImg('img/9.JPG', ['baby,', 'funny', 'cruel']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny'])

    ]
    gImgs = imgs
}

function createImg(imgUrl, keywords) {
    return {
        id: gNextId++,
        imgUrl,
        keywords
    }
}

function creategMeme(imgId) {
    return {
        selectedImgId: imgId,
        selectedTxtIdx: 0,
        txts:
            [{
                line: 'Enter text Here',
                size: 50,
                align: 'left',
                color: 'red',
                font: 'Impact',
                lineWidth: 5,
                locY: 60,
                locX: 80
            }]
    }
}

function addTxt(ctx, canvas) {
    var newTxt = {
        line: 'Enter text Here',
        size: gMeme.txts[0].size,
        align: ctx.textAlign,
        color: ctx.fillStyle,
        font: gMeme.txts[0].font,
        lineWidth: ctx.lineWidth,
        locY: canvas.height - 30,
        locX: 80
    }
    gMeme.txts.push(newTxt)
}

function saveImgData(imgData) {
    saveToStorage('img-Data', imgData)
}

function loadImgData() {
    return loadFromStorage('img-Data')
}

function getImgs() {
    return gImgs
}

function getgMeme() {
    return gMeme
}