var btn, generate, life, prepPage, reset, scriptReady;

scriptReady = function() {
    prepPage();
};
prepPage = function() {
    $('#generate button').on('click', generate);
};
generate = function() {
    var i;
    life = $('#generate input[name="life"]').val();
    for (i = 0; i < $('#generate input[name="players"]').val(); i++) {
        $('#counter > li:nth-child(2) ul').append($('<li></li>').attr('data-player', i + 1).append($('<input>').attr('placeholder', 'Enter name')));
        $('#counter > li:nth-child(3) ul').append($('<li></li>').attr('data-player', i + 1).append($('<button>+5</button>')));
        $('#counter > li:nth-child(4) ul').append($('<li></li>').attr('data-player', i + 1).append($('<button>+1</button>')));
        $('#counter > li:nth-child(5) ul').append($('<li></li>').attr('data-player', i + 1).append($('<input>').prop('readonly', true).val(life)));
        $('#counter > li:nth-child(6) ul').append($('<li></li>').attr('data-player', i + 1).append($('<button>-1</button>')));
        $('#counter > li:nth-child(7) ul').append($('<li></li>').attr('data-player', i + 1).append($('<button>-5</button>')));
    }
    $('#counter > li:nth-child(1) button').on('click', reset);
    $('#counter button').on('click', btn);
    $('body').removeClass('a').addClass('b');
};
btn = function() {
    var input;
    player = $(this).parent().data('player');
    input = $('#counter > li:nth-child(5) li:nth-child(' + player + ') input');
    switch($(this).html()) {
        case '+5':
            input.val(parseInt(input.val()) + 5);
            break;
        case '+1':
            input.val(parseInt(input.val()) + 1);
            break;
        case '-1':
            input.val(parseInt(input.val()) - 1);
            if (parseInt(input.val()) <= 0) {
                $('#counter [data-player="' + player + '"] button').prop('disabled', true);
                input.val(0).addClass('ded');
            }
            break;
        case '-5':
            input.val(parseInt(input.val()) - 5);
            if (parseInt(input.val()) <= 0) {
                $('#counter [data-player="' + player + '"] button').prop('disabled', true);
                input.val(0).addClass('ded');
            }
            break;
    }
};
reset = function() {
    $('#counter > li:nth-child(5) input').val(life).removeClass('ded');
    $('#counter button').prop('disabled', false);
};

scriptReady();