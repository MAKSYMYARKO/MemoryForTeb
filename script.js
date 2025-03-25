var cards = [
    '🐵', '🐵',
    '🐱', '🐱',
    '🐶', '🐶',
    '🐭', '🐭',
    '🐷', '🐷',
    '🦝', '🦝',
    '🐼', '🐼',
    '🐸', '🐸'
];

var firstCard = null;
var secondCard = null;
var lockBoard = false;

function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function createBoard() {
    var gameBoard = document.getElementsByClassName('game-board')[0];
    gameBoard.innerHTML = '';
    shuffle(cards);
    
    for (var i = 0; i < cards.length; i++) {
        var cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.setAttribute('data-icon', cards[i]);

        cardElement.innerHTML =
            '<div class="card-inner">' +
            '<div class="card-front"></div>' +
            '<div class="card-back">' + cards[i] + '</div>' +
            '</div>';

        cardElement.onclick = flipCard;
        gameBoard.appendChild(cardElement);
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.className += ' flipped';

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForWin() {
    var allCards = document.getElementsByClassName('card');
    var allFlipped = true;

    for (var i = 0; i < allCards.length; i++) {
        if (!allCards[i].className.includes('flipped')) {
            allFlipped = false;
            break;
        }
    }

    if (allFlipped) {
        var winMessage = document.getElementById('win-message');
        winMessage.style.display = 'block';
        setTimeout(function () {
            winMessage.style.display = 'none';
            createBoard();
        }, 5000);
    }
}

function checkForMatch() {
    var isMatch = firstCard.getAttribute('data-icon') === secondCard.getAttribute('data-icon');

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
    checkForWin();
}

function disableCards() {
    firstCard.onclick = null;
    secondCard.onclick = null;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(function () {
        firstCard.className = firstCard.className.replace(' flipped', '');
        secondCard.className = secondCard.className.replace(' flipped', '');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

document.getElementById('reset-button').onclick = createBoard;

createBoard();
