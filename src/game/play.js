import arrayClone from './array-clone'

export const EMPTY_CELL = '?';
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
        cell1 !== EMPTY_CELL
}

function isBoardFull(board) {
    for (let row = 0; row <= 2; row++) {
        for (let col = 0; col <= 2; col++) {
            if (board[row][col] === EMPTY_CELL) {
                return false
            }
        }
    }
    return true;
}

function rowMatch(board) {
    for (var row = 0; row <= 2; row++) {
        if (checkForMatch(board[row][0], board[row][1], board[row][2])) {
            return board[row][0]
        }
    }
    return null
}

function colMatch(board) {
    for (var col = 0; col <= 2; col++) {
        if (checkForMatch(board[0][col], board[1][col], board[2][col])) {
            return board[0][col]
        }
    }
    return null
}

function diagMatch(board) {
    if (checkForMatch(board[0][0], board[1][1], board[2][2])) {
        return board[0][0]
    }
    if (checkForMatch(board[0][2], board[1][1], board[2][0])) {
        return board[0][2]
    }
    return null
}

export function calcWinner(board) {
    return rowMatch(board) || colMatch(board) || diagMatch(board);
}

export function calcIsCat(board) {
    return !calcWinner(board) && isBoardFull(board)
}

export function move(board, player, x, y) {
    const newBoard = arrayClone(board)
    if (newBoard[x][y] !== EMPTY_CELL) {
        throw new RangeError('That cell is already taken')
    }
    newBoard[x][y] = player
    return {
        winner: calcWinner(newBoard),
        isCat: calcIsCat(newBoard),
        nextPlayer: player === PLAYER_X ? PLAYER_O : PLAYER_X,
        newBoard
    }
}
