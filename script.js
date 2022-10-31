const gameBoard =(function () {

    let _board =[['','',''],['','',''],['','','']];
    const _htmlBoard = document.querySelectorAll('[data-row]');
    
    const initialize = () => {

        for(let i = 0 ; i < 3; i++ ){
            for(let j = 0 ; j < 3; j++ ){
                _board[i][j] = '';
            }
        }
        render();
    }

    const move = (row,column,token) =>{
        _board[row][column] = token;
        render();

    }
   
    const render = () => {
        let k=0;
        for(let i = 0 ; i < 3; i++ ){
            for(let j = 0 ; j < 3; j++ ){
                _htmlBoard[k].textContent= _board[i][j];
                if(_htmlBoard[k].textContent !==""){
                    // Add cursor not allowed class to that cell
                    _htmlBoard[k].classList.add("filled")
                }else{
                    _htmlBoard[k].classList.remove("filled")
                }
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
        let col = 0;
        let win =0;

        do{
            if(_board[row][0] === _board[row][1] && _board[row][1] === _board[row][2] && _board[row][0]!==""){
                win = 1;
            }
            row++

        }while( win===0 && row<3)

        do{
            if(_board[0][col] === _board[1][col] && _board[1][col] === _board[2][col] && _board[0][col]!==""){
                win = 1;
            }
            col++
        }while( win===0 && col<3)

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
            win=1;
        }
        return win;
    }

    return{
        initialize,
        move,
        render,
        checkCellOccupied,
        checkWin
    }
})()

const userFactory = () => {
    let _tokenType ='undefined';
    let _name = '';
    let _score = 0;

    const printWinner = (id) => {

        const nameImput = document.querySelector(('#'.concat(id)))
        const inputText= nameImput.value; 
        const inputPlaceholder= nameImput.placeholder;  
        if (inputText ===""){
            console.log(`Winner is ${inputPlaceholder}`);
        }else{
            console.log(`Winner is ${inputText}`);
        }
        
    }

    const setName = (name) =>{
        _name = name;
    }

    const setToken = (token) =>{
        _tokenType = token;
    }
    const playTurn = (row,column) =>{
        gameBoard.move(row,column,_tokenType);
    }

    const addScore = (id) => {

        _score++;
        const scoreBoard = document.querySelector(('#'.concat(id)))
        scoreBoard.textContent= _score;
    }

    const setScore = (id,score) => {
        _score= score;
        const scoreBoard = document.querySelector(('#'.concat(id)))
        scoreBoard.textContent= _score;
    }

    return{

        setToken,
        playTurn,
        printWinner,
        setName,
        addScore,
        setScore

    }
}

const displayController = (function(){
    let _turn =1;
    let clickCol ='';
    let clickRow ='';
    const _htmlBoard = document.querySelectorAll('[data-row]')
    const _clearButton = document.querySelector('#initialize');
    const _changeNameButtons = document.querySelectorAll('#buttonSVG');
    const _resetButton = document.querySelector('#reset');

    const startGame = () => {

        _htmlBoard.forEach(box => box.addEventListener("click", (e) => {
            clickCol= e.target.dataset.col;
            clickRow= e.target.dataset.row;

            if(gameBoard.checkCellOccupied(clickRow,clickCol)){

                // clicking in the an occupied cell
            }else{

                if(_turn % 2 == 0) { //check for even turn
                    playerTwo.playTurn(clickRow,clickCol);
                }else{
                    playerOne.playTurn(clickRow,clickCol);
                    
                }
                

                if(gameBoard.checkWin()){
                    if(_turn % 2 == 0) {
                        playerTwo.printWinner("playerTwo");
                        playerTwo.addScore("playerTwoScore");
                    }else{
                        playerOne.printWinner("playerOne");
                        playerOne.addScore("playerOneScore");
                    }
                    
                }
                    
                if(_checkNoMoves()){
                    console.log("GAME IS OVER")
                    // We should not let the user click anymore or print something
                }

                _turn++;
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

    const initializeButtons = () => {
        _clearButton.addEventListener('click' , () => {
            gameBoard.initialize();
            _turn=1;
        });

    }

    const initializeSVG = () => {
        
        _changeNameButtons.forEach( button => {
            button.addEventListener('click', (e) => {
                
                e.stopPropagation();
                const dataset = e.target.dataset.player;
                const id = ('#').concat(dataset);
                const input = document.querySelector(id);
                input.removeAttribute('readonly');
            
                const modifyAttribute =(element) => {
                    element.setAttribute('readonly',"");
                } 
                setTimeout(modifyAttribute, 10000, input);
            })

        },{capture: true})
        
        
    }
    const initializeReset = () => {
        _resetButton.addEventListener('click', () =>{
            playerOne.setScore("playerOneScore",0);
            playerTwo.setScore("playerTwoScore",0);
        })


    }

    return {
        startGame,
        initializeButtons,
        initializeSVG,
        initializeReset

    }
})()


const playerOne = userFactory();
const playerTwo = userFactory();
playerOne.setToken("X");
playerTwo.setToken("O");

displayController.startGame();
displayController.initializeButtons();
displayController.initializeSVG();
displayController.initializeReset();

// Once anyone wins block more moves
// make animation to insert your names
// SAY WHO WON
//Cursor: not allowed;  una clase para poner a la celda sobre la que estamos cuando 
// ya tenemos algo escrito sobre ella