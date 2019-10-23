'use strict';
var gNextId = 101
var gImgs;
var gMeme = {
    selectedImgId: 5, selectedTxtIdx: 0, txts: [{ line: 'I never eat Falafel', size: 20, align: 'left', color: 'red' }]
}

createImgs()

function createImgs() {
    if (gImgs) gNextId = gImgs[gImgs.length - 1].id + 1;


    var imgs = [
        createImg('img/img2.JPG', ['dance,', 'funny']),
        createImg('img/9.JPG', ['baby,', 'funny','cruel']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny']),
        createImg('img/meme1.JPG', ['matrix,', 'funny'])
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny']),
        // createImg('img/meme1.JPG', ['matrix,', 'funny'])
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

function getImgs() {
    return gImgs
}