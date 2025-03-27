//your JS code here. If required.
document.getElementById("submit").addEventListener("click", function() {
    const player1 = document.getElementById("player-1").value;
    const player2 = document.getElementById("player-2").value;
    
    if (player1 && player2) {
        document.getElementById("playerInput").classList.add("hidden");
        document.getElementById("gameBoard").classList.remove("hidden");
        document.getElementById("message").textContent = `${player1}, you're up!`;
        startGame(player1, player2);
    } else {
        alert("Please enter names for both players.");
    }
});

function startGame(player1, player2) {
    let currentPlayer = player1;
    let symbol = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = i;
        cell.addEventListener("click", function() {
            if (!board[i]) {
                board[i] = symbol;
                cell.textContent = symbol;
                if (checkWin(board, symbol)) {
                    document.getElementById("message").textContent = `${currentPlayer} congratulations you won!`;
                    disableBoard();
                } else {
                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    symbol = symbol === "X" ? "O" : "X";
                    document.getElementById("message").textContent = `${currentPlayer}, you're up!`;
                }
            }
        });
        boardDiv.appendChild(cell);
    }
}

function checkWin(board, symbol) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === symbol)
    );
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.style.pointerEvents = "none");
}