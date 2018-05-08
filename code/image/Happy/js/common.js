function fnReady() {
    fnReadyHeader();
    fnReadyBack();
    fnReadyOpenWin();
};

var headerHeight = 0,
    footerHeight = 0;

function fnReadyHeader() {
    var header = $api.byId('header'),
        footer = $api.byId('footer');

    if (header) {
        $api.fixStatusBar(header);
        headerHeight = $api.offset(header).h;
    }

    if (footer) {
        footerHeight = $api.offset(footer).h;
    }
};

function fnReadyBack() {
    var buttons = $api.domAll('.back');
    for (var i = 0; i < buttons.length; i++) {
        $api.attr(buttons[i], 'tapmode', 'active');
        buttons[i].onclick = function() {
            api.closeWin();
        };
    }

    api.parseTapmode();
};

function fnReadyOpenWin() {
    var buttons = $api.domAll('.open-win');
    for (var i = 0; i < buttons.length; i++) {
        $api.attr(buttons[i], 'tapmode', 'active');
        buttons[i].onclick = function() {
            var winName = $api.attr(this, 'win');

            var callback = $api.attr(this, 'callback');
            var pageParam ;
            if (callback) {
                pageParam = window[callback]();
            }
            var param = $api.attr(this, 'param');

            if (param) {
                pageParam = JSON.stringify(param);
            }

            api.openWin({
                name: winName,
                url: 'widget://html/' + winName + '.html',
                vScrollBarEnabled: false,
                // pageParam: pageParam
                 pageParam: {
                    whereName: pageParam
                }
            });

        };
    }

    api.parseTapmode();
};

function fnReadyFrame() {
    api.openFrame({
        name: api.winName + '_frame',
        url: 'widget://html/' + api.winName + '_frame.html',
        bounces: true,
        rect: {
            x: 0,
            y: headerHeight,
            w: 'auto',
            h: api.winHeight - headerHeight - footerHeight
        },
        pageParam: api.pageParam
    });
};
