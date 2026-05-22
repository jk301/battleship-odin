// pass_screen.js
import "./pass_screen.css"

export function passScreen (who, next) {
    const main = document.createElement('div')
    main.classList.add('pass-screen')

    const passMsg = document.createElement('div')
    passMsg.textContent = `Pass the screen to`

    const player = document.createElement('h1')
    player.textContent = who

    const proceedMsg = document.createElement('h3')
    proceedMsg.textContent = 'To proceed click on resume'

    const resumeBut = document.createElement('button')
    resumeBut.textContent = 'Resume'

    resumeBut.addEventListener('click', () => {
        next()
    })

    main.appendChild(passMsg)
    main.appendChild(player)
    main.appendChild(proceedMsg)
    main.appendChild(resumeBut)

    return main
}