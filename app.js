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
const helpbtn = document.getElementById('help-btn')
const infoPopup = document.querySelector('#info-pop-up')
const btnclose = document.querySelector('#btn-close')
const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅',]
//dice symbols got from google

function updateStatus () {
    livesDisplay.textContent = ` ${lives}`
    score.textContent = wins
    highScoreDisplay.textContent = highScore
} 
//function prediction should be checked in 
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

//
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
// how to get both dices to bring random no.
        const roll1 = Math.floor(Math.random() * 6) + 1
        const roll2 = Math.floor(Math.random() * 6) + 1
        const total = roll1 + roll2

        dice1El.textContent = diceFaces[roll1 - 1]
        console.log(roll1)
        console.log(diceFaces[roll1])
        dice2El.textContent = diceFaces[roll2 - 1]
        console.log(roll2)
        console.log(diceFaces[roll2])

        //winning condition
        let actualOutcome = ''
        if (total > 7) {
            actualOutcome = 'more'
        } else if (total < 7) {
            actualOutcome = 'less'
        } else {
            actualOutcome = 'exact'
        }
// if condition for winner to add lives and add highscore and loser should have 1 life less.
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
// Game Over condition.
        if (lives <= 0) {
            message.className = 'message lose-msg'
            message.textContent = `GAME OVER!!!🤦‍♂️ Out Of Lives. Final wins: ${wins}`
            setControlsDisabled(true)
            resetbtn.style.display = 'block'
        } else {
            setControlsDisabled(false)
        }
    })
    //after reset every thing should start from start
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
//to reset highscore
resetshsbtn.addEventListener('click', () => {
    if (isRolling) return
    highScore = 0
    localStorage.removeItem('LuckyHighScore')
    updateStatus()
    message.className = 'message'
    message.textContent = 'High Score has been reset 0.'
})
//infopopUp for Instructions
helpbtn.addEventListener('click', () => {
    infoPopup.showModal()
})

btnclose.addEventListener('click', () =>{
    infoPopup.close()
})
updateStatus()

