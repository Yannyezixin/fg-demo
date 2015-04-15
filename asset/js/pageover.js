$(document).ready(function () {
    (function () {
        slens = $('.section').length;
        curSide = 0;
        $('body').on('mousewheel', function (event, delta) {
            if (!$('.animating')[0]) {
                nextSide = delta < 0 ? (curSide + 1) % slens : (curSide - 1 + slens) % slens;
                pageover(curSide, nextSide);
                curSide = nextSide
            }
        });

        $('body').on('keydown', function (event) {
            if (!$('.animating')[0] && (event.which == 40 || event.which == 38)) {
                if (event.which == 40) {
                    nextSide = (curSide + 1 ) % slens;
                } else if (event.which == 38){
                    nextSide = (curSide - 1 + slens) % slens;
                }
                pageover(curSide, nextSide);

                curSide = nextSide
            }
        });

        pageover = function (cur, next) {
            container = $('.container');
            container.removeClass('s'+cur);
            child = container.children().eq(next);
            child.addClass('animating');
            container.addClass('s'+next);
            container.one('transitionend webkitTransitionend', function () {
                child.removeClass('animating');
            });
        }
    } ());

    genLevelIndex = function (item) {
        length = item.length;
        parentItem = item.parent();
        parentItem.append("<ul class='level-index'></ul>");
        levelIndex = parentItem.find('ul');
        if (length > 0) {
            html = '<li class="active"></li>';
            while (--length > 0) {
                html += '<li></li>';
            }
            levelIndex.append(html);
        }
    }
    $(".left.handover-control").each(function () {
        $this = $(this);
        genLevelIndex($this.prevAll('.pannel').find($this.data('class')));
    });

    $('.handover-control').on('click', function () {
        $this = $(this);
        parentItem = $this.prevAll(".pannel");
        items = parentItem.find($this.data('class'));

        levelIndex = parentItem.find('.level-index');
        curIndex = levelIndex.children('.active').index();
        nextIndex = $this.is('.left') ? (curIndex - 1) % items.length : (curIndex + 1) % items.length;

        curLActive = levelIndex.children().eq(curIndex);
        nextLActive = levelIndex.children().eq(nextIndex);
        carousel(items.eq(curIndex), items.eq(nextIndex), curLActive, nextLActive);
    });

    $('.level-index li').on('click', function (e) {
        if (!$(e.target).is('active')) {
            $this = $(this);
            curLActive = $this.siblings('.active');
            parentItem = $this.parent().parent();
            curActive = parentItem.children().eq(curLActive.index());
            nextActive = parentItem.children().eq($this.index());
            carousel(curActive, nextActive, curLActive, $this);
        }
    });

    carousel = function (curActive, nextActive, curLActive, nextLActive) {
        curActive.hide();
        curActive.show();
        curActive.removeClass('active');
        curLActive.removeClass('active');
        curActive.one("transitionend webkitTransitionend oTransitionend", function () {
            curActive.hide();
            nextActive.show();
            setTimeout(function () {
                nextActive.addClass('active');
                nextLActive.addClass('active');
            }, 20);
        });
    }

    $('.coo').hover(function () {
        $(this).children().stop(false, true);
        $(this).children('.coo-back').fadeIn('slow');
        $(this).children('.coo-logo').animate({right: '-100%'}, 400);
        $(this).children('.coo-logo-left').animate({left: '0%'}, 400);
        $(this).children('.coo-msg').animate({left: '-100%'}, 400);
        $(this).children('.coo-msg-left').animate({right: '0%'}, 400);
    }, function () {
        $(this).children().stop(false, true);
        $(this).children('.coo-back').fadeOut('slow');
        $(this).children('.coo-logo').animate({right: '0%'}, 400);
        $(this).children('.coo-logo-left').animate({left: '-100%'}, 400);
        $(this).children('.coo-msg').animate({left: '0%'}, 400);
        $(this).children('.coo-msg-left').animate({right: '-100%'}, 400);
    });

});
