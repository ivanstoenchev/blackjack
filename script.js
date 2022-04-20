// let btnBet = document.querySelector('.btnBet');
// let btnChange = document.querySelector('.btnChange');
// btnBet.addEventListener('click', myBet);
// btnChange.addEventListener('click', changeFromBet);
let btnAdd = document.querySelector('.addCards');
btnAdd.addEventListener('click', addDeck);
let hit = document.querySelector('.hitAction');
hit.addEventListener('click', hitAction);
let start = document.querySelector('.startGame');
start.addEventListener('click', startTheGame);
let playingCard = document.querySelector('.pCard');
let resetBtn = document.querySelector('.resetBtn');
resetBtn.addEventListener('click', resetGame);
let standBtn = document.querySelector('.standBtn');
standBtn.addEventListener('click', standHand);
// let splitBtn = document.querySelector('.splitBtn');
// splitBtn.addEventListener('click', splitCards);



let money = 0;
let change = 0;
let moneyTake = 0;
let current = 0;
let numOfDeck = 0;
let playerNewScore = 0;
let pNewCard = [];
let dNewCard = [];
let dealerScore = 0;
let playerScore = 0;
let splitCardOne = [];
let splitCardTwo = [];
let countDeck = [];
let dealerCardAdded = [];
let playerCardAdded = [];
let newPlayerScore = 0;


const suits = ["♠", "♣", "♥", "♦"];
let deckOfCards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const CARD_WEIGHTS = {
    'A': 11,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q': 10,
    'K': 10,
}

function addDeck() {

    let cardPlayer = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < deckOfCards.length; j++) {
            cardPlayer.push(deckOfCards[j] + suits[i]);
        }
    }
    countDeck = [];
    numOfDeck = document.querySelector('.numDeck').value;
    for (let i = 0; i < numOfDeck; i++) {
        for (let cp of cardPlayer) {
            countDeck.push(cp);


        }
    }
    shuffleDeck(countDeck);
    startBJGame(countDeck);
}

function shuffleDeck(arr) {
    for (let i = 0; i < 1000; i++) {
        let newInd = Math.floor(Math.random() * (arr.length));
        let secInd = Math.floor(Math.random() * (arr.length));
        let temp = arr[newInd];
        arr[newInd] = arr[secInd];
        arr[secInd] = temp;
    }
    return arr;
}

function startBJGame(arr) {

    let bjGame = document.querySelector('.bjMessage');

    let dealerCard;
    let dealerCardAdded = [];
    let playerCard;
    let playerCardAdded = [];


    bjGame.innerHTML = '';

    for (let i = 0; i < 2; i++) {
        playerCard = arr.shift();
        dealerCard = arr.shift();

        gameScoreDealer(dealerCard);
        gameScorePlayer(playerCard);

        dealerCardAdded.push(dealerCard);
        playerCardAdded.push(playerCard)

        htmlOutDealer(dealerCard);
        htmlOutPlayer(playerCard);


    }
    return arr;
}

standHand();

function standHand() {
    let currentDealerScore = document.querySelector('.scoreDealer').innerText;
    let dealerScore = parseFloat(currentDealerScore);
    let currentPlayerScore = document.querySelector('.playersScores').innerText;
    let playerScore = parseFloat(currentPlayerScore);

    let messageBoard = document.querySelector('.bjMessage');

    while (dealerScore < 17) {
        addCardDealer(countDeck);
        return
    }

    if (playerScore > 21) {
        messageBoard.innerHTML = "Player Lost"
    } else if (dealerScore > 21) {
        messageBoard.innerHTML = "Dealer Lost";
    } else if (playerScore === 21 && playerCardAdded.length === 2) {
        messageBoard.innerHTML = "Blackjack"
    } else if (playerScore > dealerScore) {
        messageBoard.innerHTML = "Player Win"
    } else if (dealerScore > playerScore) {
        messageBoard.innerHTML = "Dealer Win";
    } else if (dealerScore === playerScore) {
        messageBoard.innerHTML = "TIE"
    }
    return
}
// function cardColor(arr) {
//     if (arr[arr.length - 1] === '♥' || arr[arr.length - 1] === '♦') {
//         document.querySelector('.pCards').style.setProperty("color", "red");
//     } else {
//         document.querySelector('.pCards').style.setProperty("color", "black");

//     }
// }

function htmlOutDealer(playDealer) {
    let cardDivOut = document.createElement("div");
    let cardDiv = document.createElement("div");
    let divOut = document.querySelector('.dealerCards');
    let divOutMessage = document.querySelector('.dCards');
    cardDiv.classList.add("pCard");
    cardDiv.dataset.value = `${playDealer}`;
    cardDivOut.appendChild(cardDiv);
    divOut.appendChild(cardDivOut);
    divOutMessage.appendChild(divOut);
    document.getElementsByTagName('section')[0].appendChild(divOutMessage);
}

function htmlOutPlayer(playPlayer) {
    let cardDivOutPlayer = document.createElement("div");
    let cardDivPlayer = document.createElement("div");
    let divOutPlayer = document.querySelector('.playerCards');
    let divOutPlayerMessage = document.querySelector('.pCards');
    cardDivPlayer.classList.add("pCard");
    cardDivPlayer.dataset.value = `${playPlayer}`;
    cardDivOutPlayer.appendChild(cardDivPlayer);
    divOutPlayer.appendChild(cardDivOutPlayer);
    divOutPlayerMessage.appendChild(divOutPlayer);
    document.getElementsByTagName('section')[1].appendChild(divOutPlayerMessage);
}

function gameScoreDealer(arrDealer) {
    let dealersScore = document.querySelector('.scoreDealer');

    let newScoreDealer = arrDealer.slice(0, -1);

    dealerScore += CARD_WEIGHTS[newScoreDealer];

    dealersScore.innerHTML = dealerScore;

    return arrDealer

}
function gameScorePlayer(arrPlayer) {
    let playersScore = document.querySelector('.playersScores');

    let newScorePlayer = arrPlayer.slice(0, -1);

    playerScore += CARD_WEIGHTS[newScorePlayer];

    playersScore.innerHTML = playerScore;

    return arrPlayer

}


function addCard(arr) {
    let onesCard = document.querySelector('.playerAddCardOnes');

    let playerCardOnes;

    playerCardOnes = arr.shift();

    pNewCard.push(playerCardOnes);

    gameScorePlayer(playerCardOnes);
    htmlOutPlayer(playerCardOnes);

    onesCard.innerHTML = pNewCard;

    return arr;
}

function addCardDealer(arr) {
    let onesCard = document.querySelector('.dealerAddCardOnes');

    let dealerCardOnes;

    dealerCardOnes = arr.shift();

    dNewCard.push(dealerCardOnes);

    gameScoreDealer(dealerCardOnes);
    htmlOutDealer(dealerCardOnes);

    onesCard.innerHTML = dNewCard;

    return arr;
}

function startTheGame() {
    addDeck(countDeck);
}

function resetGame() {
    dealerScore = 0;
    playerScore = 0;
    document.querySelector('.dealerCards').innerHTML = '';
    document.querySelector('.playerCards').innerHTML = '';
    document.querySelector('.bjMessage').innerHTML = '';


    document.querySelector('.scoreDealer').innerHTML = '';
    document.querySelector('.playersScores').innerHTML = '';

    document.querySelector('.playerAddCardOnes').innerHTML = '';


    playerNewScore = 0;
    pNewCard = [];

    splitCardOne = [];
    splitCardTwo = [];
}

function hitAction() {
    addCard(countDeck);
}
