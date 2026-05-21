/* index.js */
import "./styles.css";
import { select_screen } from "./pages/select_screen/select_screen.js";
import { placements } from "./pages/placements/placements.js";
import { Player } from './player/player.js'
import { gameScreen } from "./pages/game_screen/game_screen.js";
import { randomPlacement } from "./pages/random/random.js";

const root = document.getElementById('root')

function showNow (page) {
    root.innerHTML = ""
    root.appendChild(page)
}

const select = select_screen((choice) => {
    const P1 = Player()
    const P2 = Player()

    showNow(placements(choice, P1, 'Player 1 ',() => {
        if (choice === "player") {
            showNow(placements(choice, P2, 'Player 2 ', () => showNow(gameScreen(P1, P2, choice))))
        } else if (choice === 'computer') {
            randomPlacement(P2.board)
            showNow(gameScreen(P1, P2, choice))
        }
    }))
})

showNow(select)