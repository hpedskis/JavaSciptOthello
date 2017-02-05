// reversi.js

/*/
 repeat creates an Array that contains value as each element for n elements.
 If the value is a reference type, it's ok if the reference is copied
 (that is, you don't have to worry about deep copying value if it's an Object).
 */
function repeat(value, n){
    const arr = [];
    for(var i=0; i<n; i++){
        arr.push(value);
    }
    return arr;

}
/*
 Creates a single dimensional Array representation of a Reversi board. The number of elements in the Array is
 the same as the number of squares in the board based on the supplied number of rows and columns.
 The initial value in each cell is the initialCellValue passed in
 */

const theBoard = generateBoard(3,3);
console.log(theBoard);
function generateBoard(rows, columns) {
    const board = [];
    for(var i=0; i< rows; i++){
        board.push.apply(board, repeat(" ", columns));
    }

    return board;


}
/*
 A cell in a Reversi board can be specified by a row number and a column number.
 However, our board implementation uses a one dimensional Array, so a cell must be specified by a single index.
 This function translates a row and a column into an index in the one dimensional Array representation of a Reversi board.
 */
console.log(rowColToIndex(theBoard, 2, 2));
function rowColToIndex(board, rowNum, colNum){
    const numCols = Math.sqrt(board.length);
    //console.log(numCols);
    var indexToReturn = (numCols* rowNum + colNum);
    return indexToReturn;




}

/*
 Translates a single index in a one dimensional Array representation of a board to that cell's row and column.
 The board supplied can be used to determine the max column and row numbers. You can assume that the board is
 always square. Row and column numbers start at 0.
 */



function indexToRowCol(board, i){
    var rowColObj = {
        "row": 0,
        "col": 0
    };
    var res = rowColObj;

    const numCols = Math.sqrt(board.length);
    res.row = Math.floor(i / numCols);
    res.col = (i % numCols);

    return res;

}

/*
 Sets the value of the cell at the specified row and column numbers on the board, board, to the value, letter.
 */



function setBoardCell(board, letter, row, col){
    var newBoard = board.slice(0, board.length);
    const index = rowColToIndex(board, row, col);
    newBoard[index] = letter;
    return newBoard;

}
/*
 Translates algebraic notation specifying a cell into a row and column specifying the same cell.
 If the notation passed in is not valid, then return undefined.
 */

function algebraicToRowCol(algebraicNotation){
    if(algebraicNotation === undefined || algebraicNotation.length != 2){
        return undefined;
    }
    const letters =['A','B','C','D','E','F','G','H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var rowColObj = {
        "row": 0,
        "col": 0
    };
    var res = rowColObj;

    var indexInStr = 0;

    var letterNumber = /^[0-9a-zA-Z]+$/;
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
    var rowAndColObj = algebraicToRowCol(algebraicNotation);
    board = setBoardCell(board, letter, rowAndColObj.row, rowAndColObj.col);
    return board;

}
/*
Same as placeLetter, but can accept multiple cells
 */
placeLetters(theBoard, "X", "B1", "A2", "C2");
function placeLetters(board, letter, ...letters) {
    const algebraicPairs = letters;
    console.log(algebraicPairs);

    for(var i=0; i< algebraicPairs.length; i++){
        board = placeLetter(board, letter, algebraicPairs[i]);
        //console.log(board);
    }
    return board;


}
/*
 Creates a text drawing representation of the Tic Tac Toe board passed in
 */
function boardToString(board){

}
/*/
 Examines the board passed in to determine whether or not it's full.
 It returns true if there are no empty squares, false if there are still squares available
 */
function isBoardFull(board){

}

/*
 Using the board passed in, flip the piece at the specified row and col so that it is the opposite color
 by changing X to O or O to X. If no letter is present, do not change the contents of the cell.
 */
function flip(board, row, col){

}

/*

 */
function flipCells(board, cellsToFlip){

}
/*/
 Using the board passed in determine which cells contain pieces to flip based on the last move.
 For example, if the last move was the X played at D3, then all of the O's on the board would be flipped (D2, B3 and C3.
 */
function getCellsToFlip(board, lastRow, lastCol){

}
/*/
 Using the board passed in, determines whether or not a move with letter to row and col is valid. A valid move:
 -targets an empty square
 -is within the boundaries of the board
 -adheres to the rules of Reversi… that is, the piece played must flip at least one of the other player's pieces
 */
function isValidMove(board, letter, row, col){

}

/*/
Using the board passed in, determines whether or not a move with letter to algebraicNotation is valid.
Use the functions you previously created, isValidMove and algebraicToRowCol to implement this function.
 */
function isValidMoveAlgebraicNotation(board, letter, algebraicNotation){

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
    placeLetters: placeLetters

}