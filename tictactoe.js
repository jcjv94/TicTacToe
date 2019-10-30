// 1.1) Define a colors object with keys of 'null' (when the square is empty), and players 1 & -1. The value assigned to each key represents the color to display for an empty square (null), player 1 and player -1.

var lookup = {
  '1': 'red',
  '-1': 'blue',
  'null': 'white'
};

// 1.2) Define the 8 possible winning combinations, each containing three indexes of the board that make a winner if they hold the same player value.

var winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// 2.1) Use a board array to represent the squares.
var board; 

// 2.2) Use a turn variable to remember whose turn it is.
var turn;

// 2.3) Use a winner variable to represent three different possibilities - player that won, a tie, or game in play.

var winner;

//3.1) Store the 9 elements that represent the squares on the page.

var squares = document.querySelectorAll('td div');

var message = document.querySelector('h1');

document.querySelector('table').addEventListener('click', move);
document.querySelector('button').addEventListener('click', init);

// 5) Handle a player clicking a square:

init();

function move(evt) {
  var idx = parseInt(evt.target.id.replace('square', ''));
  if (board[idx] || winner) return;
  board[idx] = turn;
  turn *= -1;
  winner = getWinner();
  render();
}


function getWinner() {
  if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
  if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
  if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
  if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
  if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
  if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
  if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
  if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
  if (board.includes(null)) return null;
  return 'T';
}

// 4.2) Render those state variables to the page:
// 4.2.1) Render the board:
// 4.2.1.1) Loop over each of the 9 elements that represent the squares on the page, and for each iteration:
// 4.2.1.1.2) Use the index of the iteration to access the mapped value from the board array.
// 4.3.1.1.3) Set the background color of the current element by using the value as a key on the colors lookup object (constant).
// 4.2.2) Render a message:
// 4.2.2.1) If winner has a value other than null (game still in progress), render whose turn it is - use the color name for the player, converting it to upper case.
// 4.2.2.2) If winner is equal to 'T' (tie), render a tie message.
// 4.2.2.3) Otherwise, render a congratulatory message to which player has won - use the color name for the player, converting it to uppercase.

function render() {
  board.forEach(function(square, idx) {
    squares[idx].style.background = lookup[square];
  });
  if (winner === 'T') {
    message.innerHTML = 'Tie Game!';
  } else if (winner) {
    message.innerHTML = `You win ${lookup[winner].toUpperCase()}!`;
  } else {
    message.innerHTML = `${lookup[turn].toUpperCase()}'s Turn`;
  }
}
// 4.1) Initialize the state variables:
// 4.1.1) Initialize the board array to 9 nulls to represent empty squares. The 9 elements will "map" to each square, where index 0 maps to the top-left square and index 8 maps to the bottom-right square.
// 4.1.2) Initialize whose turn it is to 1 (player 'X'). Player 'O' will be represented by -1.
// 4.1.3) Initialize winner to null to represent that there is no winner or tie yet. Winner will hold the player value (1 or -1) if there's a winner. Winner will hold a 'T' if there's a tie. 

function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
}