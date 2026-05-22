import { gameBoard } from "../gameboard/gameboard.js";

export function Player () {

    let board = gameBoard()
    let attemShots = []
    let huntIndex = 0

    function attack (opponent, coords) {
        attemShots.push(coords)
        return opponent.board.receiveAttack(coords)
    }

    function randCoords () { return Math.floor(Math.random() * 10) }

    function randomAttack (opponent) {
        let num1 = randCoords()
        let num2 = randCoords()

        while (attemShots.some(item => item[0] === num1 && item[1] === num2)) {
            num1 = randCoords()
            num2 = randCoords()
        }
        attemShots.push([num1, num2])
        return opponent.board.receiveAttack([num1, num2])
    }


    function adjAttack (opponent) {
        const hits = opponent.board.getHitShots().slice(huntIndex)

        if (hits.length === 0) {
            return randomAttack(opponent)
        }

        const lastHit = hits.at(-1)

        let validShots = [
            [lastHit[0] + 1, lastHit[1]],
            [lastHit[0] - 1, lastHit[1]],
            [lastHit[0], lastHit[1] + 1],
            [lastHit[0], lastHit[1] - 1],
        ]

        validShots = validShots.filter(i => i[0] >= 0 && i[0] <= 9 && i[1] >= 0 && i[1] <= 9)
        validShots = validShots.filter(i => !attemShots.some(k => k[0] === i[0] && k[1] === i[1]))

        if (validShots.length === 0) {
            huntIndex = opponent.board.getHitShots().length
            return randomAttack(opponent)
        }

        const result = attack(opponent, validShots[0])
        if (result === 'hit' && opponent.board.isShipSunkAt(validShots[0])) {
            huntIndex = opponent.board.getHitShots().length
        }
        return result
    }


    return {
        attack,
        randomAttack,
        adjAttack,
        board,
        attemShots,
    }
}