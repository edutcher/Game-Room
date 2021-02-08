var nextStep = () => Math.floor(Math.random() * 4);
var timeout = (ms) => new Promise(res => setTimeout(res, ms));
const pattern = [];
var place = 0;
var gameOver = true;


async function showPattern() {
    for (let current of pattern) {
        $('.simonBtn').removeClass('addPulse');
        switch (current) {
            case 0:
                void $('.yellowBtn')[0].offsetWidth;
                $('.yellowBtn').addClass('addPulse');
                await timeout(1550);
                break;
            case 1:
                void $('.redBtn')[0].offsetWidth;
                $('.redBtn').addClass('addPulse');
                await timeout(1550);
                break;
            case 2:
                void $('.greenBtn')[0].offsetWidth;
                $('.greenBtn').addClass('addPulse');
                await timeout(1550);
                break;
            case 3:
                void $('.blueBtn')[0].offsetWidth;
                $('.blueBtn').addClass('addPulse');
                await timeout(1550);
                break;
        }
        $('.simonBtn').removeClass('addPulse');
    }
}

async function checkGuess() {
    if (gameOver) return;
    if ($(this).hasClass('addPulse')) {
        $(this).removeClass('addPulse');
        void this.offsetWidth;
    }
    if ($(this).hasClass('yellowBtn')) {
        if (pattern[place] !== 0) gameOver = true;
        else {
            $(this).addClass('addPulse');
            place++;
        }
    } else if ($(this).hasClass('redBtn')) {
        if (pattern[place] !== 1) gameOver = true;
        else {
            $(this).addClass('addPulse');
            place++;
        }
    } else if ($(this).hasClass('greenBtn')) {
        if (pattern[place] !== 2) gameOver = true;
        else {
            $(this).addClass('addPulse');
            place++;
        }
    } else if ($(this).hasClass('blueBtn')) {
        if (pattern[place] !== 3) gameOver = true;
        else {
            $(this).addClass('addPulse');
            place++;
        }
    }
    if (gameOver) {
        $('#btnRow').empty();
        $('#btnRow').text('Game Over!');
        $('#btnRow').removeClass('hidden');
    } else if (place < pattern.length) {

    } else {
        place = 0;
        await timeout(1550);
        pattern.push(nextStep());
        showPattern();
    }
}

function startSimon() {
    gameOver = false;
    $('#btnRow').addClass('hidden');
    pattern.push(nextStep());
    showPattern();
}

function playSimon() {

    $('#gameTitle').text('Simon');
    $('#subTitle').text('A Memory Game');
    $('#gameArea').empty();

    const yellow = $('<div>').addClass('yellowBtn simonBtn col');
    const red = $('<div>').addClass('redBtn simonBtn col');
    const blue = $('<div>').addClass('blueBtn simonBtn col');
    const green = $('<div>').addClass('greenBtn simonBtn col');
    const row1 = $('<div>').addClass('row');
    const row2 = $('<div>').addClass('row');
    const row3 = $('<div>').addClass('row').attr('id', 'btnRow');
    const startBtn = $('<button>').addClass('btn').text('Start Game').click(startSimon);
    row1.append(yellow, red);
    row2.append(blue, green);
    row3.append(startBtn);
    $(document).on('click', '.simonBtn', checkGuess)
    $('#gameArea').append(row1, row2, row3);

}