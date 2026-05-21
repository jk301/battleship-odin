// placements.js
import "./placements.css"
import { Ship } from "../../ship/ship.js"


export function placements (choice, player, onConfirm) {

    console.log("The choice is " + choice)
    const main = document.createElement('div')
    main.classList.add('main')

    const shipContainer = shipDiv()
    const ships = shipContainer.querySelectorAll('.ship')
    const allShips = setupShips(ships)

    const secDiv = document.createElement('div')
    secDiv.classList.add('sec-div')

    const grid = Grid()
    const cells = grid.querySelectorAll('.grid-div')


    const secRightDiv = document.createElement('div')
    secRightDiv.classList.add('sec-right-div')

    const help = helpText()

    const rand = document.createElement('button')
    rand.classList.add('rand-button')
    rand.textContent = "Randomize"

    const confirm = document.createElement('button')
    confirm.classList.add('confirm-button')
    confirm.textContent = 'Confirm'
    confirm.disabled = true

    confirm.addEventListener('click', () => {
        onConfirm()
    })

    const gridCells = setupCells(cells, allShips.getCurrShip, allShips.resetShip, ships,  player.board, confirm)

    secRightDiv.appendChild(help)
    secRightDiv.appendChild(rand)
    secRightDiv.appendChild(confirm)

    secDiv.appendChild(grid)
    secDiv.appendChild(secRightDiv)

    main.appendChild(shipContainer)
    main.appendChild(secDiv)

    return main
}


function shipDiv () {
    const main = document.createElement('div')
    main.classList.add('ship-div')

    const ships = [
        { name: "Carrier", length: 5 },
        { name: "Battleship", length: 4 },
        { name: "Cruiser", length: 3 },
        { name: "Submarine", length: 3 },
        { name: "Destroyer", length: 2},
    ]

    ships.forEach(ship => {
        const div = document.createElement('div')
        const title = document.createElement('h3')
        const length = document.createElement('p')
        div.classList.add('ship')
        div.dataset.length = ship.length
        div.dataset.name = ship.name
        div.dataset.placed = false
        
        title.textContent = ship.name
        length.textContent = `Length - ${ship.length}`
        
        div.appendChild(title)
        div.appendChild(length)
        main.appendChild(div)
    })

    return main
}


function Grid () {
    const main = document.createElement('div')
    main.classList.add('grid')

    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div')
        cell.classList.add('grid-div')
        cell.dataset.x = i % 10
        cell.dataset.y = 9 - Math.floor(i / 10)
        // cell.addEventListener('mouseover', () => {
        //     console.log(`x : ${cell.dataset.x}, y : ${cell.dataset.y}`)
        // })
        main.appendChild(cell)
    }

    return main
}


function helpText () {
    // may add more. thats why a separate func
    const main = document.createElement('div')
    main.classList.add('help-text')

    const rotate = document.createElement('p')
    rotate.textContent = " (*) -> press mouse right click to rotate."

    main.appendChild(rotate)
    return main
}

function setupShips (ships) {
    let currShipName = null
    let currShipLength = null

    ships.forEach(ship => {
        ship.classList.remove('active')
        ship.addEventListener('click', () => {
            if (ship.dataset.placed === "true") return
            currShipName = ship.querySelector('h3').textContent
            currShipLength = ship.dataset.length

            ships.forEach(s => s.classList.remove('active'))
            ship.classList.add('active')
        })
    })

    return {
        getCurrShip : () => ({ name: currShipName, length: currShipLength}),
        resetShip : () => { currShipName = null; currShipLength = null }
    }
}

function setupCells (cells, getShip, resetShip, ships, board, confirm) {
    let orient = "ver"
    cells.forEach(cell => {
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault() // stops from opening menu
            orient = orient === 'ver' ? 'hor' : 'ver'
        })
        cell.addEventListener('mouseover', () => {
            if (getShip().name === null) {
                return
            } else {

                let x = cell.dataset.x
                let y = cell.dataset.y
                let shipLength = getShip().length

                const ship = Ship(shipLength)
                const coords = [Number(x), Number(y)]
                const putting = board.checkShip(coords, ship, orient)


                if (orient === 'ver') {
                    for (let i = 0; i < shipLength; i++) {
                        cells.forEach (item => {
                            if (putting === false) {
                                if ((item.dataset.x === x && item.dataset.y === String(Number(y) + i))){
                                    item.classList.add('invalid')
                                }
                            } else if (item.dataset.x === x && item.dataset.y === String(Number(y) + i)) {
                                item.classList.add('highlight')
                            }
                        })
                    }
                } else if (orient === 'hor') {
                    for (let i = 0; i < shipLength; i++) {
                        cells.forEach (item => {
                            if (putting === false) {
                                if (item.dataset.x === String(Number(x) + i) && item.dataset.y === y) {
                                    item.classList.add('invalid')
                                }
                            } else if (item.dataset.x === String(Number(x) + i) && item.dataset.y === y) {
                                item.classList.add('highlight')
                            }
                        })
                    }
                }


            }
        })

        cell.addEventListener('mouseleave', () => {
            cells.forEach(c => c.classList.remove('highlight'))
            cells.forEach(c => c.classList.remove('invalid'))
        })

        // cliclk
        cell.addEventListener('click', () => {
            if (getShip().name === null) {
                return
                
            } else {

                const ship1 = Ship(getShip().length)
                const x = cell.dataset.x
                const y = cell.dataset.y
                const coords = [Number(x), Number(y)]
                const putting = board.putShip(coords, ship1, orient)


                if (putting === 'out-of-bound' || putting === 'occupied') {
                    console.log('Invalid placement')

                } else {
                    console.log(`Placed ${getShip().name} at [ ${coords} ], orientation : ${orient}`)

                    ships.forEach (ship => {
                        if (getShip().name === ship.dataset.name) {
                            ship.dataset.placed = true
                            ship.classList.remove('active')
                            ship.classList.add('disabled')
                        } 
                    })

                    const allPlaced = Array.from(ships).every(ship => ship.dataset.placed === "true")

                    if (allPlaced) confirm.disabled = false

                    if (orient === 'ver') {
                        for (let i = 0; i < getShip().length; i++) {
                            cells.forEach (item => {
                                if (item.dataset.x === x && item.dataset.y === String(Number(y) + i)) {
                                    item.classList.add('placed')
                                }
                            })
                        }
                    } else if (orient === 'hor') {
                        for (let i = 0; i < getShip().length; i++) {
                            cells.forEach (item => {
                                if (item.dataset.x === String(Number(x) + i) && item.dataset.y === y) {
                                    item.classList.add('placed')
                                }
                            })
                        }
                    }

                    resetShip()

                }
            }
        })
    })
}