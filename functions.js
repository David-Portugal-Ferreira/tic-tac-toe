let gameBoard = (function () {
    let gameboard = [];
    let turn = 0;
    let player;

    const setPlayer = () => {
        player = turn % 2 === 0 ? player1 : player2;
    }
    const getPlayer = () => player.getMarker();

    const incrementTurn = () => {
        turn++;
    }

    const setPosition = (index) => {
        gameboard[index] = player.getMarker();
        incrementTurn();
        checkGameStatus();
    }
    const getPosition = () => gameboard;

    const checkGameStatus = () => {
        if (
            (gameboard[0] === player.getMarker() && gameboard[1] === player.getMarker() && gameboard[2] === player.getMarker()) ||
            (gameboard[3] === player.getMarker() && gameboard[4] === player.getMarker() && gameboard[5] === player.getMarker()) ||
            (gameboard[6] === player.getMarker() && gameboard[7] === player.getMarker() && gameboard[8] === player.getMarker()) ||

            (gameboard[0] === player.getMarker() && gameboard[3] === player.getMarker() && gameboard[6] === player.getMarker()) ||
            (gameboard[1] === player.getMarker() && gameboard[4] === player.getMarker() && gameboard[7] === player.getMarker()) ||
            (gameboard[2] === player.getMarker() && gameboard[5] === player.getMarker() && gameboard[8] === player.getMarker()) ||

            (gameboard[0] === player.getMarker() && gameboard[4] === player.getMarker() && gameboard[8] === player.getMarker()) ||
            (gameboard[2] === player.getMarker() && gameboard[4] === player.getMarker() && gameboard[6] === player.getMarker())
        ) {
            alert(player.name + ' WINS');
            player.incrementPoints();
            displayController.displayPoints(player.getMarker(), player.getPoints());
            displayController.finishGame();
            displayController.displayResetButton();

            gameboard = [];
            player = '';
            turn = 0;
        }
    }

    const resetGameBoard = () => {
    };

    return { setPosition, getPosition, getPlayer, setPlayer, resetGameBoard }
})();

let displayController = (function () {

    const eventsArray = [];

    const player1Points = document.querySelector('.player-1-points');
    const player2Points = document.querySelector('.player-2-points')

    const wrapperDiv = document.querySelector('.wrapper');
    const firstRow = document.querySelector('.first-row').children;
    const secondRow = document.querySelector('.second-row').children;
    const thirdRow = document.querySelector('.third-row').children;


    const resetGameButton = document.createElement('button');

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

    // Remove after click
    const removeChildrenEvent = (index) => {
        allChildren[index].removeEventListener('click', eventsArray[index]);
    }

    // Remove from all, once game finish
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

    const displayPoints = (marker, points) => {
        if (marker === 'X') {
            player1Points.innerText = `Points: ${points}`;
        } else {
            player2Points.innerText = `Points: ${points}`;
        }
    }

    resetGameButton.addEventListener('click', () => {
        restarGame();
    })

    const displayResetButton = () => {
        wrapperDiv.appendChild(resetGameButton);
    }

    addChildrenEvent();

    return { restarGame, finishGame, displayPoints, displayResetButton }
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