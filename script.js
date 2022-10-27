const gameBoard =(function () {

    let _board =[[0,0,0],[0,0,0],[0,0,0]];
    
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
    const print = () => console.table(_board);

    return{
        initialize,
        move,
        print
    }
})()



