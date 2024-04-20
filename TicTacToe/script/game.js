function startNewGame() {
    if(players[0].name === '' || players[1].name === '') {
        alert('Please set custom players names for both players!');
        return;
    }
    gameAreaElement.style.display = 'block';
}

function switchPlayer() {
    if (activePlayer == 0){
        activePlayer = 1;
    } else {
        activePlayer = 0;
    }
}

function selectGameField(event) {
    if(event.target.tagName !== 'LI'){
        return;
    } 

    event.target.textContent = players[activePlayer].symbol; //players[0]
    event.target.classList.add('disabled');
    switchPlayer();
}