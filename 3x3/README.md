# Tic-Tac-Toe with AI

<p>This project is a classic Tic-Tac-Toe game implemented in Python, featuring an AI opponent that uses the <strong>Minimax algorithm</strong> to make strategic moves. The game supports a traditional 3x3 board where a player can compete against the computer.</p>


<h2 id="features">Features</h2>
<ul>
  <li>Play against an AI opponent with Minimax-based decision-making.</li>
  <li>Traditional 3x3 board with an intuitive text-based interface.</li>
  <li>Automatic detection of a win, loss, or draw condition.</li>
  <li>Simple user inputs to place your move on the grid.</li>
</ul>

<h2 id="how-it-works">How It Works</h2>

<h3 id="game-initialization">Game Initialization</h3>
<p>The game begins by asking the player to select their symbol (<code>X</code> or <code>O</code>). The player will then make the first move on a 3x3 grid. The AI will take the second turn and alternate thereafter.</p>

<h3 id="gameplay">Gameplay</h3>
<ul>
  <li>The board is a 3x3 grid. Each cell is initially empty and can be marked with <code>X</code> or <code>O</code>.</li>
  <li>Players take turns to mark an empty cell with their symbol.</li>
  <li>The game ends when a player aligns three symbols in a row, column, or diagonal, or when there are no more empty spaces (a draw).</li>
</ul>

<h3 id="ai-move">AI Move</h3>
<p>The AI opponent uses the <strong>Minimax algorithm</strong> to determine the best move. The algorithm evaluates all possible outcomes and chooses the move that maximizes its chances of winning or forces a draw if no winning move is available.</p>


<h2 id="usage">Usage</h2>
<p>When you start the game, follow the prompts to:</p>
<ol>
  <li>Choose your symbol (<code>X</code> or <code>O</code>).</li>
  <li>Enter your move by providing the row and column coordinates (e.g., <code>1,2</code> for row 1, column 2).</li>
  <li>Watch as the AI calculates its move.</li>
  <li>Keep playing until a win or draw is detected.</li>
</ol>

<h2 id="how-to-play">How to Play</h2>
<ol>
  <li><strong>Start the game</strong> by running the Python script.</li>
  <li><strong>Choose your symbol</strong> (<code>X</code> or <code>O</code>) when prompted.</li>
  <li><strong>Input your move</strong> coordinates. The grid uses a 0-based index, so the top-left corner is (0,0).</li>
  <li>The <strong>AI will make its move</strong> after yours.</li>
  <li>The game continues until there is a winner or the game is a draw.</li>
  <li>The <strong>results</strong> will be displayed at the end of the game.</li>
</ol>


