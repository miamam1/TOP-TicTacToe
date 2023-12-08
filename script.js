/* probably going to have to restart again... */

/* follow the building a house from inside out article's connect 4 logic, follow how they structure the console version */
/* which is mostly hacing multiple functions instead of one big function which runs all the game logic, start from end. */
/* and some other stuff but ye. */
/* tried asking odin discord but everyone ignored me :DDD */







function gameBoard() {
    let board = ["x", "x", "x", "x", "x", "x", "x", "x", "x"]

    const getBoard = () => board;

    const playerInput = (board, player, position) => {
        if(board[position] !== "x") { return }
        board[position] = player
    }
    //shouldn't need access to board, only should be able to view the board, if that makes sense.
    //which is why board isnt returned.
    return {getBoard, playerInput}
}



//I shouldn't need a cell function because in this context I have already inserted the player turn
// in the gameboard.
//And in theory to disply the board should only need to be able to read the board and its values
// maybe like an for loop for each part then an if statement, if 1 then print 1 if 0 then print 0 etc



function gameController (player = "0") {
    
    const Board = gameBoard()
    
    
    const switchTurn = () => {
        player = player === "0" ? player = "1" : player = "0"
    }

    const getPlayer = () => player


    const printRound = () => {
        console.log(Board.getBoard())
        console.log(`its ${player}'s turn`)
    }

    const winCondition = () => {
        //doesnt entirely work, e.g. because it uses player, its whoever's turn it is
        // so causes draws where 1 or 0 should've won.
        board = Board.getBoard()
        if(board[0] === player && board[1] === player && board[2] === player 
            || board[3] === player && board[4] === player && board[5] === player
            || board[6] === player && board[7] === player && board[8] === player
            || board[0] === player && board[3] === player && board[6] === player
            || board[1] === player && board[4] === player && board[7] === player
            || board[2] === player && board[5] === player && board[8] === player
            || board[0] === player && board[4] === player && board[8] === player
            || board[2] === player && board[4] === player && board[6] === player
            )  {
                console.log( `${player} won`)
                return true
            } else if(board.includes("x") == false) {
                console.log('Draw')
                return false
            } else {
                return 
            }
        
    }

    //for this to work on DOM need to change the arrow function to ask for a position
    // (in the () ) , and assign it to a button click (onclick = playround())

    const playRound = (position) => {
    winCondition()
    if(winCondition() == true || winCondition() == false) {
        return {playRound,
        getPlayer,
        consoleGame,
        getBoard: Board.getBoard}
    }
    /* below code is for console version */
    /* let position = prompt("what position 0 - 8") */
    Board.playerInput(Board.getBoard(), player, position)       
    switchTurn()
    printRound()
    }


    printRound()


    //function for playing the game on console
    const consoleGame = () => {
        winCondition()
        while(winCondition() == undefined) {
            playRound()
        }
    }


    return {
        playRound,
        getPlayer,
        consoleGame,
        getBoard: Board.getBoard

    }



}



function screenController() {
    const game = gameController()
    const playerTurnDiv = document.getElementById('turn')
    const boardDiv = document.getElementById('board')

    const updateScreen = () => {
        boardDiv.textContent = ""
        const board = game.getBoard()
        const activePlayer = game.getPlayer()
        playerTurnDiv.textContent = `${activePlayer}'s turn...`
        board.forEach((item, index) => {
            const cellButton = document.createElement("button")
            cellButton.classList.add("cell")
            cellButton.textContent = item
            cellButton.onclick = function() {
                BtnClick(index)
            }
            boardDiv.appendChild(cellButton)
           
        })

    }
    const BtnClick = (index) => {
        game.playRound(index)
        updateScreen()
        
    }
    

    updateScreen()
    
}

screenController()



//I am lazy and running out of time so doing it how this dude did it:
//https://jbearcode.github.io/tic-tac-toe/
//restart button active at all time so no logic needed for when the games over
//now just need to fix wincondition problems and show who won
//well and css/html shit to make it look nice but yk


