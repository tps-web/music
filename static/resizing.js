// js改变font-size值
(function flexible (window, document) {
    var docEl = document.documentElement
    var dpr = window.devicePixelRatio || 1

    // adjust body font size
    function setBodyFontSize () {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        }
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit () {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))

// 点击弹框和遮罩
function clickrule() {
    var otherDiv = document.getElementById('shade');
    var regular = document.getElementById("regular");
    // var  shade=document.getElementById('shade');
    otherDiv.style.display = "block";
    regular.style.display = "block";
    // shade.on('touchmove',function (e) {
    //     e.preventDefault()
    // })
    document.getElementById("body")
}

//点击遮罩隐藏弹框和遮罩
function clickshade() {
    var shade = document.getElementById('shade');
    var regular = document.getElementById("regular");
    shade.style.display = "none";
    regular.style.display = "none";
}