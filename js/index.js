/**
 * Created by xin on 2019-03-19.
 */
adjustVideoBox();
$(".video").on("loadedmetadata", adjustVideoBox)
$(window).on("resize", adjustVideoBox)
function adjustVideoBox(){
    var video = $(".video")
    var videoEl = $(".video")[0]
        , b = '1920'
        , c = '1080'
        , d = videoEl.parentNode.clientWidth
        , e = videoEl.parentNode.clientHeight;
    videoEl.playbackRate = 0.5;
    if (b && c && d && e ){
        if (b / c > d / e) {
            var f = e
                , g = b / c * e;
            video.css("left", d / 2 - g / 2),
                video.css("width", g),
                video.css("height", f)
        } else{
            video.css("left", ""),
                video.css("width", ""),
                video.css("height", "")
        }

    }
}

$(function(){
    var windowHeight = $(window).height(); //窗口高度
    var element;
    var ON_SCREEN_HEIGHT =50;
    var ON_SCREEN_WIDTH = 50;

    var dataAnimateEl = $('[data-animate]');
    if (dataAnimateEl.length > 0 || dataAnimateEl.length == 0) {
        dataAnimateEl.each(function() {
            element = $(this);
            // 元素在可视区域，即刻开始动画
            animationStart(element);
        })
    }

    // 监听页面滚动，开始动画
    $(window).scroll(function(event) {
        var dataAnimateEl = $('[data-animate]');
        if (dataAnimateEl.length > 0 || dataAnimateEl.length == 0) {
            dataAnimateEl.each(function() {
                element = $(this);
                // 元素在可视区域，即刻开始动画
                animationStart(element);
            })
        };

        fixedNav();
        checkScroll();
        checkBanner();
    });

    //第一页 banner动画
    checkBanner();
    function checkBanner(){
        var bannerContent = $(".banner-content");
        if(isOnScreen(bannerContent)){
            bannerContent.addClass("isview");
        }else{
            bannerContent.removeClass("isview");
        }
    };
    //元素是否在屏幕上
    function isOnScreen(element) {

        element = element.get(0);
        var rect = element.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        var windowWidth = window.innerWidth || document.documentElement.clientWidth;

        var elementHeight = element.offsetHeight;
        var elementWidth = element.offsetWidth;
        var onScreenHeight = ON_SCREEN_HEIGHT > elementHeight ? elementHeight : ON_SCREEN_HEIGHT;
        var onScreenWidth = ON_SCREEN_WIDTH > elementWidth ? elementWidth : ON_SCREEN_WIDTH;
        // 元素在屏幕上方
        var elementBottomToWindowTop = rect.top + elementHeight;
        var bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;

        // 元素在屏幕下方
        var elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
        var topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;

        // 元素在屏幕左侧
        var elementRightToWindowLeft = rect.left + elementWidth;
        var rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;

        // 元素在屏幕右侧
        var elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
        var leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;

        return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen && leftBoundingOnScreen;
    };
    //开始动画 有自定义属性animate
    function animationStart(element) {
        var annimationVal = element.data("animate");
        if (isOnScreen(element)) {
            console.log(annimationVal);
            // setTimeout(function () {
            element.removeClass(annimationVal).addClass("animated").addClass(annimationVal);
            // },0)

        } else {
            element.removeClass("animated").removeClass(annimationVal);
        }
    }
})

//评价

var swiper = new Swiper('.swiper-container', {
    watchSlidesProgress: true,
    slidesPerView:'auto',
    centeredSlides: true,
    loop: true,
    loopedSlides: 3,
    // autoplay: true,
    slideToClickedSlide: true,
    on: {
        progress: function(progress) {
            for (i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i);
                var slideProgress = this.slides[i].progress;
                modify = 1;
                if (Math.abs(slideProgress) > 1) {
                    modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                }
                translate = slideProgress * modify * 25 + 'px';
                scale = 1 - Math.abs(slideProgress) / 10;
                zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                slide.transform('translateX(' + translate + ') scaleY(' + scale + ')');
                slide.css('zIndex', zIndex);
                slide.css('opacity', 1);
                if (Math.abs(slideProgress) > 3) {
                    slide.css('opacity', 0);
                }
            }
        },
        setTransition: function(transition) {
            for (var i = 0; i < this.slides.length; i++) {
                var slide = this.slides.eq(i)
                slide.transition(transition);
            }

        }
    }

})
/*固定异航栏*/
function fixedNav(){
    var functionsEl =  $("#functions");
    var top = functionsEl.offset().top;
    var scrollTop = $(window).scrollTop();
    var height = $(".header").height();

    if(scrollTop+height >= top){
        $(".header-wrapper").addClass("fixed-header");
    }else{
        $(".header-wrapper").removeClass("fixed-header");

    }
}
/*至下一页*/
$("#arrow").click(function(){
    animateToFuntion();
})

function animateToFuntion(){
    var functionsEl =  $("#functions");
    var top = functionsEl.offset().top;
    var height = $(".header").height();
    $('body,html').animate({scrollTop:top-height+80},500);
};

/*检查侧边栏  右下角回到顶部的显示与隐藏*/
function checkScroll(){
    var top = $(".main-banner").offset().top;
    var scrollTop = $(window).scrollTop();
    var height = $(".main-banner").height();
    if(scrollTop < top+height/2){
        $(".fixed-top").fadeOut();
    }else{
        $(".fixed-top").fadeIn();

    }

};

//置顶
$("#goTop").click(function(){
    $('body,html').animate({scrollTop:0},500);
})