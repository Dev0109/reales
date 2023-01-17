(function($) {
    "use strict";

    setTimeout(function() {
        $('body').removeClass('notransition');
    }, 300);

    if(!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
        $('body').addClass('no-touch');
    }

    $('#signup').modal({
        backdrop: 'static',
        keyboard: false
    }).modal('show');

    $('input, textarea').placeholder();

})(jQuery);