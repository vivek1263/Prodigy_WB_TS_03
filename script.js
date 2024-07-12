document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const board = document.getElementById("board");
    const winnerMessageTextElement = document.getElementById("winnerMessage");
    const message = document.getElementById("message");
    const restartButton = document.getElementById("restartButton");

    let isXTurn = true;
    let boardState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function startGame() {
        cells.forEach(cell => {
            cell.classList.remove('x');
            cell.classList.remove('o');
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
        message.classList.remove('show');
        isXTurn = true;
        boardState.fill(null);
    }

    function handleClick(e) {
        const cell = e.target;
        const currentClass = isXTurn ? 'x' : 'o';
        placeMark(cell, currentClass);
        if (checkWin(currentClass)) {
            endGame(false);
        } else if (isDraw()) {
            endGame(true);
        } else {
            swapTurns();
        }
    }

    function placeMark(cell, currentClass) {
        const index = Array.from(cells).indexOf(cell);
        boardState[index] = currentClass;
        cell.classList.add(currentClass);
    }

    function swapTurns() {
        isXTurn = !isXTurn;
    }

    function checkWin(currentClass) {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return boardState[index] === currentClass;
            });
        });
    }

    function isDraw() {
        return boardState.every(cell => {
            return cell !== null;
        });
    }

    function endGame(draw) {
        if (draw) {
            winnerMessageTextElement.innerText = 'Draw!';
        } else {
            winnerMessageTextElement.innerText = `${isXTurn ? "X" : "O"} Wins!`;
        }
        message.classList.add('show');
    }

    restartButton.addEventListener('click', startGame);

    startGame();
});
