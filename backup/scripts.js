/**
 * Created by johnbowden on 19/05/15.
 */

(function () {

    var _rain;

    $(document).ready(function () {

        resizeContainer();
        $(window).resize(resizeContainer);

        _rain = setInterval(makeRain,50);

        var controller = new ScrollMagic.Controller({vertical: true});

        // build tween
        var tween = new TimelineMax ()
            .add([
                TweenMax.fromTo("#parallaxText .layer1", 1, {scale: 3, autoAlpha: 0.1, bottom: -120}, {bottom: 350, ease: Linear.easeNone}),
                TweenMax.fromTo("#parallaxText .layer2", 1, {scale: 2, autoAlpha: 0.3, bottom: -150}, {bottom: 275, ease: Linear.easeNone})
            ]);

        // build scene
        var scene = new ScrollMagic.Scene({triggerElement: "#trigger2", duration: $(window).height()})
            .setTween(tween)
            .addIndicators() // add indicators (requires plugin)
            .on("leave", function (e) {
                clearInterval(_rain);
                _rain = -1;
                $('body').removeClass('backdrop1').addClass('backdrop2');
            })
            .on("enter", function (e) {
                $('body').removeClass('backdrop2').addClass('backdrop1');
                if (_rain < 0) {
                    _rain = setInterval(makeRain, 50);
                }
            })
            .addTo(controller);



    });

    function resizeContainer() {
        $('section').css('height', $(window).height());
        //console.log(1);
    }

    function makeRain() {
        var str = "01";
        var win = $(window);
        var offset = getRandomInt(1, 19);
        var char = getRandomInt(0, str.length);
        var el = $('<div>');
        el.addClass('rain');
        el.css('left', (offset * 5) + '%');
        el.html(str.split('')[char]);
        $('body').prepend(el);
        el.animate({
            top: (win.height()-el.height()) + 'px'
        }, 5000, 'easeOutBounce', function() {
            el.remove();
        });
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

})();