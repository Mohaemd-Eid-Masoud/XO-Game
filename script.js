let currentPlayer = 'X';
let gameWon = false;
const winningCombinations = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6]];
function allowDrop(event) {
    event.preventDefault();
}
function drag(event) {
    event.dataTransfer.setData("text", currentPlayer);
}
function drop(event) {
    event.preventDefault();
    const cell = event.target;
    if (gameWon || cell.innerText !== '') return;
    const data = event.dataTransfer.getData("text");
    cell.innerText = data;
    if (checkWin(data)) {
        showWinAlert(data);
        gameWon = true;
    } else {
        togglePlayer();
    }
}
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const x = document.querySelector('.X');
    const o = document.querySelector('.O');
    
    if (currentPlayer === 'X') {
        x.classList.remove('inactive');
        o.classList.add('inactive');
    } else {
        o.classList.remove('inactive');
        x.classList.add('inactive');
    }
}
function checkWin(player) {
    const cells = Array.from(document.querySelectorAll('td'));
    return winningCombinations.some(combination => {
        return combination.every(index => cells[index].innerText === player);
    });
}
function showWinAlert(winner) {
    const alertBox = document.getElementById("customAlert");
    const message = document.getElementById("alertMessage");
    message.innerText = `${winner} wins! 🎉`;
    alertBox.style.display = "flex";
}
function closeWinAlert() {
    document.getElementById("customAlert").style.display = "none";
    resetGame();
}
function resetGame() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.innerText = '');
    currentPlayer = 'X';
    gameWon = false;
    document.querySelector('.X').classList.remove('inactive');
    document.querySelector('.O').classList.add('inactive');
}
const x = document.querySelector('.X');
const o = document.querySelector('.O');
x.addEventListener('dragstart', drag);
o.addEventListener('dragstart', drag);
const cells = document.querySelectorAll('td');
cells.forEach(cell => {
    cell.addEventListener('dragover', allowDrop);
    cell.addEventListener('drop', drop);
});
o.classList.add('inactive');