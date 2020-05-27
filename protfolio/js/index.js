/////////// 這是nav scroll顯示效果///////////
var lastScrollTop = 200;

window.addEventListener("scroll", function () {
    var nowScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (nowScrollTop > lastScrollTop) {
        $('nav').addClass('blue-grey  lighten-3 shadow')
    } else {
        $('nav').removeClass('blue-grey  lighten-3 shadow')
    }
    lastScrollTop = nowScrollTop <= 0 ? 0 : nowScrollTop; 
    // For Mobile or negative scrolling
}, false);