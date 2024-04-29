function startNewGame() {
    if(players[0].name === '' || players[1].name === '') {
        alert('Please set custom players names for both players!');
        return;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer == 0){
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
    activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
    if(event.target.tagName !== 'LI'){
        return;
    } 
    const selectedField = event.target;   
    const selectedColumn = selectedField.dataset.col -1;
    const selectedRow = selectedField.dataset.row -1;

    if (gameData[selectedRow][selectedColumn] > 0) {
        alert('Please selecet an empty field!');
        return;
    }

    selectedField.textContent = players[activePlayer].symbol; //players[0]
    selectedField.classList.add('disabled');

    gameData[selectedRow][selectedColumn] = activePlayer + 1;
    console.log(gameData);
    switchPlayer();
}

/* 게임이 승리하는 경우의 수 */ 
function checkForGameOver() {
    if (gameData[0][0] > 0 && 
        gameData[0][1] ===  gameData[0][1] && 
        gameData[0][1] ===  gameData[0][2]){
        return gameData[0][0];
    } 
}