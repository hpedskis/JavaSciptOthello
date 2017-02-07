// reversi.js

/*/
 repeat creates an Array that contains value as each element for n elements.
 If the value is a reference type, it's ok if the reference is copied
 (that is, you don't have to worry about deep copying value if it's an Object).
 */
function repeat(value, n){
    const arr = [];
    for(let i=0; i<n; i++){
        arr.push(value);
    }
    return arr;

}
/*
 Creates a single dimensional Array representation of a Reversi board. The number of elements in the Array is
 the same as the number of squares in the board based on the supplied number of rows and columns.
 The initial value in each cell is the initialCellValue passed in
 */


//console.log(theBoard);
function generateBoard(rows, columns) {
    const board = [];
    for(let i=0; i< rows; i++){
        board.push.apply(board, repeat(" ", columns));
    }

    return board;


}
/*
 A cell in a Reversi board can be specified by a row number and a column number.
 However, our board implementation uses a one dimensional Array, so a cell must be specified by a single index.
 This function translates a row and a column into an index in the one dimensional Array representation of a Reversi board.
 */

function rowColToIndex(board, rowNum, colNum){
    const numCols = Math.sqrt(board.length);
    //console.log(numCols);
    let indexToReturn = (numCols* rowNum + colNum);

    return indexToReturn;




}

/*
 Translates a single index in a one dimensional Array representation of a board to that cell's row and column.
 The board supplied can be used to determine the max column and row numbers. You can assume that the board is
 always square. Row and column numbers start at 0.
 */



function indexToRowCol(board, i){
    let rowColObj = {
        "row": 0,
        "col": 0
    };
    let res = rowColObj;

    const numCols = Math.sqrt(board.length);
    res.row = Math.floor(i / numCols);
    res.col = (i % numCols);

    return res;

}

/*
 Sets the value of the cell at the specified row and column numbers on the board, board, to the value, letter.
 */



function setBoardCell(board, letter, row, col){
    let newBoard = board.slice(0, board.length);
    const index = rowColToIndex(board, row, col);
    newBoard[index] = letter;
    return newBoard;

}
/*
 Translates algebraic notation specifying a cell into a row and column specifying the same cell.
 If the notation passed in is not valid, then return undefined.
 */

function algebraicToRowCol(algebraicNotation){
    console.log(algebraicNotation);
    if(algebraicNotation === undefined || algebraicNotation.length != 2){
        console.log("failing right away");
        return undefined;
    }
    const letters =['A','B','C','D','E','F','G','H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    let rowColObj = {
        "row": 0,
        "col": 0
    };
    let res = rowColObj;

    let indexInStr = 0;

    let letterNumber = /^[0-9a-zA-Z]+$/;
    if((!algebraicNotation.charAt(indexInStr).match(letterNumber)) || (!algebraicNotation.charAt(indexInStr + 1).match(letterNumber))){
        return undefined;
    }

    const letterIndex = letters.indexOf(algebraicNotation.charAt(indexInStr));
    if(letterIndex === -1) {
        return undefined;
    }
    res.row = (algebraicNotation.charAt(indexInStr + 1) - 1);
    res.col = letterIndex;

    return res;

}

/*
 Translates algebraic notation specifying a cell into a row and column specifying the same cell.
 Use the setBoardCell function you created above to implement this
 */

function placeLetter(board, letter, algebraicNotation){
    let rowAndColObj = algebraicToRowCol(algebraicNotation);
    board = setBoardCell(board, letter, rowAndColObj.row, rowAndColObj.col);
    return board;

}
/*
Same as placeLetter, but can accept multiple cells
 */

function placeLetters(board, letter, ...letters) {
    const algebraicPairs = letters;
    console.log(algebraicPairs);

    for(let i=0; i< algebraicPairs.length; i++){
        board = placeLetter(board, letter, algebraicPairs[i]);
        //console.log(board);
    }
    return board;


}
/*
 Creates a text drawing representation of the Tic Tac Toe board passed in
 */

function boardToString(board){
    let boardString = "    ";
    //first, print num letters
    const letters =['A','B','C','D','E','F','G','H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const width = Math.sqrt(board.length);
    for(let outside = 0; outside<width; outside++){
        boardString += (letters[outside] + "   ");
    }
    boardString += ("\n");
    boardString+= addDashedLines(boardString, width);

    let indexInBoard = 0;
    for(let rowCount = 0; rowCount < width; rowCount++) {
        let elementAtIndex = board[indexInBoard];
        //console.log("element at index " + indexInBoard + " is " + elementAtIndex);
        boardString += ((rowCount + 1) + " ");
        for (let colCount = 0; colCount < width; colCount++) {
            boardString += "| ";
            if (elementAtIndex != " ") {
                boardString += (elementAtIndex + " ");
            } else {
                boardString += ("  ");
            }
            indexInBoard++;
            elementAtIndex = board[indexInBoard];
            //console.log("POST COL: index in board is now " + indexInBoard);

        }
        boardString+= "| \n";
        boardString += addDashedLines(boardString, width);

    }

    return boardString;

}


function addDashedLines(boardString, width){
    let newAddition = "  ";
    for(let next = 0; next<width; next++){
        newAddition += ("+---");
    }
    newAddition += "+\n";
    return newAddition;
}
/*/
 Examines the board passed in to determine whether or not it's full.
 It returns true if there are no empty squares, false if there are still squares available
 */
function isBoardFull(board){
   for(let i=0; i<board.length; i++){
       if(board[i] == " "){
           return false;
       }
   }
   return true;

}

/*
 Using the board passed in, flip the piece at the specified row and col so that it is the opposite color
 by changing X to O or O to X. If no letter is present, do not change the contents of the cell.
 */

function flip(board, row, col){
    let index = rowColToIndex(board, row, col);
    if(board[index] == " "){
        return board; //no change
    }
    else if (board[index] == "X"){
        board[index] = "O";
    }else{
        board[index] = "X";
    }

    return board;

}

/*
    creates a board where board where the letters specified in cellsToFlipare changed to the opposite letter
    - from X to O or O to X (that is, the pieces are changed to the opposite color)
 */

function flipCells(board, cellsToFlip){

    for(let i=0; i< cellsToFlip.length; i++){
        for(let j=0; j<cellsToFlip[i].length;j++){
            board = flip(board, cellsToFlip[i][j][0], cellsToFlip[i][j][1]);

        }
    }
    return board;

}
/*/
 Using the board passed in determine which cells contain pieces to flip based on the last move.
 For example, if the last move was the X played at D3, then all of the O's on the board would be flipped (D2, B3 and C3.
 */

let testBoard = generateBoard(4, 4, " ");
testBoard = placeLetters(testBoard, 'O', 'B3', 'C3', 'D2');
testBoard = placeLetters(testBoard, 'X', 'A3', 'D1', 'D3');
console.log(boardToString(testBoard));
console.log(getCellsToFlip(testBoard, 2, 0));

//ADDED: option param for checking if there's a valid mood before placing piece
function getCellsToFlip(board, lastRow, lastCol, letter){
    let coordsToFlip = [];
    const indexOfPiece = rowColToIndex(board, lastRow, lastCol);
    //did we need to temporarially add a piece to the board to check for validity?
    let addedPiece = false;
    let originalPiece;
    //if we're testing before adding piece...
     if(board[indexOfPiece] === " "){
         board[indexOfPiece] = letter;
         addedPiece = true;

     }
    originalPiece = board[indexOfPiece];

    let otherPiece;
    if(originalPiece === "X"){
        otherPiece = "O";
    }else{
        otherPiece = "X";
    }

    let boardCopy = board.slice(0, board.length);
    boardCopy[indexOfPiece] = "O";
    //put board back to normal, although changes will be in board copy (yay!)
    if(addedPiece){
        board[indexOfPiece] = " ";
    }

    rowColFlipper(boardCopy, lastRow, lastCol, originalPiece, otherPiece, coordsToFlip);
    //remove the first element, which will always be us... {janky fix lol}
    coordsToFlip = coordsToFlip.slice(1, coordsToFlip.length);

    return coordsToFlip;

}



//recursive helper
function rowColFlipper(board, row, col, originalPiece, otherPiece, foundFlip) {

    const indexOfPiece = rowColToIndex(board, row, col);

    const searchHereForFlips = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];

    if(!isOnBoard(board, row, col) || board[indexOfPiece] !=otherPiece){
        return;
    }
    if (board[indexOfPiece] === otherPiece) {
        let coords = [row, col];
        foundFlip.push(coords);
        board[indexOfPiece] = originalPiece; //make piece ours

    }
    for (let i = 0; i < searchHereForFlips.length; i++) {

        let xdirection = searchHereForFlips[i][0];
        let ydirection = searchHereForFlips[i][1];

        let x = row;
        let y = col;

        x += xdirection;
        y += ydirection;

        let currIndex = rowColToIndex(board, x, y);
        foundFlip.concat(rowColFlipper(board, x, y, originalPiece, otherPiece, foundFlip));

    }
    return;
}

function isOnBoard(board, row, col){
    let width = Math.sqrt(board.length);
    if(row >= 0 && row <= width){
        if(col>= 0 && col <=width){
            return true;
        }
    }
    return false;
}


/*/
 Using the board passed in, determines whether or not a move with letter to row and col is valid. A valid move:
 -targets an empty square
 -is within the boundaries of the board
 -adheres to the rules of Reversi… that is, the piece played must flip at least one of the other player's pieces
 */
console.log(isValidMove(testBoard, 'X', 1, 1));
function isValidMove(board, letter, row, col){
    let boardIndex = rowColToIndex(board, row, col);

    if(board[boardIndex] != " "){
        return false;
    }
    if(! isOnBoard(board, row, col)){
        return false;
    }
    const res = getCellsToFlip(board, row, col, letter);
    if (res.length < 1){
        return false;
    }
    return true;

}

/*/
Using the board passed in, determines whether or not a move with letter to algebraicNotation is valid.
Use the functions you previously created, isValidMove and algebraicToRowCol to implement this function.
 */
console.log(isValidMoveAlgebraicNotation(testBoard, 'X', "D2"));
function isValidMoveAlgebraicNotation(board, letter, algebraicNotation){
    console.log(algebraicNotation);
    let rowColObj = algebraicToRowCol(algebraicNotation);
    console.log(rowColObj.row + " " + rowColObj.col);
    return isValidMove(board, letter, rowColObj.row, rowColObj.col);

}
/*/
 Returns the counts of each of the letters on the supplied board. The counts are stored in an object where the count is
 the value and the letter is the property name. For example, if the board has 2 X's and 1 O, then the object return
 would be: { X: 2, O: 1 }
 */
function getLetterCounts(board){

}
/*/
 Gives back a list of valid moves that the letter can make on the board. These moves are returned as a list of
 row and column pairs - an Array containing 2-element Arrays
 */
function getValidMoves(board, letter){

}

module.exports = {
    repeat: repeat,
    generateBoard: generateBoard,
    rowColToIndex: rowColToIndex,
    indexToRowCol: indexToRowCol,
    setBoardCell: setBoardCell,
    algebraicToRowCol: algebraicToRowCol,
    placeLetter: placeLetter,
    placeLetters: placeLetters,
    isBoardFull: isBoardFull,
    flip: flip,
    flipCells: flipCells,
    boardToString: boardToString,
    addDashedLines: addDashedLines,
    getCellsToFlip: getCellsToFlip,
    rowColFlipper: rowColFlipper,
    isOnBoard: isOnBoard,
    isValidMove: isValidMove,
    isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation


}