let gameBoard = (function () {
    let gameboard = [];
    let turn = 0;
    let player = '';
    let gameWin = false;

    const setPlayer = () => {
        player = turn % 2 === 0 ? player1.getMarker() : player2.getMarker();
    }
    const getPlayer = () => player;

    const incrementTurn = () => {
        turn++;
        console.log(turn);
    }

    const setPosition = (index) => {
        gameboard[index] = player;
        incrementTurn();
        checkGameStatus();
    }
    const getPosition = () => gameboard;

    const checkGameStatus = () => {
        if (
            (gameboard[0] === player && gameboard[1] === player && gameboard[2] === player) ||
            (gameboard[3] === player && gameboard[4] === player && gameboard[5] === player) ||
            (gameboard[6] === player && gameboard[7] === player && gameboard[8] === player) ||

            (gameboard[0] === player && gameboard[3] === player && gameboard[6] === player) ||
            (gameboard[1] === player && gameboard[4] === player && gameboard[7] === player) ||
            (gameboard[2] === player && gameboard[5] === player && gameboard[8] === player) ||

            (gameboard[0] === player && gameboard[4] === player && gameboard[8] === player) ||
            (gameboard[2] === player && gameboard[4] === player && gameboard[6] === player)
        ) {
            alert(player + ' WINS');
            gameWin = true;
            displayController.finishGame();
        }
    }

    if(gameWin) resetGameBoard();

    const resetGameBoard = () => {
        gameboard = [];
        player = '';
        turn = 0;
        gameWin = false;
        displayController.restarGame();
    };

    return { setPosition, getPosition, getPlayer, setPlayer }
})();

let displayController = (function () {

    const eventsArray = [];

    const firstRow = document.querySelector('.first-row').children;
    const secondRow = document.querySelector('.second-row').children;
    const thirdRow = document.querySelector('.third-row').children;

    const allChildren = [...firstRow, ...secondRow, ...thirdRow];

    const addChildrenEvent = () => {
        allChildren.map((children, index) => {
            const handler = () => {
                gameBoard.setPlayer();
                allChildren[index].innerText = gameBoard.getPlayer();
                gameBoard.setPosition(index, gameBoard.getPlayer());
                removeChildrenEvent(index);
            }
            children.addEventListener('click', handler);
            eventsArray[index] = handler;
        })
    }

    const removeChildrenEvent = (index) => {
        allChildren[index].removeEventListener('click', eventsArray[index]);
    }

    const finishGame = () => {
        allChildren.map((child, index) => {
            child.removeEventListener('click', eventsArray[index]);
        })
    }

    const restarGame = () => {
        allChildren.map((child) => {
            child.innerText = '';
        })
        addChildrenEvent();
    }

    addChildrenEvent();

    return { restarGame, finishGame }
})();

function createUser(name, marker) {
    let points = 0;
    const playerMarker = marker;

    const getPoints = () => points;
    const getMarker = () => playerMarker;
    const incrementPoints = () => points++;

    return { name, getPoints, incrementPoints, getMarker }
}

const player1 = createUser('Will', 'X');
const player2 = createUser('John', 'O');