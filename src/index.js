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
  // State array is initialized with null values.
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };

  }

  // Creates Square element that is either empty or filled with an 'X'/'O'.
  renderSquare(i) {
    return <Square value={this.state.squares[i]} handleClick={() => this.handleClick(i)} />;
  }

  // When a square is clicked, the value squares[i] changes from null to 'X'/'O'.
  handleClick(i) {
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    // Message displayed to users.
    const winner = calculateWinner(this.state.squares);
    let status = winner ? 'Winner: ' + winner : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
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
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}