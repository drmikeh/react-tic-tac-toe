import arrayClone from './array-clone'

const EMPTY_CELL = '?';
export const PLAYER_X = 'X'
export const PLAYER_O = 'O'

export function getInitialBoard() {
    return [
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL],
        [EMPTY_CELL, EMPTY_CELL, EMPTY_CELL]
    ]
}

function checkForMatch(cell1, cell2, cell3) {
    return cell1 === cell2 &&
        cell1 === cell3 &&
        cell1 !== EMPTY_CELL;
}

function isBoardFull(board) {
    for (let row = 0; row <= 2; row++) {
        for (let col = 0; col <= 2; col++) {
            if (board[row][col] === EMPTY_CELL) {
                return false;
            }
        }
    }
    return true;
}

function rowMatch(board) {
    for (var row = 0; row <= 2; row++) {
        if (checkForMatch(board[row][0], board[row][1], board[row][2])) {
            return true;
        }
    }
    return false;
}

function colMatch(board) {
    for (var col = 0; col <= 2; col++) {
        if (checkForMatch(board[0][col], board[1][col], board[2][col])) {
            return true;
        }
    }
    return false;
}

function diagMatch(board) {
    return checkForMatch(board[0][0], board[1][1], board[2][2]) ||
        checkForMatch(board[0][2], board[1][1], board[2][0]);
}

export function isWinner(board) {
    return rowMatch(board) || colMatch(board) || diagMatch(board);
}

export function isCat(board) {
    return !isWinner(board) && isBoardFull(board)
}

export function move(board, player, x, y) {
    const newBoard = arrayClone(board)
    newBoard[x][y] = player
    let winnerFound = isWinner(newBoard)
    let nextPlayer = player;
    if (!winnerFound) {
        nextPlayer = player === PLAYER_X ? PLAYER_O : PLAYER_X;
    }
    const catFound = isCat(newBoard)
    return { winnerFound, catFound, newBoard, nextPlayer }
}
