let gameBoard = (function () {
    let gameboard = [];
    let player = 'X';
    let turn = 1;

    const setPlayer = () => {
        turn % 2 === 0 ? player = 'O' : player = 'X';
    }
    const getPlayer = () => player;

    const incrementTurn = () => turn++;

    const setPosition = (index) => {
        gameboard[index] = player;
        checkGameStatus();
        incrementTurn()
        setPlayer();
    }
    const getPosition = () => gameboard;

    const checkGameStatus = () => {
        if (
            (gameboard[1] === player && gameboard[2] === player && gameboard[3] === player) ||
            (gameboard[4] === player && gameboard[5] === player && gameboard[6] === player) ||
            (gameboard[7] === player && gameboard[8] === player && gameboard[9] === player) ||

            (gameboard[1] === player && gameboard[4] === player && gameboard[7] === player) ||
            (gameboard[2] === player && gameboard[5] === player && gameboard[8] === player) ||
            (gameboard[3] === player && gameboard[6] === player && gameboard[9] === player) ||

            (gameboard[1] === player && gameboard[5] === player && gameboard[9] === player) ||
            (gameboard[3] === player && gameboard[5] === player && gameboard[7] === player)
        ) {
            console.log(player + ' WINS');
        }

        const resetGameBoard = () => {
            gameboard = [];
            turn = 1;
        };
    }

    return { setPosition, getPosition, getPlayer }
})();

let displayController = (function () {

    const firstRow = document.querySelector('.first-row').children;
    const secondRow = document.querySelector('.second-row').children;
    const thirdRow = document.querySelector('.third-row').children;

    const allChildren = [...firstRow, ...secondRow, ...thirdRow];

    const addChildrenEvent = () => {
        allChildren.map((children, index) => {
            children.addEventListener('click', () => {
                children.innerText = gameBoard.getPlayer();
                gameBoard.setPosition(index + 1);
                removeChildrenEvent(index);
            });
        })
    }

    const removeChildrenEvent = (index) => {
        allChildren.splice(index, 1);
    }

    const renderBoard = () => {
        allChildren.map((children, index) => {
            children.innerText = index;
        })
    }

    addChildrenEvent();

    return { renderBoard, allChildren }
})();

function createUser(name) {
    let points = 0;

    const getPoints = () => points;
    const incrementPoints = () => points++;

    return { name, getPoints, incrementPoints }
}
