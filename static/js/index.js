// Game state variables
let currentMode = '';
let currentOpponent = '';
let currentPlayer = 'X';
let gameBoard = [];
let scores = { X: 0, O: 0 };
let gameActive = true;
let ultimateActiveBoard = null; // For Ultimate Tic-Tac-Toe
// DOM elements
const welcomeScreen = document.getElementById('welcome-screen');
const playerSelection = document.getElementById('player-selection');
const gameScreen = document.getElementById('game-screen');
const gameOverModal = document.getElementById('game-over-modal');
const selectedModeText = document.getElementById('selected-mode-text');
const gameModeText = document.getElementById('game-mode-text');
const opponentType = document.getElementById('opponent-type');
const currentPlayerDisplay = document.getElementById('current-player');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const gameResultText = document.getElementById('game-result-text');
const gameResultDetails = document.getElementById('game-result-details');
// Mode selection
function selectMode(mode) {
    currentMode = mode;
    
    // Set mode display text
    let modeText = '';
    switch(mode) {
        case '3x3': modeText = '3x3 Classic'; break;
        case '7x7': modeText = '7x7 Challenge'; break;
        case 'ultimate': modeText = 'Ultimate'; break;
    }
    selectedModeText.textContent = modeText;
    
    // Transition screens
    welcomeScreen.classList.add('hidden');
    playerSelection.classList.remove('hidden');
}
// Back to mode selection
function backToModeSelection() {
    playerSelection.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}
// Start game with selected opponent
function startGame(opponent) {
    currentOpponent = opponent;
    
    // Set opponent display text
    opponentType.textContent = opponent === 'ai' ? 'AI' : 'Friend';
    gameModeText.textContent = selectedModeText.textContent;
    
    // Initialize game
    initializeGame();
    
    // Transition screens
    playerSelection.classList.add('hidden');
    gameScreen.classList.remove('hidden');
}
// Initialize game based on selected mode
function initializeGame() {
    // Reset scores for a new game
    scores = { X: 0, O: 0 };
    updateScoreDisplay();
    
    // Hide all boards first
    document.getElementById('board-3x3').classList.add('hidden');
    document.getElementById('board-7x7').classList.add('hidden');
    document.getElementById('board-ultimate').classList.add('hidden');
    
    // Initialize the appropriate board
    switch(currentMode) {
        case '3x3':
            initialize3x3Board();
            break;
        case '7x7':
            initialize7x7Board();
            break;
        case 'ultimate':
            initializeUltimateBoard();
            break;
    }
    
    // Set starting player
    currentPlayer = 'X';
    updateCurrentPlayerDisplay();
    gameActive = true;
}
// Initialize 3x3 board
function initialize3x3Board() {
    const board = document.getElementById('board-3x3');
    board.innerHTML = '';
    board.classList.remove('hidden');
    
    // Create 3x3 game board
    gameBoard = Array(9).fill('');
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell w-20 h-20 md:w-24 md:h-24 bg-white rounded-lg shadow-md flex items-center justify-center text-4xl font-bold cursor-pointer';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}
// Initialize 7x7 board
function initialize7x7Board() {
    const board = document.getElementById('board-7x7');
    board.innerHTML = '';
    board.classList.remove('hidden');
    
    // Create 7x7 game board
    gameBoard = Array(49).fill('');
    
    for (let i = 0; i < 49; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell w-10 h-10 md:w-12 md:h-12 bg-white rounded shadow flex items-center justify-center text-xl font-bold cursor-pointer';
        cell.dataset.index = i;
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}
// Initialize Ultimate board
function initializeUltimateBoard() {
    const board = document.getElementById('board-ultimate');
    board.innerHTML = '';
    board.classList.remove('hidden');
    
    // Create ultimate game board (9 sub-boards)
    gameBoard = Array(9).fill().map(() => Array(9).fill(''));
    ultimateActiveBoard = null; // No active board at start
    
    for (let boardIndex = 0; boardIndex < 9; boardIndex++) {
        const subBoard = document.createElement('div');
        subBoard.className = 'grid grid-cols-3 gap-1 p-1 bg-gray-200 rounded';
        subBoard.dataset.boardIndex = boardIndex;
        
        for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
            const cell = document.createElement('div');
            cell.className = 'cell w-12 h-12 bg-white rounded shadow flex items-center justify-center text-xl font-bold cursor-pointer';
            cell.dataset.boardIndex = boardIndex;
            cell.dataset.cellIndex = cellIndex;
            cell.addEventListener('click', () => handleUltimateCellClick(boardIndex, cellIndex));
            subBoard.appendChild(cell);
        }
        
        board.appendChild(subBoard);
    }
}
// Handle cell click for 3x3 and 7x7
function handleCellClick(index) {
    if (!gameActive || gameBoard[index] !== '') return;
    
    // Make move
    gameBoard[index] = currentPlayer;
    updateBoard();
    
    // Check for winner or draw
    const winner = checkWinner();
    if (winner) {
        handleGameEnd(winner);
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
    
    // If playing against AI and it's AI's turn
    if (currentOpponent === 'ai' && currentPlayer === 'O' && gameActive) {
        setTimeout(makeAIMove, 500);
    }
}
// Handle cell click for Ultimate
function handleUltimateCellClick(boardIndex, cellIndex) {
    if (!gameActive || 
        (ultimateActiveBoard !== null && boardIndex !== ultimateActiveBoard) || 
        gameBoard[boardIndex][cellIndex] !== '') {
        return;
    }
    
    // Make move
    gameBoard[boardIndex][cellIndex] = currentPlayer;
    updateUltimateBoard();
    
    // Check if this move wins the sub-board
    const subBoardWinner = checkUltimateSubBoardWinner(boardIndex);
    
    // Determine next active board (unless sub-board is won)
    ultimateActiveBoard = subBoardWinner ? null : cellIndex;
    highlightActiveBoards();
    
    // Check for overall winner
    const winner = checkUltimateWinner();
    if (winner) {
        handleGameEnd(winner);
        return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateCurrentPlayerDisplay();
    
    // If playing against AI and it's AI's turn
    if (currentOpponent === 'ai' && currentPlayer === 'O' && gameActive) {
        setTimeout(makeUltimateAIMove, 500);
    }
}
// Make AI move for 3x3 and 7x7
function makeAIMove() {
    if (!gameActive) return;
    
    let availableCells = [];
    gameBoard.forEach((cell, index) => {
        if (cell === '') availableCells.push(index);
    });
    
    if (availableCells.length > 0) {
        // Simple AI: random move
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        const moveIndex = availableCells[randomIndex];
        
        gameBoard[moveIndex] = 'O';
        updateBoard();
        
        const winner = checkWinner();
        if (winner) {
            handleGameEnd(winner);
            return;
        }
        
        currentPlayer = 'X';
        updateCurrentPlayerDisplay();
    }
}
// Make AI move for Ultimate
function makeUltimateAIMove() {
    if (!gameActive) return;
    
    let availableMoves = [];
    
    // Find all available moves in active board(s)
    if (ultimateActiveBoard !== null) {
        // Only look at the active board
        gameBoard[ultimateActiveBoard].forEach((cell, cellIndex) => {
            if (cell === '') {
                availableMoves.push({
                    boardIndex: ultimateActiveBoard,
                    cellIndex: cellIndex
                });
            }
        });
    } else {
        // Look at all non-won boards for available cells
        for (let boardIndex = 0; boardIndex < 9; boardIndex++) {
            // Skip boards that are already won
            if (checkUltimateSubBoardWinner(boardIndex)) continue;
            
            gameBoard[boardIndex].forEach((cell, cellIndex) => {
                if (cell === '') {
                    availableMoves.push({
                        boardIndex: boardIndex,
                        cellIndex: cellIndex
                    });
                }
            });
        }
    }
    
    if (availableMoves.length > 0) {
        // Simple AI: random move
        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        const move = availableMoves[randomIndex];
        
        gameBoard[move.boardIndex][move.cellIndex] = 'O';
        updateUltimateBoard();
        
        // Check if this move wins the sub-board
        const subBoardWinner = checkUltimateSubBoardWinner(move.boardIndex);
        
        // Determine next active board (unless sub-board is won)
        ultimateActiveBoard = subBoardWinner ? null : move.cellIndex;
        highlightActiveBoards();
        
        // Check for overall winner
        const winner = checkUltimateWinner();
        if (winner) {
            handleGameEnd(winner);
            return;
        }
        
        currentPlayer = 'X';
        updateCurrentPlayerDisplay();
    }
}
// Check winner for 3x3 and 7x7
function checkWinner() {
    if (currentMode === '3x3') {
        return check3x3Winner();
    } else if (currentMode === '7x7') {
        return check7x7Winner();
    }
    return null;
}
// Check winner for 3x3
function check3x3Winner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            // Highlight winning cells
            pattern.forEach(index => {
                document.querySelector(`#board-3x3 .cell[data-index="${index}"]`).classList.add('winning-cell');
            });
            return gameBoard[a];
        }
    }
    
    // Check for draw
    if (!gameBoard.includes('')) {
        return 'draw';
    }
    
    return null;
}
// Check winner for 7x7 (needs 4 in a row)
function check7x7Winner() {
    // Check rows
    for (let row = 0; row < 7; row++) {
        for (let col = 0; col < 4; col++) {
            const index = row * 7 + col;
            if (gameBoard[index] && 
                gameBoard[index] === gameBoard[index + 1] && 
                gameBoard[index] === gameBoard[index + 2] && 
                gameBoard[index] === gameBoard[index + 3]) {
                // Highlight winning cells
                for (let i = 0; i < 4; i++) {
                    document.querySelector(`#board-7x7 .cell[data-index="${index + i}"]`).classList.add('winning-cell');
                }
                return gameBoard[index];
            }
        }
    }
    
    // Check columns
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 4; row++) {
            const index = row * 7 + col;
            if (gameBoard[index] && 
                gameBoard[index] === gameBoard[index + 7] && 
                gameBoard[index] === gameBoard[index + 14] && 
                gameBoard[index] === gameBoard[index + 21]) {
                // Highlight winning cells
                for (let i = 0; i < 4; i++) {
                    document.querySelector(`#board-7x7 .cell[data-index="${index + i * 7}"]`).classList.add('winning-cell');
                }
                return gameBoard[index];
            }
        }
    }
    
    // Check diagonals (top-left to bottom-right)
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const index = row * 7 + col;
            if (gameBoard[index] && 
                gameBoard[index] === gameBoard[index + 8] && 
                gameBoard[index] === gameBoard[index + 16] && 
                gameBoard[index] === gameBoard[index + 24]) {
                // Highlight winning cells
                for (let i = 0; i < 4; i++) {
                    document.querySelector(`#board-7x7 .cell[data-index="${index + i * 8}"]`).classList.add('winning-cell');
                }
                return gameBoard[index];
            }
        }
    }
    
    // Check diagonals (top-right to bottom-left)
    for (let row = 0; row < 4; row++) {
        for (let col = 3; col < 7; col++) {
            const index = row * 7 + col;
            if (gameBoard[index] && 
                gameBoard[index] === gameBoard[index + 6] && 
                gameBoard[index] === gameBoard[index + 12] && 
                gameBoard[index] === gameBoard[index + 18]) {
                // Highlight winning cells
                for (let i = 0; i < 4; i++) {
                    document.querySelector(`#board-7x7 .cell[data-index="${index + i * 6}"]`).classList.add('winning-cell');
                }
                return gameBoard[index];
            }
        }
    }
    
    // Check for draw
    if (!gameBoard.includes('')) {
        return 'draw';
    }
    
    return null;
}
// Check if a sub-board is won in Ultimate
function checkUltimateSubBoardWinner(boardIndex) {
    const board = gameBoard[boardIndex];
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            // Mark the sub-board as won
            const subBoardElement = document.querySelector(`#board-ultimate > div[data-board-index="${boardIndex}"]`);
            subBoardElement.classList.add('bg-opacity-50');
            if (board[a] === 'X') {
                subBoardElement.classList.add('bg-blue-100');
            } else {
                subBoardElement.classList.add('bg-red-100');
            }
            
            // Add winner symbol to the center of the sub-board
            const centerCell = subBoardElement.children[4];
            centerCell.innerHTML = board[a] === 'X' ? '<i class="fas fa-times text-blue-600"></i>' : '<i class="far fa-circle text-red-600"></i>';
            centerCell.classList.remove('cursor-pointer');
            
            return board[a];
        }
    }
    
    // Check for draw in sub-board
    if (!board.includes('')) {
        // Mark the sub-board as drawn
        const subBoardElement = document.querySelector(`#board-ultimate > div[data-board-index="${boardIndex}"]`);
        subBoardElement.classList.add('bg-gray-100', 'bg-opacity-50');
        
        // Add draw symbol to the center of the sub-board
        const centerCell = subBoardElement.children[4];
        centerCell.innerHTML = '<i class="fas fa-equals text-gray-500"></i>';
        centerCell.classList.remove('cursor-pointer');
        
        return 'draw';
    }
    
    return null;
}
// Check overall winner for Ultimate
function checkUltimateWinner() {
    // Create a representation of which player (if any) has won each sub-board
    const subBoardWinners = [];
    for (let i = 0; i < 9; i++) {
        subBoardWinners.push(checkUltimateSubBoardWinner(i));
    }
    
    // Now check if there's a winner in the overall board
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];
    
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (subBoardWinners[a] && subBoardWinners[a] !== 'draw' && 
            subBoardWinners[a] === subBoardWinners[b] && 
            subBoardWinners[a] === subBoardWinners[c]) {
            return subBoardWinners[a];
        }
    }
    
    // Check for overall draw (all sub-boards completed)
    if (!subBoardWinners.includes(null) && !subBoardWinners.includes(undefined)) {
        return 'draw';
    }
    
    return null;
}
// Update board display for 3x3 and 7x7
function updateBoard() {
    const boardId = currentMode === '3x3' ? 'board-3x3' : 'board-7x7';
    const cells = document.querySelectorAll(`#${boardId} .cell`);
    
    cells.forEach((cell, index) => {
        if (gameBoard[index] === 'X') {
            cell.innerHTML = '<i class="fas fa-times text-blue-600"></i>';
            cell.classList.remove('cursor-pointer');
        } else if (gameBoard[index] === 'O') {
            cell.innerHTML = '<i class="far fa-circle text-red-600"></i>';
            cell.classList.remove('cursor-pointer');
        }
    });
}
// Update board display for Ultimate
function updateUltimateBoard() {
    const cells = document.querySelectorAll('#board-ultimate .cell');
    
    cells.forEach(cell => {
        const boardIndex = parseInt(cell.dataset.boardIndex);
        const cellIndex = parseInt(cell.dataset.cellIndex);
        
        if (gameBoard[boardIndex][cellIndex] === 'X') {
            cell.innerHTML = '<i class="fas fa-times text-blue-600"></i>';
            cell.classList.remove('cursor-pointer');
        } else if (gameBoard[boardIndex][cellIndex] === 'O') {
            cell.innerHTML = '<i class="far fa-circle text-red-600"></i>';
            cell.classList.remove('cursor-pointer');
        }
    });
    
    highlightActiveBoards();
}
// Highlight active boards in Ultimate mode
function highlightActiveBoards() {
    const subBoards = document.querySelectorAll('#board-ultimate > div');
    
    subBoards.forEach(subBoard => {
        subBoard.classList.remove('ring-2', 'ring-blue-500');
        
        const boardIndex = parseInt(subBoard.dataset.boardIndex);
        const isSubBoardWon = checkUltimateSubBoardWinner(boardIndex);
        
        if (ultimateActiveBoard === null && !isSubBoardWon) {
            // All non-won boards are active
            subBoard.classList.add('ring-2', 'ring-blue-500');
        } else if (boardIndex === ultimateActiveBoard) {
            // Only the specified board is active
            subBoard.classList.add('ring-2', 'ring-blue-500');
        }
    });
}
// Handle game end
function handleGameEnd(result) {
    gameActive = false;
    
    // Update scores if not a draw
    if (result === 'X') {
        scores.X++;
        scoreX.textContent = scores.X;
    } else if (result === 'O') {
        scores.O++;
        scoreO.textContent = scores.O;
    }
    
    // Show game over modal
    gameOverModal.classList.remove('hidden');
    
    if (result === 'draw') {
        gameResultText.textContent = "It's a Draw!";
        gameResultText.className = 'text-3xl font-bold mb-4 text-gray-600';
        gameResultDetails.textContent = 'No one wins this round.';
    } else {
        gameResultText.textContent = `Player ${result} Wins!`;
        gameResultText.className = result === 'X' ? 
            'text-3xl font-bold mb-4 text-blue-600' : 
            'text-3xl font-bold mb-4 text-red-600';
        gameResultDetails.textContent = `Congratulations to Player ${result}!`;
    }
}
// Update current player display
function updateCurrentPlayerDisplay() {
    currentPlayerDisplay.textContent = `${currentPlayer}'s turn`;
    currentPlayerDisplay.className = currentPlayer === 'X' ? 
        'text-blue-500 font-medium' : 
        'text-red-500 font-medium';
}
// Update score display
function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}
// Reset current game (same mode and opponent)
function resetGame() {
    gameOverModal.classList.add('hidden');
    initializeGame();
}
// Back to main menu
function backToMainMenu() {
    gameOverModal.classList.add('hidden');
    gameScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
}