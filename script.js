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

    return{
        initialize,
        move,
        render
    }
})()

const userFactory = () => {
    let _tokenType ='undefined';
    let name = '';
    const _htmlBoard = document.querySelectorAll('[data-row]')

    const setToken = (token) =>{
        _tokenType = token;
    }
    const playTurn = () =>{


        gameBoard.move(row,col,_tokenType)
    }

    return{
        setToken,
    }


}

const displayController = (function(){
    //checkWin
    //giveTurn ?¿

})()
const playerOne = userFactory();
const playerTwo = userFactory();


gameBoard.initialize();
gameBoard.render();
gameBoard.move(1,1,"x");
gameBoard.render();
