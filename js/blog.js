(function($) {
    "use strict";

    setTimeout(function() {
        $('body').removeClass('notransition');
    }, 300);

    if(!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)) {
        $('body').addClass('no-touch');
    }

    $('.home-navHandler').click(function() {
        $('.blog-nav').toggleClass('active');
        $(this).toggleClass('active');
    });

    //Enable swiping
    $(".carousel-inner").swipe( {
        swipeLeft:function(event, direction, distance, duration, fingerCount) {
            $(this).parent().carousel('next'); 
        },
        swipeRight: function() {
            $(this).parent().carousel('prev');
        }
    });

    $('.toggle-search').click(function() {
        $('.blog-search').toggleClass('active');
        $(this).toggleClass('active');
    });

    $('input, textarea').placeholder();

})(jQuery);