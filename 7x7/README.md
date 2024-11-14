<h1 style="text-align:center;">7x7 Tic-Tac-Toe with AI (Alpha-Beta Pruning)</h1>

<h2>Project Overview</h2>
<p>This project is a command-line implementation of a <strong>7x7 Tic-Tac-Toe</strong> game with a computer-controlled AI opponent. 
The AI uses the <strong>Minimax algorithm with Alpha-Beta pruning</strong> to determine the optimal moves. 
The game supports difficulty levels, allowing players to choose between three levels of challenge for the AI.</p>

<h2>Game Features</h2>
<ul>
    <li>Game board of size 7x7 for an extended and challenging gameplay experience.</li>
    <li>AI opponent using Minimax algorithm with Alpha-Beta pruning for optimal decision-making.</li>
    <li>Different difficulty levels for the AI:
        <ul>
            <li><strong>1 (Easy)</strong> - Low depth, faster but less accurate decisions.</li>
            <li><strong>2 (Medium)</strong> - Moderate depth, balanced difficulty.</li>
            <li><strong>3 (Hard)</strong> - High depth, slow but highly strategic moves.</li>
        </ul>
    </li>
    <li>Draw detection when no empty spaces are left.</li>
</ul>

<h2>Project Structure</h2>
<ul>
    <li><strong>create_table(n=3)</strong>: Initializes an empty game table of size <code>n x n</code>.</li>
    <li><strong>check_string(str1, size)</strong>: Checks if there is a winning condition in a given string segment.</li>
    <li><strong>is_game_over(game_table)</strong>: Determines if the game has ended, and if so, identifies the winner.</li>
    <li><strong>heuristic_cost(game_table, ai_symbol)</strong>: Evaluates the game board and assigns a score based on potential outcomes.</li>
    <li><strong>minimax(maximum, game_table, depth, symbol, difficulty, alpha, beta, ai_symbol)</strong>: Core AI algorithm for determining the best move using recursion and Alpha-Beta pruning.</li>
    <li><strong>ai_move(game_table, symbol, difficulty)</strong>: AI's turn to play using the Minimax algorithm.</li>
    <li><strong>initializer(size)</strong>: Initializes the game, allowing the user to choose their symbol.</li>
    <li><strong>get_location(game_table, user_symbol)</strong>: Prompts the user to input their move coordinates.</li>
    <li><strong>print_table(game_table)</strong>: Displays the current game board in the terminal.</li>
    <li><strong>game_play(game_table, user_symbol, difficulty)</strong>: Main game loop that alternates between user and AI turns.</li>
</ul>

<h2>Game Rules</h2>
<p>The game follows the standard rules of Tic-Tac-Toe, but on a 7x7 board:</p>
<ul>
    <li>The player who aligns <strong>four consecutive symbols</strong> (vertically, horizontally, or diagonally) wins the game.</li>
    <li>If the board is filled without any player aligning four symbols, the game is declared a draw.</li>
</ul>

<h2>How to Play</h2>
<ol>
    <li>Choose your symbol: <code>X</code> or <code>O</code>.</li>
    <li>Enter the difficulty level (1, 2, or 3).</li>
    <li>Take turns with the AI to place your symbol on the 7x7 board by entering coordinates (e.g., <code>2,3</code>).</li>
</ol>

<h2>AI Strategy Explanation</h2>
<p>The AI uses the <strong>Minimax algorithm</strong> with <strong>Alpha-Beta pruning</strong> to explore game states efficiently. The core idea is to maximize the AI's potential winning moves while minimizing the player's chances:</p>
<ul>
    <li><strong>Heuristic Evaluation</strong>: The board is evaluated using a scoring function that considers possible alignments of four symbols.</li>
    <li><strong>Alpha-Beta Pruning</strong>: Optimization technique that cuts off branches in the decision tree that won't affect the final decision, making the AI faster and more efficient.</li>
</ul>

<h2>Requirements</h2>
<p>Ensure you have <code>Python 3.x</code> installed. No external libraries are required for this project.</p>
