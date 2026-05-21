import { Ship } from "../../ship/ship.js";

export function randomPlacement (board) {
    const ships = [
        { name: "Carrier", length: 5 },
        { name: "Battleship", length: 4 },
        { name: "Cruiser", length: 3 },
        { name: "Submarine", length: 3 },
        { name: "Destroyer", length: 2 },
    ]

    let cord1 = Math.floor(Math.random() * 9)
    let cord2 = Math.floor(Math.random() * 9)
    let orient = Math.random() < 0.5 ? 'ver' : 'hor'

    for (let ship of ships) {
        let status = 'occupied'
        while (status === 'out-of-bound' || status === 'occupied') {
            cord1 = Math.floor(Math.random() * 9)
            cord2 = Math.floor(Math.random() * 9)
            orient = Math.random() < 0.5 ? 'ver' : 'hor'

            status = board.putShip([cord1, cord2], Ship(ship.length), orient)
        }
    }
}

// board.putShip([cord1, cord2], Ship(ship.length), orient)