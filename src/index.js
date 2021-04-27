import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
React component for each square in game.
Square is represented as a button. It currently shows 'X' when clicked.
Square is a controlled component of Board component.
*/
function Square(props) {
    // Renders button element that displays 'X' when user clicks it.
    return (
      <button className="square" onClick={props.handleClick} >
        {props.value}
      </button>
    );
}

/*
React component containing tic-tac-toe game board.
State of app lives in Board component, where it contains an array of length 9.
Board controls Square components.
*/
class Board extends React.Component {
  // Creates Square element that is either empty or filled with an 'X'/'O'.
  renderSquare(i) {
    return <Square value={this.props.squares[i]} handleClick={() => this.props.handleClick(i)} />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// React component that is parent of Board component.
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  // When a square is clicked, the value squares[i] changes from null to 'X'/'O'.
  handleClick(i) {
    // Make copy of squares state.
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // Checks if winner declared or square already clicked. If so, function terminates.
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    // 'X' or 'O' is chosen based on boolean flag state xIsNext.
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // Update state by replacing squares with new modified copy and flipping xIsNext.
    this.setState({
      history: history.concat([{squares: squares}]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Allow player to jump to a specific move in game's history.
  // Achieved by setting state's stepNumber to step, and then setting xIsNext with equality check.
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    // Retrieve history of moves and retrieve current one.
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    // Create status message for players. Tells players if a player won, if draw occurs or who has the next turn.
    // css properties of status
    let status;
    let statusClass = 'status';
    const winner = calculateWinner(current.squares);
    if (winner) {
      status = 'Winner: ' + winner;
      statusClass = 'status-done';
    }
    else if (this.state.stepNumber === 9) {
      status = 'Draw!';
      statusClass = 'status-done';
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    // Creates set of buttons that let you jump to a specific move in game's history.
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move} >
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} handleClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className={statusClass}>{status}</div>
          <ul>{moves}</ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

/*
Determines if a player won.
Parameters:
  * squares: current state in Board
Returns either null (no winner) or 'X'/'O' (winner)
*/
function calculateWinner(squares) {
  // Array of square indices that must be filled by same symbol for a player to win.
  // Includes all horizontal, vertical and diagonal lines of tic-tac-toe board.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check if a player created one of the winning lines. If so, return winning player's symbol.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  // No player has won. Return null.
  return null;
}