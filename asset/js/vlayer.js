$(document).ready(function () {
    $('#show-vlayer').click(function () {
        $('.vlayer').toggle();
        $('.vlayer .vcontainer').slideToggle();
    });

    $('.vlayer #vclose').click(function () {
        $('.vlayer .vcontainer').hide();
        $('.vlayer').toggle();
    });
});
