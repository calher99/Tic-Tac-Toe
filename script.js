const gameBoard =(function () {

    let _board =[['','',''],['','',''],['','','']];
    const _htmlBoard = document.querySelectorAll('[data-row]')

    const initialize = () => {
        for(let i = 0 ; i < 3; i++ ){
            for(let j = 0 ; j < 3; j++ ){
                _board[i][j] = '';
            }
        }
        
    }

    const move = (row,column,token) =>{
        _board[row][column] = token;
        render();

    }
    const print = () => {
        console.table(_board);
    }
    const render = () => {
        let k=0;
        for(let i = 0 ; i < 3; i++ ){
            for(let j = 0 ; j < 3; j++ ){
                _htmlBoard[k].textContent= _board[i][j];
                k++;
            }
        }
    }

    const checkCellOccupied = (row,col) =>{

        if(_board[row][col] !== ""){
            return 1;
        }

        return 0;
    }

    const checkWin = () => {
        let row= 0;
        let winRow = 0;
        let col = 0;
        let winCol = 0;

        do{
            if(_board[row][0] === _board[row][1] && _board[row][1] === _board[row][2] && _board[row][0]!==""){
                winRow = 1;
                console.log("WONNNNN")
            }
            row++
        }while( winRow===0 && row<3)

        do{
            if(_board[0][col] === _board[1][col] && _board[1][col] === _board[2][col] && _board[0][col]!==""){
                winCol = 1;
                console.log("WONNNNN")
            }
            col++
        }while( winCol===0 && col<3)

        let i=1;
        let continueD1 = 1;
        let continueD2 = 1;

        do{
            if(_board[0][0] === _board[i][i] && _board[0][0] !==""  && continueD1 === 1){
                continueD1 = 1;
            }else{
                continueD1 = 0;
            }
            
            if(_board[0][2] === _board[i][2-i] && _board[0][2] !=="" && continueD2 === 1){
                continueD2 = 1;
            }else{
                continueD2 = 0;
            }
            i++;
        }while(i<3)
       
        if(continueD1 === 1 || continueD2===1){
            console.log("WON DIAGONAL")
        }
        
    }

    return{
        initialize,
        move,
        render,
        print,
        checkCellOccupied,
        checkWin
    }
})()

const userFactory = () => {
    let _tokenType ='undefined';
    let name = '';
    

    const setToken = (token) =>{
        _tokenType = token;
    }
    const playTurn = (row,column) =>{
        gameBoard.move(row,column,_tokenType);
    }


    return{

        setToken,
        playTurn,

    }


}

const displayController = (function(){
    let _turn =0;
    let clickCol ='';
    let clickRow ='';
    const _htmlBoard = document.querySelectorAll('[data-row]')

    const startGame = () => {

        _htmlBoard.forEach(box => box.addEventListener("click", (e) => {
            clickCol= e.target.dataset.col;
            clickRow= e.target.dataset.row;

            if(gameBoard.checkCellOccupied(clickRow,clickCol)){

                console.log("try another move!")

            }else{

                if(_turn % 2 == 0) { //check for even turn
                    playerOne.playTurn(clickRow,clickCol);
                }else{
                    playerTwo.playTurn(clickRow,clickCol);
                    
                }
                _turn++;

                gameBoard.checkWin();

                if(_checkNoMoves()){
                    console.log("GAME IS OVER")
                    // We should not let the user click anymore or print something
                }
               
            }
            
            
            

        }))
    }

  
    const _checkNoMoves = () => {

        let row=0;
        let col=0;
        let fullBoard = 1;
        let foundEmpty = 0;
        do{
            col=0;
            do{

                if(!gameBoard.checkCellOccupied(row,col)){
                    fullBoard =0;
                    foundEmpty=1;
                }
                col++;

            }while( !foundEmpty && col<3)
            row++;
        }while( !foundEmpty && row<3)

    return fullBoard;

    }
    return {
        startGame,

    }
})()


const playerOne = userFactory();
const playerTwo = userFactory();

playerOne.setToken("X");
playerTwo.setToken("O")

displayController.startGame();


