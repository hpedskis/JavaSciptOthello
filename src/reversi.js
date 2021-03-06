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
    const indexToReturn = (numCols* rowNum + colNum);

    return indexToReturn;




}

/*
 Translates a single index in a one dimensional Array representation of a board to that cell's row and column.
 The board supplied can be used to determine the max column and row numbers. You can assume that the board is
 always square. Row and column numbers start at 0.
 */



function indexToRowCol(board, i){
    const rowColObj = {
        "row": 0,
        "col": 0
    };
    const res = rowColObj;

    const numCols = Math.sqrt(board.length);
    res.row = Math.floor(i / numCols);
    res.col = (i % numCols);

    return res;

}

/*
 Sets the value of the cell at the specified row and column numbers on the board, board, to the value, letter.
 */



function setBoardCell(board, letter, row, col){
    const newBoard = board.slice(0, board.length);
    const index = rowColToIndex(board, row, col);
    newBoard[index] = letter;
    return newBoard;

}
/*
 Translates algebraic notation specifying a cell into a row and column specifying the same cell.
 If the notation passed in is not valid, then return undefined.
 */
console.log("t1 " + algebraicToRowCol("B3")); // for a 4 x 4 board, {"row": 2, "col": 1}
console.log("t2 " +algebraicToRowCol("D4")); // for a 4 x 4 board, {"row": 3, "col": 3}
function algebraicToRowCol(algebraicNotation){
    console.log(algebraicNotation);
    if(algebraicNotation === undefined || algebraicNotation.length !== 2){
        console.log("failing right away");
        return undefined;
    }
    const letters =['A','B','C','D','E','F','G','H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    const rowColObj = {
        "row": 0,
        "col": 0
    };
    const res = rowColObj;

    const indexInStr = 0;

    const letterNumber = /^[0-9a-zA-Z]+$/;
    const currIndex = algebraicNotation[indexInStr];
    console.log("curr letter at curr index is " + currIndex);
    if (!currIndex.match(letterNumber) || !(currIndex+1).match(letterNumber)){
        console.log("a match");
        return undefined;
    }
    //let currIndex2 = algebraicNotation.charAt(indexInStr);
    const letterIndex = letters.indexOf(currIndex);
    if(letterIndex === -1) {
        return undefined;
    }
    res.row = (algebraicNotation[indexInStr + 1] - 1);
    res.col = letterIndex;

    return res;

}

/*
 Translates algebraic notation specifying a cell into a row and column specifying the same cell.
 Use the setBoardCell function you created above to implement this
 */

function placeLetter(board, letter, algebraicNotation){
    const rowAndColObj = algebraicToRowCol(algebraicNotation);
    if(rowAndColObj === undefined){
        return board;
    }
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
function addDashedLines(boardString, width){
    let newAddition = "  ";
    for(let next = 0; next<width; next++){
        newAddition += ("+---");
    }
    newAddition += "+\n";
    return newAddition;
}

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
            if (elementAtIndex !== " ") {
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



/*/
 Examines the board passed in to determine whether or not it's full.
 It returns true if there are no empty squares, false if there are still squares available
 */
function isBoardFull(board){
   for(let i=0; i<board.length; i++){
       if(board[i] === " "){
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
    const index = rowColToIndex(board, row, col);
    if(board[index] === " "){
        return board; //no change
    }
    else if (board[index] === "X"){
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
            console.log("trying to flip " + cellsToFlip[i][0] + " and " + cellsToFlip[i][1]);
            board = flip(board, cellsToFlip[i][0], cellsToFlip[i][1]);


    }
    return board;

}

function isOnBoard(board, row, col){
    const width = Math.sqrt(board.length);
    if(row >= 0 && row <= width){
        if(col>= 0 && col <=width){
            return true;
        }
    }
    return false;
}
/*/
 Using the board passed in determine which cells contain pieces to flip based on the last move.
 For example, if the last move was the X played at D3, then all of the O's on the board would be flipped (D2, B3 and C3.
 */

let testBoard = generateBoard(4, 4, " ");
testBoard = placeLetters(testBoard, 'O', 'B3', 'C3', 'D2');
testBoard = placeLetters(testBoard, 'X', 'A3', 'D1', 'D3');
console.log(boardToString(testBoard));
console.log(getCellsToFlip(testBoard, 2, 3));

function getCellsToFlip(board, rowStart, colStart){

    const index = rowColToIndex(board, rowStart, colStart);
    /*/ check validity
    if(board[index] != " "){
        return False;
    }
    /*/

    const letter = board[index]; //piece should already be placed there

    let opppoTile;
    if(letter === "X"){
        opppoTile = "O";
    }else{
        opppoTile = "X";
    }


    const tilesToFlip = [];
    const searchHereForFlips = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
    for (let i = 0; i < searchHereForFlips.length; i++) {
        let currRow = rowStart;
        let currCol = colStart;

        //TESTED: DEFINITLEY CORRECTLY PICKS UP ALL ELEMENTS OF SEARCHHEREFORFLIPS
        const rowDirection = searchHereForFlips[i][0];
        const colDirection = searchHereForFlips[i][1];


        //take first steps in current coordinates directions
        currRow += rowDirection;
        currCol+= colDirection;

        let currIndex = rowColToIndex(board, currRow, currCol);

        if(isOnBoard(board, currRow, currCol) && board[currIndex] === opppoTile){
            //continue down this path
            currRow += rowDirection;
            currCol+= colDirection;

            //unless we fall off board
            if(!isOnBoard(board, currRow, currCol)){
                continue;
            }
            currIndex = rowColToIndex(board, currRow, currCol);
            while(board[currIndex] === opppoTile){
                currRow += rowDirection;
                currCol+= colDirection;
                if(!isOnBoard(currRow, currCol)){
                    break;
                }
            }
            if(!isOnBoard(board, currRow, currCol)){
                continue;
            }
            currIndex = rowColToIndex(board, currRow, currCol);
            if(board[currIndex] === letter){
                while(true){
                    currRow -= rowDirection;
                    currCol-= colDirection;
                    if(currRow === rowStart && currCol === colStart){
                        break;
                    }
                    tilesToFlip.push([currRow, currCol]);
                }
            }


        }
        //console.log("found row, col not on board or not opposite piece: " + currRow, currCol);
    }

    return tilesToFlip;
}


/*/
 Using the board passed in, determines whether or not a move with letter to row and col is valid. A valid move:
 -targets an empty square
 -is within the boundaries of the board
 -adheres to the rules of Reversi… that is, the piece played must flip at least one of the other player's pieces
 */
let board = generateBoard(3, 3, " ");
board = placeLetter(board, 'X', "A1");
board = placeLetter(board, 'O', "A2");
console.log(boardToString(board));
console.log(getCellsToFlip(board, 2, 0, 'X'));
console.log(isValidMove(board, 'X', 2, 0));

function isValidMove(board, letter, row, col){
    const boardIndex = rowColToIndex(board, row, col);

    if(board[boardIndex] === "O" || board[boardIndex] === "X"){ //must be blank space
        return false;
    }
    if(!isOnBoard(board, row, col)){
        return false;
    }
    board[boardIndex] = letter;
    //console.log("changed boardIndex in isValidMove to " + board[boardIndex]);
    const res = getCellsToFlip(board, row, col, letter);
    board[boardIndex] = " ";
    //console.log(res);
    if (res.length < 1){
        return false;
    }else{
        return true;
    }

}

/*/
Using the board passed in, determines whether or not a move with letter to algebraicNotation is valid.
Use the functions you previously created, isValidMove and algebraicToRowCol to implement this function.
 */
//console.log(isValidMoveAlgebraicNotation(testBoard, 'X', "D2"));
function isValidMoveAlgebraicNotation(board, letter, algebraicNotation){
    console.log(algebraicNotation);
    const rowColObj = algebraicToRowCol(algebraicNotation);
    console.log(rowColObj.row + " " + rowColObj.col);
    return isValidMove(board, letter, rowColObj.row, rowColObj.col);

}
/*/
 Returns the counts of each of the letters on the supplied board. The counts are stored in an object where the count is
 the value and the letter is the property name. For example, if the board has 2 X's and 1 O, then the object return
 would be: { X: 2, O: 1 }
 */
//console.log(getLetterCounts(testBoard));
function getLetterCounts(board){
    const countObj = {
        X: 0,
        O: 0
    };
    const res = countObj;

    for(let i=0; i< board.length; i++){
        if(board[i] === "X"){
            countObj.X++;
        }else if(board[i] === "O"){
            countObj.O++;
        }
    }
    return res;


}
/*/
 Gives back a list of valid moves that the letter can make on the board. These moves are returned as a list of
 row and column pairs - an Array containing 2-element Arrays
 */

let newB = generateBoard(4, 4, " ");
newB = placeLetters(newB, 'X', 'A1');
newB = placeLetters(newB, 'O', 'B2');
newB = placeLetters(newB, 'X', 'A2');
newB = placeLetters(newB, 'O', 'C3');
console.log(boardToString(newB));
const res = getValidMoves(newB, 'X');
console.log(res);

function getValidMoves(board, letter){
    const resArr = [];
    const boardWidth = Math.sqrt(board.length);

    for(let row=0; row< boardWidth; row++){
        for(let col =0; col< boardWidth; col++){
            if(isValidMove(board, letter, row, col)){
                resArr.push([row, col]);
            }
        }
    }
    return resArr;

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
    isValidMove: isValidMove,
    isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
    getLetterCounts: getLetterCounts,
    getValidMoves: getValidMoves

};