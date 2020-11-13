function getStatusMessage(cp, winner, cat) {
    if (winner) {
        return 'Player ' + cp + ' has won!'
    }
    else if (cat) {
        return 'CAT';
    }
    else {
        return 'Current Player: ' + cp;
    }
}

function StatusMessage({ currentPlayer, winner, cat }) {
    const message = getStatusMessage(currentPlayer, winner, cat)
    return <p>{message}</p>
}

export default StatusMessage
