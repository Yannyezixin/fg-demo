$(document).ready(function () {
    (function () {
        slens = $('.section').length;
        curSide = 0;
        $('body').on('mousewheel', function (event, delta) {
            if (!$('.animating')[0]) {
                container = $('.container');
                container.removeClass('s'+curSide);
                curSide = delta < 0 ? (curSide + 1) % slens : (curSide - 1 + slens) % slens;
                child = container.children().eq(curSide);
                child.addClass('animating');
                container.addClass('s'+curSide);
                container.one('transitionend webkitTransitionend', function () {
                    child.removeClass('animating');
                });
            }
        });
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

});
