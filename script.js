/*
Módulos:

- Criar uma array gameboard dentro do obj gameboard
- Criar jogadores
- Fazer uma jogada (verifica se o espaço está disponível, marca e verifica se o jogador venceu)

*/

let currentPlayer;
let player1;
let player2;
const board = (function(){
    const createBoard = () => Array(9).fill(null);
    let gameboard = createBoard();
    const clear = () => gameboard = createBoard();
    const get = () => gameboard;
    const put = (i, marker) => gameboard[i] = marker

    return {get,put,clear}
})();

const display = (function(){
    const clear = () =>{
        for(let i=0;i<9;i++){
            document.querySelector(`.cell${i}`).textContent = ''
        }
    }
    return {clear}
})();



const switchPlayer = () => {
    const turn = document.querySelector('.turn');
    switch(currentPlayer){
        case player1: currentPlayer = player2; break;
        case player2: currentPlayer = player1; break;
    }
    turn.textContent=`${currentPlayer.name}'s turn`
}

const makePlay = (i, pMarker) =>{
    if(board.get()[i]!=null){
        return
       }
    document.querySelector(`.cell${[i]}`).textContent = pMarker
    board.put(i, pMarker)
    switchPlayer()
    checkWin()
    checkTie()
    console.log(board.get())
}

const displayWinner = (winner, tie=false) =>{
    const modal = document.querySelector('.modal')
    const box = document.querySelector('.modalContent')
    modal.style.display = 'block'
    if(tie){
        box.innerHTML = `It's a tie! <br> <button class="playAgain" onclick='playAgain()'>Play Again</button>`
    }else{
        box.innerHTML = `${winner.name} won! <br> <button class="playAgain" onclick='playAgain()'>Play Again</button>`
}}

const checkTie = (current) => current != null;
const checkWin = function(){
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ]

    winConditions.forEach(cond => {
        if(board.get()[cond[0]]!=null){ //Verify if the spot is marked

            if(board.get()[cond[0]]==board.get()[cond[1]] && board.get()[cond[1]]==board.get()[cond[2]]){ 

                switch(board.get()[cond[0]]){
                    case 'X': displayWinner(player1); break;
                    case 'O': displayWinner(player2); break;
                }
            }
            if(board.get().every(checkTie)){
                displayWinner('none', true)
            }
        }   
    });
};

function playerTemplate (name,marker){
    name = name
    marker = marker
    return{name, marker}
}

const playAgain = () => {
    const modal = document.querySelector('.modal')
    modal.style.display = 'none'
    board.clear()
    display.clear()
}

function getPlayers () {
    let p1 = document.querySelector('#p1').value
    let p2 = document.querySelector('#p2').value
    if(p1==''){p1='P1'}
    if(p2==''){p2='P2'}

    player1 = playerTemplate(p1, 'X')
    player2 = playerTemplate(p2, 'O')

    const modal = document.querySelector('.playerModal');
    modal.style.display = 'none'
    currentPlayer = player1
}


