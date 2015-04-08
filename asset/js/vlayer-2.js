$(document).ready(function () {
    $('.show-vlayer').on("click", function () {
        target = $($(this).data('target'));
        target.show();
        setTimeout(function () {
            target.addClass('in');
        }, 20);
        $(document).on('keyup', function (e) {
            if (e.which == '27') {
                target.removeClass("in");
                target.one("transitionend webkitTransitionend oTransitionend", function () {
                    target.hide();
                    $(document).off('keyup');
                });
            }
        });
    });

    $('.vlayer .vclose').on("click", function () {
        target = $(this).parents('.vlayer');
        target.removeClass("in");
        target.one("transitionend webkitTransitionend oTransitionend", function () {
            target.hide();
        });
        $(document).off('keyup');
    });

    $('.vlayer').on('click', function (e) {
        if ($(e.target).is('.vlayer')) {
            target = $(e.target);
            target.removeClass("in");
            target.one("transitionend webkitTransitionend oTransitionend", function () {
                target.hide();
            });
            $(document).off('keyup');
        }
    });
});
