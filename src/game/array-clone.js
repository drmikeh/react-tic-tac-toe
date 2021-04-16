function arrayClone(arr) {
    if (Array.isArray(arr)) {
        const copy = arr.slice(0);
        for (let i = 0; i < copy.length; i++) {
            copy[i] = arrayClone(copy[i]);
        }
        return copy;
    } else if (typeof arr === 'object') {
        throw new Error('Cannot clone array containing an object!');
    } else {
        return arr;
    }
}

export default arrayClone;
