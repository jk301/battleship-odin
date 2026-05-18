export function gameBoard () {

    // Initial board with 10*10 grid starting with null
    let board = Array(10).fill(null).map(() => Array(10).fill(null))

    let missedShots = []
    let hitShots = []

    function putShip (coords, ship, orient = "ver") {
        if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9 ) return "out-of-bounds"

        if (orient === "hor") {

            for (let i = 0; i < ship.length; i++) {
                if (coords[0] + i > 9) return "out-of-bound"
                if (board[coords[0] + i][coords[1]] !== null) return "occupied"
            }

            for (let i = 0; i < ship.length; i++) {
                board[coords[0] + i][coords[1]] = ship
            }

        } else if (orient === "ver") {

            for (let i = 0; i < ship.length; i++) {
                if (coords[1] + i > 9) return "out-of-bound"
                if (board[coords[0]][coords[1] + i] !== null) return "occupied"
            }

            for (let i = 0; i < ship.length; i++) {
                board[coords[0]][coords[1] + i] = ship
            }

        }
        
    }

    function receiveAttack (coords) {
        if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9 ) return "out-of-bounds"

        for (let i of hitShots) {
            if (i[0] === coords[0] && i[1] === coords[1]) {
                return "Already-hit"
            }
        }

        if (board[coords[0]][coords[1]] === null) {
            missedShots.push(coords)
            return "miss"
        } else {
            hitShots.push(coords)
            const shipHit = board[coords[0]][coords[1]]
            shipHit.hit()
            return "hit"
        }
    }

    function allShipSunk () {
        let allShips = new Set()

        for (let i = 0; i < board.length; i++) {
            for (let k = 0; k < board[i].length; k++) {
                const grid = board[i][k]
                if (grid !== null) {
                    allShips.add(grid)
                }
            }
        }

        for (let item of allShips) {
            if (item.isSunk() === false) {
                return false
            }
        }

        return true
    }

    return {
        putShip,
        receiveAttack,
        allShipSunk,
        missedShots,
        hitShots,
    }
}