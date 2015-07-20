var checkKey, getCards, makeCards, prepPage, results = {}, scriptReady,
    shuffleArray, shuffleCards, uin;
// ' results[$] : log, prepTable, result, results, table, tbody, thead

results.tbody = $("#resulttable tbody");
results.result = 0;
results.results = [];
results.log = function(cards) {
    var i, tr;
    tr = $("<tr></tr>");
    results.results[results.result] = cards;
    if (results.result == 0) {
        tr.append($("<td></td>").text("# of draft"));
    } else {
        tr.append($("<td></td>"));
    }
    tr.append($("<td></td>").text(results.result + 1));
    for (i = 0; i < cards.length; i++) {
        tr.append($("<td></td>").text(cards[i]));
    }
    results.tbody.append(tr);
    results.result++;
};
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
shuffleCards = function() {
    var cardsNew = [], cardsOld = [];
    cardsOld = $("ul#cards li");
    cardsNew = cardsOld.clone(true);
    cardsOld.remove();
    shuffleArray(cardsNew);
    results.log(cardsNew.map(function() {return $(this).attr("data-card");}));
    $("ul#cards").append(cardsNew);
};
results.table = $("#resulttable");
uin = {
    actions: function(trigger) {
        switch(trigger) {
            case "shuffle":
                shuffleCards();
                break;
            case "results":
                results.table.toggle();
                break;
            case "options":
                $("#options").toggle();
                break;
        }
    },
    controls: {
        shuffle: [13], // [enter]
        results: [96], // [numpad 0]
        options: [110] // [decimal comma]
    }
};
checkKey = function(key, controls, actions) {
    var i;
    key = key.which;
    for (i in controls) {
        if (controls[i].indexOf(key) != -1) {
            actions(i);
        }
    }
};
results.thead = $("#resulttable thead");
results.prepTable = function() {
    var i, num, td, tr;
    num = $("ul#cards li").length;
    tr = $("<tr><td></td><td></td></tr>");
    td = $("<td></td>").text("# of card drawn");
    td.attr("colspan", num);
    tr.append(td);
    results.thead.append(tr);
    tr = $("<tr><td></td><td></td></tr>");
    for (i = 0; i < num; i++) {
        tr.append($("<td></td>").text(i + 1));
    }
    results.thead.append(tr);
};
getCards = function() {
    var cardCodes = [], cardImgs = [], cards, cardURLs = [], i, input;
    input = $("#cardlist-input").val();
    cards = input.split(/\n/g);
    for (i = 0; i < cards.length; i++) {
        cardCodes.push(encodeURIComponent(cards[i]).replace(/%20/g, "+"));
    }
    for (i = 0; i < cardCodes.length; i++) {
        cardImgs.push("http://gatherer.wizards.com/Handlers/Image.ashx?type=" +
        "card&name=" + cardCodes[i]);
    }
    for (i = 0; i < cardCodes.length; i++) {
        cardURLs.push("http://gatherer.wizards.com/Pages/Card/Details.aspx" +
        "?type=card&name=" + cardCodes[i]);
    }
    return [cardImgs, cards, cardURLs];
};
makeCards = function() {
    var cardImgs, cards, cardURLs, i, input, list;
    input = getCards();
    cardImgs = input[0];
    cards = input[1];
    cardURLs = input[2];
    list = $("#cards");
    for (i = 0; i < cardURLs.length; i++) {
        var a, img, li;
        img = $("<img>");
        img.attr("alt", cards[i]);
        img.attr("height", 319);
        img.attr("src", cardImgs[i]);
        img.attr("title", cards[i]);
        img.attr("width", 222);
        a = $("<a></a>");
        a.attr("href", cardURLs[i]);
        a.append(img);
        li = $("<li></li>");
        li.attr("data-card", cards[i]);
        li.append(a);
        list.append(li);
    }
};
prepPage = function() {
    $("#cardlist-button").on("click", function() {
        $("#cardlist-form").hide();
        makeCards();
        results.prepTable();
        });
    $(window).on("keydown", function() {checkKey(
        event, uin.controls, uin.actions);});
    $("#controls span").on("click", function() {alert($(this).attr("data-key"));}); // ...
    $("#options input").on("change", function() {alert($(this).prop("checked") + "\n" + $(this).attr("data-opt"));})
};
scriptReady = function() {
    prepPage();
};

scriptReady();