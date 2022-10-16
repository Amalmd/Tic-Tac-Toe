//Variables
let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

//Test - // console.log(boxes);

//Functionality Variables
const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)
let winning = false
let draw = false

//Test- // console.log(spaces);

//The game
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function boxClicked(e) { 
    if ( winning == true){
        return
    }
    //Test - // console.log(e.target);
    const id = e.target.id

    if(!spaces[id]) {
        spaces[id] = currentPlayer  //filling the spaces
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText.textContent = `${currentPlayer} Has Won!`
            let winning_blocks = playerHasWon()
            winning = true

            //Test - // console.log(winning_blocks);
            winning_blocks.map( box => boxes[box].style.backgroundColor = winnerIndicator) //Add a new style background when a user wins
            draw = false
            return
        }
        else if (!spaces.includes(null)){
            playerText.textContent = `It's a Draw, Try Again!`
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}

// winning combinations 
const winningCombos = [
    [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] 
]

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition

        //Check if spaces are match or equal 
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){ 
            return [a, b, c]
        }
    }
    return false

}


//Restar Button to Clear the Board
restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null)
    winning = false

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor = ''
    })

    playerText.textContent = 'Tic Tac Toe'

    currentPlayer = X_TEXT
}

startGame()