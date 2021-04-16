import React from 'react'
import { EMPTY_CELL } from '../game/play'
import classes from './Cell.module.css'

function Cell({ x, y, classNames, value, onMove }) {
    const allClassNames = classNames.map(cn => classes[cn])
    if (value !== EMPTY_CELL) {
        allClassNames.push(classes[value])
    }
    return (
        <td className={allClassNames.join(' ')}
            onClick={() => onMove(x, y)}>
            {value}
        </td>
    )
}

export default Cell
