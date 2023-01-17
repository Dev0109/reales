// Calendar Widget
(function($) {
    "use strict";

    moment.lang('en');
    var calendars = {};
    var thisMonth = moment().format('YYYY-MM');
    var eventArray = [
        { startDate: thisMonth + '-10', endDate: thisMonth + '-14', title: 'Multi-Day Event' },
        { startDate: thisMonth + '-21', endDate: thisMonth + '-23', title: 'Another Multi-Day Event' }
    ];

    calendars.clndr1 = $('.cal').clndr({
        events: eventArray,
        weekOffset: 1,
        daysOfTheWeek: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        clickEvents: {
            click: function(target) {
                if(target.events.length > 0) {
                    var el = target.element.children[0];
                    $(el).tooltip({
                      'title': target.events[0].title
                    });
                    $(el).tooltip('show');
                }
            }
        },
        multiDayEvents: {
            startDate: 'startDate',
            endDate: 'endDate'
        },
        showAdjacentMonths: true,
        adjacentDaysChangeMonth: false,
        doneRendering: function() {
            $('.clndr-previous-button').html('<span class="fa fa-angle-left"></span>');
            $('.clndr-next-button').html('<span class="fa fa-angle-right"></span>');
            $('.clndr-table tr .day.event .day-contents').append('<span class="fa fa-circle"></span>');
        }
    });

})(jQuery);