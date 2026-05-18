import { gameBoard } from "./gameboard.js";
import { Ship } from "../ship/ship.js";

describe("game-board", () => {
    describe("placement & attack", () => {
        test("place a ship on board & attack it", () => {
            const board = gameBoard()
            const ship1 = Ship(4)
            board.putShip([3, 3], ship1, "ver")

            expect(board.receiveAttack([3, 3])).toBe("hit")
        })

        test("put a ship in a place thats occupied", () => {
            const board = gameBoard()
            const ship1 = Ship(4)
            const ship2 = Ship(4)
            board.putShip([3, 3], ship1, "ver")
            

            expect(board.putShip([2, 4], ship2, "hor")).toBe("occupied")
        })

        test("Attack on the wrong co-ordinates", () => {
            const board = gameBoard()
            const ship1 = Ship(4)
            board.putShip([3, 3], ship1, "ver")

            expect(board.receiveAttack([4, 4])).toBe("miss")
        })

        test("Attack on different co-ords other than the initial (still on it)", () => {
            const board = gameBoard()
            const ship1 = Ship(4)
            board.putShip([3, 3], ship1, "ver")

            expect(board.receiveAttack([3, 6])).toBe("hit")
        })

        test("Attack on different co-ords other than the initial (not on it)", () => {
            const board = gameBoard()
            const ship1 = Ship(4)
            board.putShip([3, 3], ship1, "ver")

            expect(board.receiveAttack([3, 9])).toBe("miss")
        })

        test("Out of bound attack", () => {
            const board = gameBoard()
            const ship1 = Ship(4)
            board.putShip([5, 5], ship1, "ver")

            expect(board.receiveAttack([5, 15])).toBe("out-of-bounds")
        })

        test("Horizontal check", () => {
            const board = gameBoard()
            const ship1 = Ship(4)
            board.putShip([5, 5], ship1, "hor")

            expect(board.receiveAttack([8, 5])).toBe("hit")
        })

    })

    describe("All sunk check", () => {
        test("Cheking if one ship sank means all ship sank", () => {
            const board = gameBoard()
            const ship1 = Ship(4)
            const ship2 = Ship(2)
            board.putShip([5, 5], ship1, "ver")
            board.putShip([3, 3], ship2, "hor")

            ship2.hit()
            ship2.hit()

            expect(board.allShipSunk()).toBe(false)
        })

        test("result of all sunk ships", () => {
            const board = gameBoard()
            const ship1 = Ship(2)
            const ship2 = Ship(2)
            board.putShip([5, 5], ship1, "ver")
            board.putShip([3, 3], ship2, "hor")

            ship2.hit()
            ship2.hit()
            ship1.hit()
            ship1.hit()

            expect(board.allShipSunk()).toBe(true)
        })
    })
})