// app.js
const rev = require('./reversi.js');
const readlineSync = require('readline-sync');
const fs = require('fs');

let passedLink = "";
if (process.argv[2] !== undefined){
    console.log("hello");
    passedLink = process.argv[2];
}

fs.readFile(passedLink, 'utf8', function (err, data) {
    if(passedLink === ""){
        createCustomGame();
    } else if (err) {
        throw err;
    }else{
        const obj = JSON.parse(data);
        createBoardInfo(obj);


    }
});


function createBoardInfo(jsonObj){
     const board = jsonObj.boardPreset.board;

    const playerLetter = jsonObj.boardPreset.playerLetter;
    const opponent = getOpponentPiece(playerLetter);
    //console.log(jsonObj.boardPreset.player);
    rev.placeLetters(board, playerLetter, jsonObj.scriptedMoves.player);
    rev.placeLetters(board, opponent, jsonObj.scriptedMoves.computer);
    console.log(rev.boardToString(board));
    playGame(board, playerLetter, opponent);
}
function getOpponentPiece(playerLetter){
    let opponent = "";
    if (playerLetter === "X"){
        opponent = "O";
    }else{
        opponent = "X";
    }
    return opponent;
}
function createCustomGame() {
    const playerLetter = setUpCustomPlayerPiece();
    const board = setUpCustomBoard(playerLetter);
    const opponent = getOpponentPiece(playerLetter);
    console.log(rev.boardToString(board));

    playGame(board, playerLetter, opponent);
}
function setUpCustomPlayerPiece(){
    let piece = "";
    while (piece === "") {
        const answer = readlineSync.question('Pick your letter: X (black) or O (white) \n>');
        if (answer === 'X' || answer === 'O'){
            piece = answer;
        }else{
            continue;
        }

    }
    return piece;
}
function setUpCustomBoard(playerLetter){
    let width = 0;
    while (width === 0) {
        const answer = readlineSync.question('How wide should the board be? (even numbers between 4 and 26, inclusive) \n>');
        if (answer.isNaN) {
            continue;
        } else if (answer > 26 || answer < 4 || (answer % 2 !== 0)) {
            continue;
        }
        width = answer;
    }
    const opponent = getOpponentPiece(playerLetter);
    let board = rev.generateBoard(width, width);
    const middle = (width / 2);
    const otherMiddle = middle - 1;

    board = rev.setBoardCell(board, playerLetter, otherMiddle, middle);
    board = rev.setBoardCell(board, playerLetter, middle, otherMiddle);
    board = rev.setBoardCell(board, opponent, otherMiddle, otherMiddle);
    board = rev.setBoardCell(board, opponent, middle, middle);

    return board;



}
function playGame(board, playerLetter, opponent){
    let numPlayerPasses=0;
    let winner = opponent;
    if (playerLetter === "O"){
        console.log("Comupter\'s move first");
        board = computerMove(board, opponent);
    }

    while((board.length > 0) && !rev.isBoardFull(board) && (numPlayerPasses < 2)){
        const possibleMoves = rev.getValidMoves(board, playerLetter);
        if(possibleMoves === []){
            console.log("You don't have any valid moves");
            numPlayerPasses++;
            board = computerMove(board, opponent);
            //will this happen??
            if(board.length < 0){
                break;
            }
        }
        let answer = readlineSync.question('What\'s your move? \n>');
        //TODO: if pass's exceed 2 in this loop, it doesn't fail while loop..
        if(answer === "" || answer === " "){ //"pass"
            console.log("You passed on your turn!");
            numPlayerPasses++;
            board = computerMove(board, opponent);
            continue;
        }
        //get valid input
        while(!rev.isValidMoveAlgebraicNotation(board, playerLetter, answer)){
            console.log("INVALID MOVE. Your move should: \n * be in a  format \n * specify an existing empty cell \n * flip at least one of your oponent's pieces\n");
            answer = readlineSync.question('What\'s your move? \n>');
            if(answer === "" || answer === " "){ //"pass"
                console.log("You passed on your turn!");
                numPlayerPasses++;
                board = computerMove(board, opponent);
                continue;
            }
        }
        const rowColObj = rev.algebraicToRowCol(answer);
        board = rev.placeLetter(board, playerLetter, answer);
        const cellsToFlip = rev.getCellsToFlip(board, rowColObj.row, rowColObj.col);

        if(cellsToFlip.length < 0){
            console.log("you have no valid moves :( going to computer's turn.");
            numPlayerPasses++;
        }else {
            board = rev.flipCells(board, cellsToFlip);
            console.log(rev.boardToString(board));
            showScore(board);
        }
        board = computerMove(board, opponent);
        if(board === []){
            winner = playerLetter;
            continue; //skip to player's turn
        }

    }
    if(numPlayerPasses >=2){
        console.log("You exceeded max passes of 2... \n");
    }
    console.log("END OF GAME!! Winner: " + winner);
}

function computerMove(board, compPiece){
    readlineSync.question("Press <ENTER> to see computer\'s move");
    const possibleMoves = rev.getValidMoves(board, compPiece);
    //console.log("possible moves in comp: " + possibleMoves);
    if(possibleMoves.length === 0){
        return [];
    }
    const compMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
    const row = compMove[0];
    const col = compMove[1];
    board = rev.setBoardCell(board, compPiece, row, col );
    const cellsToFlip = rev.getCellsToFlip(board, row, col);
    board = rev.flipCells(board, cellsToFlip);

    console.log(rev.boardToString(board));
    showScore(board);
    return board;

}
function showScore(board){
    const scoreObj = rev.getLetterCounts(board);
    console.log("SCORE:\n X: " + scoreObj.X + "\n O: " + scoreObj.O);
}


