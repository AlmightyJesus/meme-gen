'use strict';

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function loadFromStorage(key) {
    var str = localStorage.getItem(key);
    var value = JSON.parse(str)
    return value;
}

function onShareMeme(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
          Confirm?
        </a>`
    }
    doUploadMeme(elForm, onSuccess);
}
function doUploadMeme(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })
        .then(onSuccess)
        .catch(function (error) {
            console.error(error)
        })
}
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


// //drag & drop control
// function handleMouseEv(ev) {
//     ev.preventDefault();
//     var meme = getgMeme()
//     var offsetX = gCanvas.offsetLeft;
//     var offsetY = gCanvas.offsetTop;

//     //considering alignment to determine txt location
//     function txtHitTest(x, y, txtIdx) {
//         var txt = meme.txts[txtIdx]
//         let startX;
//         let startY = txt.locY - txt.height
//         let endX;
//         let endY = txt.locY
//         if (txt.align === 'left') {
//             startX = txt.locX
//             endX = txt.locX + txt.width
//         }
//         else if (txt.align === 'center') {
//             startX = txt.locX - (txt.width / 2)
//             endX = txt.locX + (txt.width / 2)
//         }
//         else {
//             startX = txt.locX - txt.width
//             endX = txt.locX
//         }
//         return (x >= startX && x <= endX && y >= startY && y <= endY);
//     }
// }

//working drag n drop func
//     if (ev.type === 'mousedown' || ev.type === 'touchstart') {
//         //define gStarts for touch/mouse:
//         if (ev.type === 'mousedown') {
//             gStartX = parseInt(ev.clientX - offsetX);
//             gStartY = parseInt(ev.clientY - offsetY)
//         }
//         else if (ev.type === 'touchstart') {
//             gStartX = parseInt(ev.changedTouches[0].pageX - offsetX)
//             gStartY = parseInt(ev.changedTouches[0].pageY - offsetY)
//         }

//         //makes sure that the txt is pressed on when dragging it
//         for (var i = 0; i < meme.txts.length; i++) {
//             if (txtHitTest(gStartX, gStartY, i)) {
//                 meme.selectedTxtIdx = i;
//                 markTxt(meme.txts[meme.selectedTxtIdx])
//                 gIsMouseDown = true
//                 break;
//             }
//             else gIsMouseDown = false
//         }
//     }

//     if (ev.type === 'mouseup' || ev.type === 'touchend' || ev.type === 'mouseleave') gIsMouseDown = false

//     if (ev.type === 'mousemove') {

//         if (!gIsMouseDown) return

//         var txt = meme.txts[meme.selectedTxtIdx];
//         var mouseX = parseInt(ev.clientX - offsetX);
//         var mouseY = parseInt(ev.clientY - offsetY);
//         var dragX = mouseX - gStartX;
//         var dragY = mouseY - gStartY;
//         gStartX = mouseX;
//         gStartY = mouseY;
//         txt.locX += dragX;
//         txt.locY += dragY;
//         updateCanvas()
//     }
// }

// // also touch supported :D
// function dragWithTouch(ev) {
//     if (!gIsMouseDown) return
//     var rect = ev.target.getBoundingClientRect();
//     var bodyRect = document.body.getBoundingClientRect();
//     var x = ev.changedTouches[0].pageX - (rect.left - bodyRect.left);
//     var y = ev.changedTouches[0].pageY - (rect.top - bodyRect.top);
//     var touchX = parseInt(x);
//     var touchY = parseInt(y);
//     var dragX = touchX - gStartX;
//     var dragY = touchY - gStartY;
//     var meme = getgMeme()
//     var txt = meme.txts[meme.selectedTxtIdx];
//     gStartX = touchX;
//     gStartY = touchY;
//     txt.locX += dragX;
//     txt.locY += dragY;
//     updateCanvas()
// }