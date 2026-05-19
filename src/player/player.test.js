import { Player } from "./player.js";
import { Ship } from "../ship/ship.js";

describe("Player FF tests", () => {
    describe("deploying & attacking", () => {
        test("P1 has a ship & P2 is attacking it", () => {
            const P1 = Player()
            const P2 = Player()
            const P1_ship = Ship(3)

            P1.board.putShip([4, 4], P1_ship, "ver")
            expect(P2.attack(P1, [4, 4])).toBe("hit")
        })

        test("P1 has a ship & P2 is attacking it (other than initial coords)", () => {
            const P1 = Player()
            const P2 = Player()
            const P1_ship = Ship(3)

            P1.board.putShip([4, 4], P1_ship, "ver")
            expect(P2.attack(P1, [4, 6])).toBe("hit")
        })

        test("P1 has a ship & P2 is attacking it (out-of-bounds)", () => {
            const P1 = Player()
            const P2 = Player()
            const P1_ship = Ship(3)

            P1.board.putShip([4, 4], P1_ship, "ver")
            expect(P2.attack(P1, [3, 6])).toBe("miss")
        })

        test("P1 has a ship & P2 destroyed it (allShipSunk returns true)", () => {
            const P1 = Player()
            const P2 = Player()
            const P1_ship = Ship(3)

            P1.board.putShip([4, 4], P1_ship, "ver")

            P2.attack(P1, [4, 4])
            P2.attack(P1, [4, 5])
            P2.attack(P1, [4, 6])
            expect(P1.board.allShipSunk()).toBe(true)
        })

        test("P1 has two ship & P2 destroyed one of it (allShipSunk returns false)", () => {
            const P1 = Player()
            const P2 = Player()
            const P1_ship = Ship(3)
            const P1_ship1 = Ship(2)

            P1.board.putShip([4, 4], P1_ship, "ver")
            P1.board.putShip([8, 8], P1_ship1, "ver")

            P2.attack(P1, [4, 4])
            P2.attack(P1, [4, 5])
            P2.attack(P1, [4, 6])
            expect(P1.board.allShipSunk()).toBe(false)
        })
    })

    describe("Random attack tests", () => {
        test("randomAttack should always return `hit` or `miss`", () => {
            const P1 = Player()
            const P2 = Player()
            const P1_ship = Ship(3)

            P1.board.putShip([4, 4], P1_ship, "ver")
            // Had to look up toMatch
            expect(P2.randomAttack(P1)).toMatch(/hit|miss/)
        })

        test("No duplicates in random attacks", () => {
            const P1 = Player()
            const P2 = Player()
            const P1_ship = Ship(3)

            P1.board.putShip([4, 4], P1_ship, "ver")
            for (let i = 0; i < 100; i++) {
                P2.randomAttack(P1)
            }

            for (let coord of P2.attemShots) {
                const duplicates = P2.attemShots.filter(item => item[0] === coord[0] && item[1] === coord[1])
                expect(duplicates.length).toBe(1)
            }
        })

        test("Never goes out of bounds", () => {
            const P1 = Player()
            const P2 = Player()
            const P1_ship = Ship(3)

            P1.board.putShip([4, 4], P1_ship, "ver")
            for (let i = 0; i < 100; i++) {
                P2.randomAttack(P1)
            }

            for (let coord of P2.attemShots) {
                const cond = coord[0] >= 0 && coord[0] <= 9 && coord[1] >= 0 && coord[1] <= 9
                expect(cond).toBe(true)
            }
        })
    })
})