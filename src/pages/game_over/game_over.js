// game_over.js
import "./game_over.css"

export function gameOver (winner, choice, onRestart) {
    const main = document.createElement('div')
    main.classList.add('game-over')

    const winScreen = document.createElement('div')
    winScreen.textContent = `${winner} WON !! `

    const tryAgain = document.createElement('button')
    tryAgain.textContent = `Restart`

    tryAgain.addEventListener('click', () => {
        onRestart()
    })

    main.appendChild(winScreen)
    main.appendChild(tryAgain)

    return main
}