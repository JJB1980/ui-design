/**
 * Created by johnbowden on 19/05/15.
 */

(function () {

    var _rain = -1;

    $(document).ready(function () {

        resizeContainer();
        $(window).resize(resizeContainer);

        $('.panel').imagefill();

        playText();

        var controller = new ScrollMagic.Controller({vertical: true});

        // build tween
        var tween = new TimelineMax ()
            .add([
                TweenMax.fromTo("#parallaxText .layer1", 1, {scale: 3, autoAlpha: 0.1, bottom: -120}, {bottom: 350, ease: Linear.easeNone}),
                TweenMax.fromTo("#parallaxText .layer2", 1, {scale: 2, autoAlpha: 0.3, bottom: -150}, {bottom: 275, ease: Linear.easeNone})
            ]);

        // build scene
        new ScrollMagic.Scene({triggerElement: "#trigger1", duration: $(window).height()})
            //.setTween(tween)
            .addIndicators() // add indicators (requires plugin)
            .on("leave", function (e) {
                $('body').removeClass('backdrop1').addClass('backdrop2');
            })
            .on("enter", function (e) {
                $('body').removeClass('backdrop2').addClass('backdrop1');
            })
            .addTo(controller);

        new ScrollMagic.Scene({triggerElement: "#trigger1", duration: $(window).height()})
            //.setTween(tween)
            .addIndicators() // add indicators (requires plugin)
            .on("leave", function (e) {
                clearInterval(_rain);
                _rain = -1;
            })
            .on("enter", function (e) {
                if (_rain < 0) {
                    _rain = setInterval(makeRain, 50);
                }
            })
            .addTo(controller);

    });

    function resizeContainer() {
        //$('body').css('height', $(window).height());
        //console.log(1);
    }

    function makeRain() {
        //return;
        var str = "01";
        var win = $(window);
        var offset = getRandomInt(1, 19);
        var char = getRandomInt(0, str.length);
        var el = $('<div>');
        el.addClass('rain');
        el.css('left', (offset * 5) + '%');
        el.html(str.split('')[char]);
        var container = $('#trigger1');
        container.prepend(el);
        var cH = container.height();
        //console.log(cH);
        el.css('top', 0 +'px');
        //el.animate({
        //    top: ((cH)-el.height()) + 'px'
        //}, 5000, 'easeOutBounce', function() {
        //    el.remove();
        //});
        TweenMax.to(el, 5, { ease: Bounce.easeOut, top: cH-el.height(), onComplete: function () {
            el.remove();
        }});
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function playText() {
        var floats = $('#trigger1').find('span');
        for (var i = 0; i < floats.length; i ++) {
            //setTimeout(showText, (getRandomInt(3,8) * 1200), $(floats[i]));
            showText($(floats[i]));
        }
    }

    function showText(el) {
        //return;
        //el.addClass('show');
        el.css('opacity',0.4);
        var elW = el.width();
        var win = $(window);
        var winH = win.height();
        var winW = win.width();
        var startTop = getRandomInt(50, (winH - 100));
        var startLeft = getRandomInt(50, (winW - (50 + elW)));
        el.css('top', startTop + 'px');
        el.css('left', startLeft + 'px');
        var endTop = getRandomInt(100, 300);
        if (startTop > (winH / 2)) {
            endTop = startTop - endTop;
        } else {
            endTop = startTop + endTop;
        }
        var endLeft = getRandomInt(100, 300);
        if (startLeft > (winW / 2)) {
            endLeft = startLeft - endLeft;
        } else {
            endLeft = startLeft + endLeft;
        }
        //console.log(winH+"|"+winW+"|"+startTop+"|"+startLeft+"|"+endTop+"|"+endLeft);
        var tout = (getRandomInt(3,6) * 2000);
        setTimeout(function () {
            //el.removeClass('show');
            el.css('opacity',0);
        }, tout-1000);
        //el.animate({
        //    top: endTop + 'px',
        //    left: endLeft + 'px'
        //}, tout, 'linear', function() {
        //    setTimeout(showText, (getRandomInt(1,5) * 1000), el);
        //});
        //TweenMax.to(el, 1, { opacity: 0 });
        TweenMax.to(el, (tout/1000), { ease: Power0.easeNone, top: endTop, left: endLeft, onComplete: function () {
            setTimeout(showText, getRandomInt(1,5) * 1000, el);
        }});
    }

})();









