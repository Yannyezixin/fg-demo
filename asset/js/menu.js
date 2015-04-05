$(document).ready(function () {
    $('.accmenu .link').click(function () {
        $this = $(this);
        $this.parent().siblings().children(".submenu").slideUp();
        $this.next().slideToggle();
        $this.parent().siblings().removeClass('open');
        $this.parent().toggleClass('open');
    });
});
