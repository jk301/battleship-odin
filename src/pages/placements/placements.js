// placements.js
import "./placements.css"
import { Ship } from "../../ship/ship.js"

export function placements (choice) {
    console.log("The choice is " + choice)
    const main = document.createElement('div')
    main.classList.add('main')

    const shipContainer = shipDiv()

    const secDiv = document.createElement('div')
    secDiv.classList.add('sec-div')

    const grid = Grid()

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
        main.appendChild(cell)
    }

    return main
}


function helpText () {
    // may add more. thats why a separate func
    const main = document.createElement('div')
    main.classList.add('help-text')

    const rotate = document.createElement('p')
    rotate.textContent = " * -> press mouse right click to rotate."

    main.appendChild(rotate)
    return main
}