let lives = 5
let wins = 0
//high score will be stored in the broswer
let highScore = Number(localStorage.getItem('LuckyHighScore')) || 0
let isRolling = false

const livesDisplay = document.getElementById('lives')
const score = document.getElementById('win')
const highScoreDisplay = document.getElementById('highscore')
const bigCircle = document.querySelector('.big-circle')
const dice1El = document.getElementById('dice1')
const dice2El = document.getElementById('dice2')
const message = document.getElementById("message-box")
const rollbtn = document.getElementById('btn-roll')
const resetbtn = document.getElementById('btn-reset')
const resetshsbtn = document.getElementById('btn-reset-hs')
const radioInputs = document.querySelectorAll('input[name="Prediction"]')
const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅',]
//dice symbols got from google

function updateStatus () {
    livesDisplay.textContent = `❤️ ${lives}`
    score.textContent = wins
    highScoreDisplay.textContent = highScore
} 

function getSelectedPrediction () {
    for (const input of radioInputs) {
        if (input.checked) return input.value
    }
    return null
}
function setControlsDisabled(disabled) {
    rollbtn.disabled = disabled
    radioInputs.forEach(input => input.disabled = disabled)
}
rollbtn.addEventListener('click', () => {
        if (isRolling || lives <= 0) return


        const guess = getSelectedPrediction()
        if (!guess) {
            message.className = "message lose-msg"
            message.textContent = "Please tick one of the 3 options first"
            return
        }
        isRolling = true
        setControlsDisabled(true)
        message.className = "message"
        message.textContent = "Rolling inside the Circle"

        bigCircle.classList.add('rolling-circle')
        dice1El.classList.add('rolling-dice')
        dice2El.classList.add('rolling-dice')

        const roll1 = Math.floor(Math.random() * 6) + 1
        const roll2 = Math.floor(Math.random() * 6) + 1
        const total = roll1 + roll2

        dice1El.textContent = diceFaces[roll1 - 1]
        dice2El.textContent = diceFaces[roll2 - 1]
        //winning condition
        let actualOutcome = ''
        if (total > 7) {
            actualOutcome = 'more'
        } else if (total < 7) {
            actualOutcome = 'less'
        } else {
            actualOutcome = 'exact'
        }

        if (guess === actualOutcome) {
            wins++
            lives++
            if (wins > highScore) {
                highScore = wins
                localStorage.setItem('LuckyHighScore', highScore)
            }
            message.className = 'message win-msg'
            message.textContent = `Total is ${total}! Correct Guess 👍 (+1 win)`
        } else {
            lives--
            message.className = 'message lose-msg'
            message.textContent = `Total is ${total}! Wrong Guess 👎 (-1 life)`
        }
        updateStatus()
        isRolling = false

        if (lives <= 0) {
            message.className = 'message lose-msg'
            message.textContent = `GAME OVER!!!🤦‍♂️ Out Of Lives. Final wins: ${wins}`
            setControlsDisabled(true)
            resetbtn.style.display = 'block'
        } else {
            setControlsDisabled(false)
        }
    })
resetbtn.addEventListener('click', () => {
    lives = 5
    wins = 0
    dice1El.textContent = '?'
    dice2El.textContent = '?'
    radioInputs.forEach(input => input.checked = false)
    message.className = 'message'
    resetbtn.style.display = 'none'
    updateStatus()
    setControlsDisabled(false)
})

resetshsbtn.addEventListener('click', () => {
    if (isRolling) return
    highScore = 0
    localStorage.removeItem('LuckyHighScore')
    updateStatus()
    message.className = 'message'
    message.textContent = 'High Score has been reset 0.'
})
updateStatus()
