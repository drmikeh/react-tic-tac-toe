import React from 'react'
import { PLAYER_X, getInitialBoard, move } from '../game'
import Board from './Board'
import StatusMessage from './StatusMessage'

function App() {
    const [currentPlayer, setCurrentPlayer] = React.useState(PLAYER_X)
    const [board, setBoard] = React.useState(getInitialBoard)
    const [winner, setWinner] = React.useState(null)
    const [cat, setCat] = React.useState(false)

    function reset() {
        setCurrentPlayer(PLAYER_X)
        setBoard(getInitialBoard())
        setWinner(null)
        setCat(false)
    }

    function onMove(x, y) {
        if (winner || cat) {
            return;
        }

        const { winnerFound, catFound, newBoard, nextPlayer } = move(board, currentPlayer, x, y)
        if (winnerFound) {
            setWinner(currentPlayer)
        }
        setCat(catFound)
        setBoard(newBoard)
        setCurrentPlayer(nextPlayer)
    }

    return (
        <section>
            <h1>Welcome to Tic-Tac-Toe</h1>
            <Board board={board} onMove={onMove} />
            <StatusMessage currentPlayer={currentPlayer} winner={winner} cat={cat} />
            <button onClick={() => reset()} >New Game</button>
        </section>
    )
}

export default App
