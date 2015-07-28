var cards, cardsS /* [img, name, url, x] */, checkKey, draw, insert, prepPage, scriptReady, shuffleArray, UIn;

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
            if ($('#cardlist textarea').is(':focus') == false) {
                checkKey(event, UIn.controls, UIn.actions);
            }
        });
    $('#cardlist button').on('click', function() {
            if ($('#content').hasClass('a')) {
                $('#content').removeClass('a').addClass('c');
            }
            cards();
            $('#buttons li[data-btn="add"]').removeClass('disabled');
            $('#buttons li[data-btn="draw"]').removeClass('disabled');
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
insert = function() {
    $('#cardlist textarea').val($('#planechaselist').text());
};
UIn = {
    actions: function(trigger) {
        switch(trigger) {
            case 'draw':
                draw(1);
                break;
            case 'add':
                draw(2);
                break;
            case 'insert':
                insert();
                break;
        }
    },
    controls: {
        //  [keyCode, alt, ctrl, shift]
        draw: [
            [13, false, false, false]], // enter
        add: [
            [107, false, false, false]] // add
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
    shuffleArray(cards.name);
    cards.name.push("No cards left");
    cards.code = [];
    for (i = 0; i < cards.name.length; i++) {
        cards.code.push(encodeURIComponent(cards.name[i]).replace(/%20/g, '+'));
    }
    cards.img = [];
    for (i = 0; i < cards.code.length; i++) {
        cards.img.push('http://gatherer.wizards.com/Handlers/Image.ashx?type=' +
        'card&name=' + cards.code[i]);
    }
    cards.img.push('http://gatherer.wizards.com/Handlers/Image.ashx?type=card&name=ěščřžýáíé');
    cards.url = [];
    for (i = 0; i < cards.code.length; i++) {
        cards.url.push('http://gatherer.wizards.com/Pages/Card/Details.aspx' +
        '?type=card&name=' + cards.code[i]);
    }
    cards.url[cards.url.length - 1] = '';
    cardsS = [cards.img, cards.name, cards.url, 0];
    $('#cards ul').html('');
};
draw = function(x) {
    if (cardsS[3] < cardsS[1].length) {
        var a, img, li;
        if (x == 1) {
            $('#cards ul').html('');
        }
        img = $('<img>');
        img.attr({
            alt: cardsS[1][cardsS[3]],
            height: 311,
            src: cardsS[0][cardsS[3]],
            title: cardsS[1][cardsS[3]],
            width: 445
            });
        a = $('<a></a>');
        a.attr('href', cardsS[2][cardsS[3]]);
        a.append(img);
        li = $('<li></li>');
        li.attr('data-card', cardsS[1][cardsS[3]]);
        li.append(a);
        $('#cards ul').append(li);
        cardsS[3]++;
    }
};

scriptReady();