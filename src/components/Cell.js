import React from 'react'

function Cell({ x, y, className, value, onMove }) {
    return (
        <td className={className}
            onClick={() => onMove(x, y)}>{value}</td>
    )
}

export default Cell
