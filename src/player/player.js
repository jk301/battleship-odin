import { gameBoard } from "../gameboard/gameboard.js";

export function Player () {

    let board = gameBoard()
    let attemShots = []

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

    return {
        attack,
        randomAttack,
        board,
        attemShots,
    }
}