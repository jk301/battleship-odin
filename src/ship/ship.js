export function Ship (length = 1) {
    let hits = 0

    function hit() { hits++ }

    function isSunk () {
        return hits >= length
    }

    return {
        length,
        hit,
        isSunk,
    }
}

// const destroyer = Ship(4)
// console.log(destroyer.length)
// destroyer.hit()
// destroyer.hit()
// destroyer.hit()

// console.log(destroyer.isSunk())
