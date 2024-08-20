let gameBoard = (function () {
    let gameboard = [];
    let player = 'X';
    let turn = 1;

    const setPlayer = () => {
        turn % 2 === 0 ? player = 'O' : player = 'X';
    }
    const getPlayer = () => player;

    const incrementTurn = () => ++turn;

    const setPosition = (index) => {
        gameboard[index] = player;
        checkGameStatus();
        incrementTurn()
        setPlayer();
    }
    const getPosition = () => gameboard;

    const checkGameStatus = () => {
        for (let i = 0; i < 2; i++) {
            let type = '';
            i === 0 ? type = 'X' : type = 'Y';
            // TODO - think of other way to do this 
            if (
                (gameboard[1] === type && gameboard[2] === type && gameboard[3] === type) ||
                (gameboard[4] === type && gameboard[3] === type && gameboard[4] === type) ||
                (gameboard[7] === type && gameboard[4] === type && gameboard[9] === type) ||

                (gameboard[1] === type && gameboard[4] === type && gameboard[8] === type) ||
                (gameboard[2] === type && gameboard[5] === type && gameboard[8] === type) ||
                (gameboard[3] === type && gameboard[6] === type && gameboard[9] === type) ||

                (gameboard[1] === type && gameboard[5] === type && gameboard[9] === type) ||
                (gameboard[3] === type && gameboard[5] === type && gameboard[7] === type)
            ) {
                alert(type + ' WINS');
            }
        }
    }

    const resetGameBoard = () => {
        gameboard = [];
        turn = 1;
    };

    return { setPosition, getPosition }
})();

let displayController = (function () {

    const renderBoard = () => {

        
    }

    return { renderBoard }
})();

function createUser(name) {
    let points = 0;

    const getPoints = () => points;
    const incrementPoints = () => points++;

    return { name, getPoints, incrementPoints }
}
