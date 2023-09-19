function deleteText(targetElement, delay, callback) {

    let textLength;

    targetElement.html(function (index, html) {
        textLength = html.length;
        return html.substr(0, textLength - 1);
    });

    if (textLength > 1) {
        setTimeout(function () {
            deleteText(targetElement, delay, callback);
        }, delay);
    }

    else {
        callback();
    }

}

function typeText(targetElement, textToType, cursor, delay, callback) {

    targetElement.html(function (index, html) {
        return html + textToType[cursor];
    });

    if (cursor < textToType.length - 1) {
        setTimeout(function () {
            typeText(targetElement, textToType, cursor + 1, delay, callback);
        }, delay);
    }
    else {
        callback();
    }

}

$.fn.extend({
    typewrite: function (settings) {
        var settings = $.extend({}, $.typewrite.defaults, settings);
        return $(this).each(function () {
            (function loop(targetElement, index) {
                typeText(targetElement, settings.text[index], 0, settings.delay, function () {
                    setTimeout(function () {
                        deleteText(targetElement, settings.delay / 1.25, function () {
                            loop(targetElement, (index + 1) % settings.text.length);
                        });
                    }, settings.pause);
                });

            }($(this), 0));
        });
    }
});

$.extend({
    typewrite: {
        defaults: {
            delay: 100,
            pause: 1250,
            text: []
        }
    }
});