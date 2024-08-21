function createUser(marker) {
    let points = 0;
    let name = '';
    const playerMarker = marker;

    const setName = (playerName) => name = playerName;
    const getName = () => name;
    const getPoints = () => points;
    const getMarker = () => playerMarker;
    const incrementPoints = () => points++;
    const resetPoints = () => points = 0;

    return { getName, setName, getPoints, incrementPoints, getMarker, resetPoints }
}

const player1 = createUser('X');
const player2 = createUser('O');

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
            alert(player.getName() + ' WINS');
            player.incrementPoints();
            displayController.displayPoints(player.getMarker(), player.getPoints());
            displayController.finishGame();
            displayController.displayResetButton();

            gameboard = [];
            player = '';
            turn = 0;
        }
    }

    const resetGameBoardVariables = () => {
        gameboard = [];
        player = '';
        turn = 0;
    }

    return { setPosition, getPosition, getPlayer, setPlayer, resetGameBoardVariables }
})();

let displayController = (function () {

    const eventsArray = [];

    const player1Name = document.querySelector('.player-1-name');
    const player1Points = document.querySelector('.player-1-points');
    const player2Name = document.querySelector('.player-2-name');
    const player2Points = document.querySelector('.player-2-points');

    const controlsDiv = document.querySelector('.controls');
    const firstRow = document.querySelector('.first-row').children;
    const secondRow = document.querySelector('.second-row').children;
    const thirdRow = document.querySelector('.third-row').children;

    const resetGameButton = document.querySelector('.reset-game');
    const startGameButton = document.querySelector('.start-game-btn');

    const clearBoardButton = document.createElement('button');
    clearBoardButton.innerText = 'Clear Board';
    clearBoardButton.classList.add('reset-button');

    const allChildren = [...firstRow, ...secondRow, ...thirdRow];
    resetGameButton.style.display = 'none';

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

    clearBoardButton.addEventListener('click', () => {
        restarGame();
        controlsDiv.removeChild(controlsDiv.lastChild);
    })

    resetGameButton.addEventListener('click', () => {
        gameBoard.resetGameBoardVariables();
        restarGame();
        player1.resetPoints();
        player1Points.innerText = '';
        player2.resetPoints();
        player2Points.innerText = '';
        let button = controlsDiv.querySelector('.reset-button');
        if (button !== null) controlsDiv.removeChild(controlsDiv.lastChild);
    })

    const displayResetButton = () => {
        controlsDiv.appendChild(clearBoardButton);
    }

    startGameButton.addEventListener('click', () => {
        while (player1.getName() === '') {
            let name = prompt("Player 1 name: ")
            player1.setName(name);
            player1Name.innerText = player1.getName();
        }
        while (player2.getName() === '') {
            let name = prompt("Player 2 name: ")
            player2.setName(name);
            player2Name.innerText = player2.getName();
        }
        addChildrenEvent();
        document.querySelector('.start-game').removeChild(startGameButton);
        resetGameButton.style.display = 'block';
    })

    return { restarGame, finishGame, displayPoints, displayResetButton }
})();