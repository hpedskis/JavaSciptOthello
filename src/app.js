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
    let middle = (width / 2);
    let otherMiddle = middle - 1;

    board = rev.setBoardCell(board, playerLetter, otherMiddle, middle);
    board = rev.setBoardCell(board, playerLetter, middle, otherMiddle);
    board = rev.setBoardCell(board, opponent, otherMiddle, otherMiddle);
    board = rev.setBoardCell(board, opponent, middle, middle);

    return board;



}
function playGame(board, playerLetter, opponent){
    let numPlayerPasses =0;
    let numCompPasses = 0;
    if (playerLetter === "O"){
        board = computerMove(board, opponent, numCompPasses);

    }
    //while loop to continually ask for moves
    while(!rev.isBoardFull(board) && numPlayerPasses < 2 && numCompPasses < 2){
        let answer = readlineSync.question('What\'s your move? \n>');
        let possibleMoves = rev.getValidMoves(board, playerLetter);
        while(!rev.isValidMoveAlgebraicNotation(board, playerLetter, answer) &&  !possibleMoves.isEmpty){
            console.log("INVALID MOVE. Your move should: \n * be in a  format \n * specify an existing empty cell \n * flip at least one of your oponent's pieces\n");
            answer = readlineSync.question('What\'s your move? \n>');
        }
        //no possible moves
        if(possibleMoves.isEmpty){
            console.log("No valid moves available for you.\n Press <ENTER> to pass.");
            numPlayerPasses++;
            board = computerMove(board, opponent, numCompPasses);
            numCompPasses = numCompPasses; //did computer pass?
        }
        board = rev.placeLetter(board, playerLetter, answer);
        console.log(rev.boardToString(board));
        showScore(board);
        readlineSync.question('Press to show computer\'s move...');
        board = computerMove(board, opponent, numCompPasses);
        console.log(rev.boardToString(board));
        showScore(board);
        numCompPasses = numCompPasses; //did computer pass?
    }
}

function computerMove(board, compPiece, passes){
    let possibleMoves = rev.getValidMoves(board, compPiece);
    if(possibleMoves.isEmpty){
        passes++;
    }
    const compMove = possibleMoves[Math.floor(Math.random()*possibleMoves.length)];
    const row = compMove[0];
    const col = compMove[1];
    board = rev.setBoardCell(board, compPiece, row, col );
    return board;

}
function showScore(board){
    const scoreObj = rev.getLetterCounts(board);
    console.log("SCORE:\n X: " + scoreObj.X + "\n O: " + scoreObj.O);
}


