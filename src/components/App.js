import React from 'react'
import { PLAYER_X, EMPTY_CELL, getInitialBoard, move } from '../game/play'
import Board from './Board'
import StatusMessage from './StatusMessage'

function App() {
    const [currentPlayer, setCurrentPlayer] = React.useState(PLAYER_X)
    const [board, setBoard] = React.useState(getInitialBoard)
    const [theWinner, setTheWinner] = React.useState(null)
    const [cat, setCat] = React.useState(false)

    function reset() {
        setCurrentPlayer(PLAYER_X)
        setBoard(getInitialBoard())
        setTheWinner(null)
        setCat(false)
    }

    function onMove(x, y) {
        if (theWinner || cat || board[x][y] !== EMPTY_CELL) {
            return;
        }

        const { winner, isCat, newBoard, nextPlayer } = move(board, currentPlayer, x, y)
        if (winner) {
            console.log('the winner is:', winner)
            setTheWinner(winner)
        }
        setCat(isCat)
        setBoard(newBoard)
        setCurrentPlayer(nextPlayer)
    }

    const disabled = theWinner || cat

    return (
        <section>
            <h1>Welcome to Tic-Tac-Toe</h1>
            <Board board={board} onMove={onMove} disabled={disabled} />
            <StatusMessage currentPlayer={currentPlayer} winner={theWinner} cat={cat} />
            <button onClick={() => reset()} >New Game</button>
        </section>
    )
}

export default App
