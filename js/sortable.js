(function($) {
    "use strict";

    $(".sortable").sortable({
        placeholder: "list-group-item list-group-item-placeholder"
    });
    $(".sortable").disableSelection();

    $('ol.list-ns').nestedSortable({
        forcePlaceholderSize: true,
        handle: 'div',
        helper: 'clone',
        items: 'li',
        opacity: .7,
        placeholder: 'list-ns-placeholder',
        tabSize: 25,
        tolerance: 'pointer',
        toleranceElement: '> div',
        maxLevels: 3,
        branchClass: 'list-ns-branch',
        collapsedClass: 'list-ns-collapsed',
        disableNestingClass: 'list-ns-no-nesting',
        errorClass: 'list-ns-error',
        expandedClass: 'list-ns-expanded',
        hoveringClass: 'list-ns-hovering',
        leafClass: 'list-ns-leaf',
        disabledClass: 'list-ns-disabled',
        isTree: true,
        expandOnHover: 700,
        startCollapsed: true
    });

    $('ol.list-ns-1').nestedSortable({
        forcePlaceholderSize: true,
        handle: 'span.list-ns-handler',
        helper: 'clone',
        items: 'li',
        opacity: .7,
        placeholder: 'list-ns-placeholder',
        tabSize: 25,
        tolerance: 'pointer',
        toleranceElement: '> div',
        maxLevels: 3,
        branchClass: 'list-ns-branch',
        collapsedClass: 'list-ns-collapsed',
        disableNestingClass: 'list-ns-no-nesting',
        errorClass: 'list-ns-error',
        expandedClass: 'list-ns-expanded',
        hoveringClass: 'list-ns-hovering',
        leafClass: 'list-ns-leaf',
        disabledClass: 'list-ns-disabled',
        isTree: true,
        expandOnHover: 700,
        startCollapsed: true
    });

    $('.disclose').on('click', function() {
        $(this).closest('li').toggleClass('list-ns-collapsed').toggleClass('list-ns-expanded');
    });

})(jQuery);