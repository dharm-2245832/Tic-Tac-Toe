let board = document.querySelectorAll('.box');
let restartButton = document.querySelector('#restart');
let player = 'X';

let array = new Array(9).fill(null);

function start (){
    array = new Array(9).fill(null);
    board.forEach((box) => {
        box.addEventListener('click', handleClick);
    })
}

window.onload = start;

function handleClick(e) {
    const id = Number(e.target.id);
    let end = false;
    if (array[id - 1] === null) {
        array[id - 1] = player;
        e.target.innerText = player;
        end =  checkWin(player)
        player = player === 'X' ? 'O' : 'X';
        document.querySelector('#error').innerHTML = ``;
    } else {
        document.querySelector('#error').innerHTML = `Invalid move!`
    }

    if(end){
        board.forEach((box) => {
            box.innerHTML = '';
            box.removeEventListener('click', handleClick);
        })
    }
}


function checkWin(player) {
    let gameEnd = false;
    if (array[0] !== null && array[0] === array[1] && array[1] === array[2] ||
        array[3] !== null && array[3] === array[4] && array[4] === array[5] ||
        array[6] !== null && array[6] === array[7] && array[7] === array[8] ||
        array[0] !== null && array[0] === array[3] && array[3] === array[6] ||
        array[1] !== null && array[1] === array[4] && array[4] === array[7] ||
        array[2] !== null && array[2] === array[5] && array[5] === array[8] ||
        array[0] !== null && array[0] === array[4] && array[4] === array[8] ||
        array[2] !== null && array[2] === array[4] && array[4] === array[6]
    ) {
        document.querySelector('#result').innerHTML = `Player ${player} wins!`
        gameEnd = true;
        restartButton.style.display = 'block';
    } else if (array.every((box) => box !== null)) {
        document.querySelector('#result').innerHTML = `Game tied!`;
        gameEnd = true;
        restartButton.style.display = 'block';
    }

    return gameEnd;
}

function restart(){
    start();
    restartButton.style.display = 'none';
    document.querySelector('#result').innerHTML = '';
}
restartButton.addEventListener('click', restart);