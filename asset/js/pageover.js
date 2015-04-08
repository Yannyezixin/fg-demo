$(document).ready(function () {
    slens = $('.section').length;
    curSide = 0;
    $('body').on('mousewheel', function (event, delta) {
        if (!$('.animating')[0]) {
            container = $('.container');
            container.removeClass('s'+curSide);
            if (delta < 0) {
                curSide = (curSide + 1)%slens;
            } else {
                curSide = (curSide - 1 + slens)%slens;
            }
            child = container.children().eq(curSide);
            child.addClass('animating');
            container.addClass('s'+curSide);
            container.one('transitionend webkitTransitionend', function () {
                child.removeClass('animating');
            });
        }
    });
});
