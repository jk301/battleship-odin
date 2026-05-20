// select_screen.js
import "./select_screen.css"

export function select_screen (onStart) {
    const main = document.createElement('div')
    main.classList.add('main')

    const title = document.createElement("h1")
    title.classList.add('title')
    title.textContent = "! BATTLESHIP !"

    const choose = document.createElement('p')
    choose.textContent = 'Choose your opponent'

    const buttonDiv = document.createElement('div')
    buttonDiv.classList.add('buttonDiv')

    const computerBut = document.createElement('button')
    computerBut.textContent = "Computer"
    const playerBut = document.createElement('button')
    playerBut.textContent = 'Player'

    buttonDiv.appendChild(computerBut)
    buttonDiv.appendChild(playerBut)


    const startBut = document.createElement('button')
    startBut.classList.add('start')
    startBut.textContent = 'Start'

    main.appendChild(title)
    main.appendChild(choose)
    main.appendChild(buttonDiv)
    main.appendChild(startBut)

    startBut.disabled = true
    let choice = null

    computerBut.addEventListener('click', () => {
        startBut.disabled = false
        choice = 'computer'
        playerBut.classList.remove('active')
        computerBut.classList.add('active')
    })

    playerBut.addEventListener('click', () => {
        startBut.disabled = false
        choice = 'player'
        computerBut.classList.remove('active')
        playerBut.classList.add('active')

    })

    startBut.addEventListener('click', () => {
        onStart(choice)
    })

    return main
}