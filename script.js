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

        if(_board[row][col] != ""){
            return 1;
        }

        return 0;
    }
    return{
        initialize,
        move,
        render,
        print,
        checkCellOccupied
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
            }
            

            

        }))
    }

    const checkWin = () => {
        // check the board for winner
        // check if all cells are occupy => draw
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


