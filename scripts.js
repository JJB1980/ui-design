/**
 * Created by John on 5/05/2015.
 */

(function () {

    $(document).ready(function () {

        resizeContainer();
        $(window).resize(resizeContainer);
        $('#container').perfectScrollbar({suppressScrollX: true});

        var nodes = $('#header').find('span');
        for (var i = 0; i < nodes.length; i++) {
            window.setTimeout(function (el) {
                $(el).animate({ left: '0px' }, 1500, 'easeOutBack', function () { });
            }, (i*200), nodes[i]);
        }

        var media = $('#social-media').find('div');
        for (var j = 0; j < media.length; j++) {
            window.setTimeout(function (el) {
                $(el).animate({ top: '0px' }, 1500, 'easeOutBounce', function () { });
            },(1500+(j*200)), media[j]);
        }

        $('#container').scroll(function () {
            console.log($('body').scrollTop);
        });

        $('#header').toggleClass('header-fade');

    });

    function resizeContainer() {
        $('#container').css('height', $(window).height());
    }

})();