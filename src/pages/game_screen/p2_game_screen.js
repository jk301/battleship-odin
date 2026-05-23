// p2_game_screen.js
import "./game_screen.css"
import { updateBoard, Grid } from "../placements/placements.js"
import { gameOver } from "../game_over/game_over.js"
import { passScreen } from "../pass_screen/pass_screen.js"
import { updateHiddenBoard } from "./game_screen.js"

export function p2_gameScreen (P1, P2, choice, onRestart, onDone) {
    const main = document.createElement('div')
    main.classList.add('main-game-screen')

    const p2Name = choice === 'computer' ? 'Computer' : 'Player 2'
    const head = header('Player 1', 'Player 1', p2Name)

    const gridContainer1 = document.createElement('div')
    gridContainer1.classList.add('grid-container')

    const gridContainer2 = document.createElement('div')
    gridContainer2.classList.add('grid-container')

    const showTurn = document.createElement('div')
    showTurn.classList.add('turn-div')

    const turnText = document.createElement('p')
    turnText.textContent = "Turn"
    showTurn.appendChild(turnText)

    const P1_grid = Grid()
    const P2_grid = Grid()

    const P1_cells = P1_grid.querySelectorAll('.grid-div')
    const P2_cells = P2_grid.querySelectorAll('.grid-div')

    // updateBoard(P1_cells, P1.board.getBoard())
    // // for testing :)
    updateBoard(P2_cells, P2.board.getBoard())
    updateHiddenBoard(P2_cells, P2.board.getHitShots(), P2.board.getMissedShots())
    updateHiddenBoard(P1_cells, P1.board.getHitShots(), P1.board.getMissedShots())

    const delay = ms => new Promise(res => setTimeout(res, ms))

    head.trn.textContent = 'Player - 2'

    P1_cells.forEach (cell => {
        cell.addEventListener('click', async () => {

            let x = Number(cell.dataset.x)
            let y = Number(cell.dataset.y)

            const attack = P2.attack(P1, [x, y])
            console.log(attack)

            if (attack === 'already-hit') return

            markCell(P1_cells, [x, y], attack)

            if (P1.board.allShipSunk() === true) {
                main.appendChild(gameOver('Player - 2', choice, onRestart))
                return
            }

            await delay(450)
            if (attack === 'miss') onDone()
            
        })
    })

    gridContainer1.appendChild(head.p1)
    gridContainer1.appendChild(P1_grid)

    gridContainer2.appendChild(head.p2)
    gridContainer2.appendChild(P2_grid)

    showTurn.appendChild(head.trn)

    main.appendChild(gridContainer1)
    main.appendChild(showTurn)
    main.appendChild(gridContainer2)

    return main
}

function header (player1, turn, player2) {

    const p1 = document.createElement('div')
    p1.textContent = player1

    const trn = document.createElement('div')
    trn.textContent = turn

    const p2 = document.createElement('div')
    p2.textContent = player2

    return {
        p1,
        trn,
        p2,
    }
}

function markCell(cells, coords, result) {
    cells.forEach(cell => {

        // just in case
        if (result === 'already-hit') return

        if (Number(cell.dataset.x) === coords[0] && Number(cell.dataset.y) === coords[1]) {
            if (result === 'hit') {
                cell.classList.add('hit')
            } else if (result === 'miss') {
                cell.classList.add('miss')
            } 
        }
    })
}
