// placements.js
import "./placements.css"
import { Ship } from "../../ship/ship.js"

export function placements (choice) {
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
    const gridCells = setupCells(cells, allShips.getCurrShip)

    const secRightDiv = document.createElement('div')
    secRightDiv.classList.add('sec-right-div')

    const help = helpText()

    const rand = document.createElement('button')
    rand.classList.add('rand-button')
    rand.textContent = "Randomize"

    const confirm = document.createElement('button')
    confirm.classList.add('confirm-button')
    confirm.textContent = 'Confirm'

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
            currShipName = ship.querySelector('h3').textContent
            currShipLength = ship.dataset.length

            ships.forEach(s => s.classList.remove('active'))
            ship.classList.add('active')
        })
    })

    return {
        getCurrShip : () => ({ name: currShipName, length: currShipLength})
    }
}

function setupCells (cells, getShip) {
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


                if (orient === 'ver') {
                    for (let i = 0; i < shipLength; i++) {
                        cells.forEach (item => {
                            if (item.dataset.x === x && item.dataset.y === String(Number(y) + i)) {
                                item.classList.add('highlight')
                            }
                        })
                    }
                } else if (orient === 'hor') {
                    for (let i = 0; i < shipLength; i++) {
                        cells.forEach (item => {
                            if (item.dataset.x === String(Number(x) + i) && item.dataset.y === y) {
                                item.classList.add('highlight')
                            }
                        })
                    }
                }
            }
        })
        cell.addEventListener('mouseleave', () => {
            cells.forEach(c => c.classList.remove('highlight'))
        })
    })
}