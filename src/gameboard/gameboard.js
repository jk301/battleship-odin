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

    function checkShip (coords, ship, orient = "ver") {
        if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9 ) return false

        if (orient === "hor") {

            for (let i = 0; i < ship.length; i++) {
                if (coords[0] + i > 9) return false
                if (board[coords[0] + i][coords[1]] !== null) return false
            }
            return true

        } else if (orient === "ver") {

            for (let i = 0; i < ship.length; i++) {
                if (coords[1] + i > 9) return false
                if (board[coords[0]][coords[1] + i] !== null) return false
            }
            return true
        } 
    }

    function receiveAttack (coords) {
        if (coords[0] < 0 || coords[0] > 9 || coords[1] < 0 || coords[1] > 9 ) return "out-of-bounds"

        for (let i of hitShots) {
            if (i[0] === coords[0] && i[1] === coords[1]) {
                return "already-hit"
            }
        }

        for (let i of missedShots) {
            if (i[0] === coords[0] && i[1] === coords[1]) {
                return "already-hit"
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

    function isShipSunkAt (coords) {
        const ship = board[coords[0]][coords[1]]
        if (ship === null) return false

        return ship.isSunk()
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
        checkShip,
        receiveAttack,
        allShipSunk,
        missedShots,
        getHitShots: () => hitShots,
        getBoard: () => board,
        isShipSunkAt,
    }
}