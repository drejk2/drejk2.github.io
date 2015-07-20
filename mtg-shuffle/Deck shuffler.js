// ! Before you can display options with 0 / O after script load, you have to shuffle deck
// ! Formatting for options (margin doesn't work, +incomplete)
// ! options.change() is incomplete
// ! Adress JSlint warnings
// + Disable page scrolling while scrolling in result table
    // (so you don't always move the whole page when you scroll to the end of the table)

// Intended for http://magic.bluebones.net/proxies/
// Browser console shortcut: Ctrl + Shift + J

var results = {
    // .. table
    results: [],
    result: 0,
    create: function() {
        var table = document.createElement("table");
        table.style.width = "90%";
        table.style.height = "90%";
        table.style.overflow = "scroll";
        table.style.position = "fixed";
        table.style.top = "5%";
        table.style.left = "5%";
        table.style.backgroundColor = "#ffffff";
        table.style.opacity = 0.95;
        table.style.display = "none";
        table.id = "resultTable";
        var cards = document.querySelectorAll("a");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        tr.appendChild(td);
        var td = document.createElement("td");
        tr.appendChild(td);
        var td = document.createElement("td");
        td.innerHTML = "# of card drawn";
        td.colSpan = cards.length + 1;
        tr.appendChild(td);
        table.appendChild(tr);
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        tr.appendChild(td);
        var td = document.createElement("td");
        tr.appendChild(td);
        for (i = 0; i < cards.length; i++) {
            var td = document.createElement("td");
            td.innerHTML = i + 1;
            tr.appendChild(td);
        }
        table.appendChild(tr);
        document.body.appendChild(table);
    },
    state: 0,
    show: function() {
        results.table.style.display = "block";
    },
    hide: function() {
        results.table.style.display = "none";
    }
}, options = {
    // .. menu
    create: function() {
        var menu, headlines = [], tab = [], descriptions = [], inputs = [];
        menu = document.createElement("form");
        menu.style.position = "fixed";
        menu.style.backgroundColor = "#ffffff";
        menu.style.opacity = 0.95;
        menu.style.display = "none";
        menu.id = "optionMenu";
        headlines[0] = "The table of results";
        descriptions[0] = "Highlight starting hand: ";
        inputs[0] = document.createElement("input");
        inputs[0].type = "checkbox";
        inputs[0].name = "opt1";
        inputs[0].addEventListener("change", function(){options.change(this);});
        tab[1] = 1;
        descriptions[1] = "Skip firts drawing step: ";
        inputs[1] = document.createElement("input");
        inputs[1].type = "checkbox";
        inputs[1].name = "opt2";
        inputs[1].addEventListener("change", function(){options.change(this);});
        for (i = 0; i < descriptions.length; i++) {
            if (i in headlines) {
                if (i != 0) {
                    var br = document.createElement("br");
                    menu.appendChild(br);
                }
                var headline = document.createElement("h3");
                headline.innerHTML = headlines[i];
                headline.style.textDecoration = "underline";
                menu.appendChild(headline);
            }
            var description = document.createElement("span");
            description.innerHTML = descriptions[i];
            description.style.display = "inline-block";
            if (i in tab) {
                description.style.textIndent = 3 * tab[i] + "em";
            }
            menu.appendChild(description);
            menu.appendChild(inputs[i]);
            if (i != descriptions.length - 1) {
                var br = document.createElement("br");
                menu.appendChild(br);
            }
        }
        document.body.appendChild(menu);
    },
    state: 0,
    show: function() {
        options.menu.style.display = "block";
    },
    hide: function() {
        options.menu.style.display = "none";
    },
    change: function(that) {
        var value, option;
        value = that.checked;
        option = that.name;
        alert(value + "\n" + option);
    }
};
results.create();
results.table = document.querySelector("#resultTable");
options.create();
options.menu = document.querySelector("#optionMenu");
function shuffleArray(array) {
    for (i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
function shuffleDeck() {
    var cardsOld = [], cardsNew = [];
    cardsOld = document.querySelectorAll("a");
    for (i = 0; i < cardsOld.length; i++) {
        cardsNew[i] = cardsOld[i].cloneNode(true);
        cardsOld[i].parentNode.removeChild(cardsOld[i]);
    }
    /*
    var bre = document.querySelector("#break");
    if (bre !== "undefined") {
        bre.parentNode.removeChild(bre);
    }
    */
    shuffleArray(cardsNew);
    results.results[results.result] = [];
    for (i = 0; i < cardsNew.length; i++) {
        results.results[results.result][i] = decodeURI(cardsNew[i].href.slice(42));
    }
    var tr = document.createElement("tr");
    if (results.result == 0) {
        var td = document.createElement("td");
        td.innerHTML = "# of draft";
        tr.appendChild(td);
    } else {
        var td = document.createElement("td");
        tr.appendChild(td);
    }
    var td = document.createElement("td");
    td.innerHTML = results.result + 1;
    tr.appendChild(td);
    for (i = 0; i < results.results[results.result].length; i++) {
        var td = document.createElement("td");
        td.innerHTML = results.results[results.result][i];
        tr.appendChild(td);
    }
    results.table.appendChild(tr);
    results.result++;
    for (i = 0; i < cardsNew.length; i++) {
        document.body.appendChild(cardsNew[i]);
        /*
        if (i == 6) {
            var br = document.createElement("img");
            br.style.width = "222px";
            br.style.height = "319px";
            br.id = "break";
            document.body.appendChild(br);
        }
        */
    }
}
function reset() {
    results.table.parentNode.removeChild(results.table);
    results.result = [];
    results.result = 0;
    results.create();
    results.table = document.querySelector("#resultTable");
}
function checkKey(key) {
    switch(key.keyCode) {
        // Shuffle deck
        case 13: // enter
            shuffleDeck();
            break;
        // Display results
        case 110: // decimal comma
        case 188: // comma
            if (results.state == 0) {
                results.show();
                results.state++;
            } else {
                results.hide();
                results.state--;
            }
            break;
        // Display options
        case 48: // 0
        case 79: // o
        case 96: // numpad 0
            if (options.state == 0) {
                options.show();
                options.state++;
            } else {
                options.hide();
                options.state--;
            }
            break;
        // Reset results
        case 46: // delete
        case 109: // subtract
        case 189: // dash
            var conf = confirm("Are you sure you want to erase all results?");
            if (conf == true) {
                reset();
            }
            break;
    }
}
window.addEventListener("keydown", checkKey);
alert("Controls:\n\n" +
    "Press Enter to shuffle deck.\nPress , to toggle the table of results." +
    "\nPress Delete or - to reset results.\nPress 0 or O to view the option menu.");