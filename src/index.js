/* index.js */
import "./styles.css";
import { select_screen } from "./pages/select_screen/select_screen.js";
import { placements } from "./pages/placements/placements.js";
import { Player } from './player/player.js'
import { gameScreen } from "./pages/game_screen/game_screen.js";
import { randomPlacement } from "./pages/random/random.js";
import { passScreen } from "./pages/pass_screen/pass_screen.js";

const root = document.getElementById('root')

function showNow (page) {
    root.innerHTML = ""
    root.appendChild(page)
}

function startGame(choice) {
    const P1 = Player()
    const P2 = Player()

    if (choice === 'player') {
        showNow(passScreen('Player - 1', () => {
            showNow(placements(choice, P1, 'Player 1', () => {
                showNow(passScreen('Player - 2', () => {
                    showNow(placements(choice, P2, 'Player 2', () => {
                        showNow(passScreen('Player - 1', () => {
                            showNow(gameScreen(P1, P2, choice, () => startGame(choice)))
                        }))
                    }))
                }))
            }))
        }))

    } else if (choice === 'computer') {
        showNow(placements(choice, P1, 'Player - 1', () => {
            randomPlacement(P2.board)
            showNow(gameScreen(P1, P2, choice, () => startGame(choice)))
        })) 
    }
}

const select = select_screen((choice) => startGame(choice))
showNow(select)


// function startGame(choice) {
//     const P1 = Player()
//     const P2 = Player()

//     showNow(placements(choice, P1, 'Player 1', () => {
//         if (choice === "player") {
//             showNow(placements(choice, P2, 'Player 2', () => {
//                 showNow(gameScreen(P1, P2, choice, () => startGame(choice)))
//             }))
//         } else if (choice === 'computer') {
//             randomPlacement(P2.board)
//             showNow(gameScreen(P1, P2, choice, () => startGame(choice)))
//         }
//     }))
// }