$(document).ready(function () {
    slens = $('.section').length;
    curSide = 0;
    $('body').on('mousewheel', function (event, delta) {
        $('.container').removeClass('s'+curSide);
        if (delta < 0) {
            curSide = (curSide + 1)%slens;
        } else {
            curSide = (curSide - 1 + slens)%slens;
        }
        $('.container').addClass('s'+curSide);
        console.log(curSide);
    });
});
