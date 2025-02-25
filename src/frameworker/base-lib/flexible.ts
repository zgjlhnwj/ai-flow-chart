(function (doc, win) {
    // PC端的设计稿一般是width：1920px，height：auto（这里指的是不确定），100vw = 100%，这个也没有问题吧；那么，设计稿拿过来，我们可以得出：1920px = 100vw，这个也没有问题吧，那么1px等于多少vw呢？ 是不是 1px = 100 / 1920 vw = 0.05208333vw；那么100px = 多少vw呢， 100px = 0.05208333vw * 100，所以。100px = 5.20vw
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = 1366;
        var innerWidth = window.innerWidth; // 当前窗口的宽度
        if (!clientWidth) return;
        docEl.style.fontSize = (100 / clientWidth) * innerWidth + 'px';
      };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);