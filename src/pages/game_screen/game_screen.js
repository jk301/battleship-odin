// game_screen.js
import "./game_screen.css"
import { updateBoard, Grid } from "../placements/placements.js"

export function gameScreen (P1, P2, choice) {
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

    updateBoard(P1_cells, P1.board.getBoard())
    updateBoard(P2_cells, P2.board.getBoard())

    P2_cells.forEach (cell => {
        cell.addEventListener('click', () => {
            let x = Number(cell.dataset.x)
            let y = Number(cell.dataset.y)

            const attack = P1.attack(P2, [x, y])

            markCell(P2_cells, [x, y], attack)
            
            if (choice === "computer"){
                const counter = P2.randomAttack(P1)
                const lastShot = P2.attemShots.at(-1)

                markCell(P1_cells, lastShot, counter)
            }

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
        if (Number(cell.dataset.x) === coords[0] && Number(cell.dataset.y) === coords[1]) {
            if (result === 'hit') {
                cell.classList.add('hit')
            } else if (result === 'miss') {
                cell.classList.add('miss')
            } else if (result === 'already-hit') return
        }
    })
}

// export function updateBoard (cells, board) {
//     cells.forEach(cell => {
//         const x = Number(cell.dataset.x)
//         const y = Number(cell.dataset.y)

//         console.log(board[0])
//         if (board[x][y] !== null) cell.classList.add('placed')
//     })
// }