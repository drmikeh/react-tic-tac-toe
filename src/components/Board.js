import Cell from './Cell'
import classes from './Board.module.css'

const boardSchema = [
    [
        { x: 0, y: 0, ref: '00', cn: [] },
        { x: 0, y: 1, ref: '01', cn: ['v'] },
        { x: 0, y: 2, ref: '02', cn: [] }
    ],
    [
        { x: 1, y: 0, ref: '10', cn: ['h'] },
        { x: 1, y: 1, ref: '11', cn: ['v', 'h'] },
        { x: 1, y: 2, ref: '12', cn: ['h'] }
    ],
    [
        { x: 2, y: 0, ref: '20', cn: [] },
        { x: 2, y: 1, ref: '21', cn: ['v'] },
        { x: 2, y: 2, ref: '22', cn: [] }
    ]
];

function Board({ board, onMove, disabled }) {
    const rows = boardSchema.map((row, rowIndex) => {
        let cells = row.map((cell, colIndex) => {
            const value = board[rowIndex][colIndex]
            return (
                <Cell
                    key={cell.ref}
                    x={rowIndex}
                    y={colIndex}
                    value={value}
                    classNames={cell.cn}
                    onMove={onMove}
                />
            );
        })
        return <tr key={rowIndex}>{cells}</tr>;
    });

    const cn = disabled ? classes.disabled : null

    return (
        <div>
            <table className={cn}><tbody>{rows}</tbody></table>
        </div>
    )
}

export default Board
