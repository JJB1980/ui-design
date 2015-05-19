/**
 * Created by johnbowden on 19/05/15.
 */

(function () {

    $(document).ready(function () {

        resizeContainer();
        $(window).resize(resizeContainer);

    });

    function resizeContainer() {
        $('section').css('height', $(window).height());
    }


})();