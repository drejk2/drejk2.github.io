var cards, checkKey, prepPage, scriptReady, shuffleArray, shuffleCards, UIn;

shuffleArray = function(array) {
    var i, j, temp;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

scriptReady = function() {
    prepPage();
};
prepPage = function() {
    $('#buttons li').on('click', function() {
            if ($(this).hasClass('disabled') == false) {
                UIn.actions($(this).data('btn'));
            }
        });
    $(window).on('keydown', function() {
            if ($("#cardlist textarea").is(":focus") == false) {
                checkKey(event, UIn.controls, UIn.actions);
            }
        });
    $('#cardlist button').on('click', function() {
            if ($('#content').hasClass('a')) {
                $('#content').removeClass('a').addClass('c');
            }
            cards();
            $('#buttons li[data-btn="shuffle"]').removeClass('disabled');
        });
    $('#content > .middle').on('click', function() {
            if ($('#content').hasClass('c')) {
                $('#content > .middle span').text('⇦⇦⇦');
            } else {
                $('#content > .middle span').text('⇨⇨⇨');
            }
            $('#content').toggleClass('b').toggleClass('c');
            $('#cardlist textarea').focus();
        });
};
UIn = {
    actions: function(trigger) {
        switch(trigger) {
            case 'controls':
                alert('controls');
                break;
            case 'options':
                alert('options');
                break;
            case 'reset':
                alert('reset');
                break;
            case 'results':
                alert('results');
                break;
            case 'shuffle':
                shuffleCards();
                break;
        }
    },
    controls: {
        //  [keyCode, alt, ctrl, shift]
        controls: [
            [67, false, false, false], // c
            [110, false, false, false]], // decimal point (comma)
        options: [
            [79, false, false, false], // o
            [96, false, false, false]], // numpad 0
        reset: [
            [82, false, false, false], // r
            [109, false, false, false]], // subtract
        results: [
            [84, false, false, false], // t
            [107, false, false, false]], // add
        shuffle: [
            [13, false, false, false]] // [enter]
    }
};
checkKey = function(event, controls, actions) {
    var i, j, key, keys, mods;
    key = event.which;
    mods = [event.altKey, event.ctrlKey, event.shiftKey];
    keys = [key, mods];
    for (i in controls) {
        for (j = 0; j < controls[i].length; j++) {
            if (controls[i][j].toString() == keys.toString()) {
                actions(i);
            }
        }
    }
};
cards = function() {
    var cards = {}, i, input, j, regex, x, y, z;
    // ' cards[$] : code, img, name, raw
    input = $('#cardlist textarea').val();
    cards.raw = input.split(/\n/g);
    for (i = 0; i < cards.raw.length; i++) {
        if (/\S/.test(cards.raw[i]) == false) {
            cards.raw.splice(i, 1);
            i--;
        }
    }
    cards.name = [];
    regex = [/\d+\s/, /\d+\*\s/, /\d+x\s/, /\d+X\s/];
    for (i = 0; i < cards.raw.length; i++) {
        y = null;
        for (j = 0; j < regex.length; j++) {
            x = cards.raw[i].search(regex[j]);
            if (x == 0) {
                y = j;
                break;
            }
        }
        if (y == null) {
            cards.name.push(cards.raw[i]);
        } else {
            z = cards.raw[i].match(regex[y]);
            for (j = 0; j < parseInt(z); j++) {
                cards.name.push(cards.raw[i].slice(
                    z[0].length,
                    cards.raw[i].length
                    ));
            }
        }
    }
    cards.code = [];
    for (i = 0; i < cards.name.length; i++) {
        cards.code.push(encodeURIComponent(cards.name[i]).replace(/%20/g, '+'));
    }
    cards.img = [];
    for (i = 0; i < cards.code.length; i++) {
        cards.img.push('//gatherer.wizards.com/Handlers/Image.ashx?type=' +
        'card&name=' + cards.code[i]);
    }
    cards.url = [];
    for (i = 0; i < cards.code.length; i++) {
        cards.url.push('//gatherer.wizards.com/Pages/Card/Details.aspx' +
        '?type=card&name=' + cards.code[i]);
    }
    $('#cards ul').html('');
    for (i = 0; i < cards.url.length; i++) {
        var a, img, li;
        img = $('<img>');
        img.attr({
            alt: cards.name[i],
            height: 319,
            src: cards.img[i],
            title: cards.name[i],
            width: 222
            });
        a = $('<a></a>');
        a.attr('href', cards.url[i]);
        a.append(img);
        li = $('<li></li>');
        li.attr('data-card', cards.name[i]);
        li.append(a);
        $('#cards ul').append(li);
    }
};
shuffleCards = function() {
    var cardsNew = [], cardsOld = [];
    cardsOld = $("#cards ul li");
    cardsNew = cardsOld.clone(true);
    cardsOld.remove();
    shuffleArray(cardsNew);
    $("#cards ul").append(cardsNew);
};

scriptReady();