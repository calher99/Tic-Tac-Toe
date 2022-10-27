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

    return{
        initialize,
        move,
        render,
        print
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
    
        _htmlBoard.forEach(box => box.addEventListener("click", (e) => {
            let clickCol= e.target.dataset.col;
            let clickRow= e.target.dataset.row;
            console.log(e.target.dataset.row);
            console.log(e.target.dataset.col);
                
            gameBoard.move(clickRow,clickCol,_tokenType);
        }))
    }
    // const test = () =>{
    //     gameBoard.print();
    //     gameBoard.move(0,2,"x");
    // }

    return{
        setToken,
        playTurn,
        // test
    }


}

const displayController = (function(){
    //checkWin
    //giveTurn ?¿

})()
const playerOne = userFactory();

playerOne.setToken("X");
playerOne.playTurn();


