import { PLAYER_X, getInitialBoard, move, PLAYER_O } from './play'

const X = 'X'
const O = 'O'
const _ = '?'

describe('move', () => {
    it('updates the board', () => {
        const board = getInitialBoard()
        const result = move(board, PLAYER_X, 0, 0)
        expect(result.winner).toBe(null)
        expect(result.isCat).toBe(false)
        expect(result.nextPlayer).toBe(PLAYER_O)
        expect(result.newBoard).toEqual([
            [X, _, _],
            [_, _, _],
            [_, _, _]
        ])
    })
    it('does not allow changing an occupied cell', () => {
        const t = () => {
            const board = getInitialBoard()
            const result = move(board, PLAYER_X, 0, 0)
            move(result.newBoard, result.nextPlayer, 0, 0)
        }
        expect(t).toThrow(RangeError)
        expect(t).toThrow("That cell is already taken")
    })
    it('calculates a winner across the first diagonal', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 0, 0)
        result = move(result.newBoard, result.nextPlayer, 1, 0)
        result = move(result.newBoard, result.nextPlayer, 1, 1)
        result = move(result.newBoard, result.nextPlayer, 2, 0)
        result = move(result.newBoard, result.nextPlayer, 2, 2)
        expect(result.winner).toBe(PLAYER_X)
        expect(result.isCat).toBe(false)
        expect(result.newBoard).toEqual([
            [X, _, _],
            [O, X, _],
            [O, _, X]
        ])
    })
    it('calculates a winner across the second diagonal', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 0, 2)
        result = move(result.newBoard, result.nextPlayer, 0, 0)
        result = move(result.newBoard, result.nextPlayer, 1, 1)
        result = move(result.newBoard, result.nextPlayer, 1, 0)
        result = move(result.newBoard, result.nextPlayer, 2, 0)
        expect(result.winner).toBe(PLAYER_X)
        expect(result.isCat).toBe(false)
        expect(result.newBoard).toEqual([
            [O, _, X],
            [O, X, _],
            [X, _, _]
        ])
    })
    it('calculates a winner across the top row', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 0, 0)
        result = move(result.newBoard, result.nextPlayer, 1, 0)
        result = move(result.newBoard, result.nextPlayer, 0, 1)
        result = move(result.newBoard, result.nextPlayer, 1, 1)
        result = move(result.newBoard, result.nextPlayer, 0, 2)
        expect(result.winner).toBe(PLAYER_X)
        expect(result.isCat).toBe(false)
        expect(result.newBoard).toEqual([
            [X, X, X],
            [O, O, _],
            [_, _, _]
        ])
    })
    it('calculates a winner across the middle row', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 1, 0)
        result = move(result.newBoard, result.nextPlayer, 0, 0)
        result = move(result.newBoard, result.nextPlayer, 1, 1)
        result = move(result.newBoard, result.nextPlayer, 0, 1)
        result = move(result.newBoard, result.nextPlayer, 1, 2)
        expect(result.winner).toBe(PLAYER_X)
        expect(result.isCat).toBe(false)
        expect(result.newBoard).toEqual([
            [O, O, _],
            [X, X, X],
            [_, _, _]
        ])
    })
    it('calculates a winner across the bottom row', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 2, 0)
        result = move(result.newBoard, result.nextPlayer, 0, 0)
        result = move(result.newBoard, result.nextPlayer, 2, 1)
        result = move(result.newBoard, result.nextPlayer, 0, 1)
        result = move(result.newBoard, result.nextPlayer, 2, 2)
        expect(result.winner).toBe(PLAYER_X)
        expect(result.isCat).toBe(false)
        expect(result.newBoard).toEqual([
            [O, O, _],
            [_, _, _],
            [X, X, X]
        ])
    })
    it('calculates a winner across the left column', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 0, 0)
        result = move(result.newBoard, result.nextPlayer, 0, 1)
        result = move(result.newBoard, result.nextPlayer, 1, 0)
        result = move(result.newBoard, result.nextPlayer, 1, 1)
        result = move(result.newBoard, result.nextPlayer, 2, 0)
        // expect(result.winner).toBe(PLAYER_X)
        expect(result.isCat).toBe(false)
        expect(result.newBoard).toEqual([
            [X, O, _],
            [X, O, _],
            [X, _, _]
        ])
    })
    it('calculates a winner across the middle column', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 0, 1)
        result = move(result.newBoard, result.nextPlayer, 0, 0)
        result = move(result.newBoard, result.nextPlayer, 1, 1)
        result = move(result.newBoard, result.nextPlayer, 1, 0)
        result = move(result.newBoard, result.nextPlayer, 2, 1)
        expect(result.winner).toBe(PLAYER_X)
        expect(result.isCat).toBe(false)
        expect(result.newBoard).toEqual([
            [O, X, _],
            [O, X, _],
            [_, X, _]
        ])
    })
    it('calculates a winner across the right column', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 0, 2)
        result = move(result.newBoard, result.nextPlayer, 0, 1)
        result = move(result.newBoard, result.nextPlayer, 1, 2)
        result = move(result.newBoard, result.nextPlayer, 1, 1)
        result = move(result.newBoard, result.nextPlayer, 2, 2)
        expect(result.winner).toBe(PLAYER_X)
        expect(result.isCat).toBe(false)
        expect(result.newBoard).toEqual([
            [_, O, X],
            [_, O, X],
            [_, _, X]
        ])
    })
    it('calculates a cat game', () => {
        const board = getInitialBoard()
        let result = move(board, PLAYER_X, 0, 0)
        result = move(result.newBoard, result.nextPlayer, 1, 0)
        result = move(result.newBoard, result.nextPlayer, 2, 0)

        result = move(result.newBoard, result.nextPlayer, 0, 1)
        result = move(result.newBoard, result.nextPlayer, 2, 1)
        result = move(result.newBoard, result.nextPlayer, 1, 1)

        result = move(result.newBoard, result.nextPlayer, 0, 2)
        result = move(result.newBoard, result.nextPlayer, 2, 2)
        result = move(result.newBoard, result.nextPlayer, 1, 2)

        expect(result.winner).toBe(null)
        expect(result.isCat).toBe(true)
        expect(result.newBoard).toEqual([
            [X, O, X],
            [O, O, X],
            [X, X, O]
        ])
    })
})
