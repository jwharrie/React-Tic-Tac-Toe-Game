import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
React component for each square in game.
Square is represented as a button. It currently shows 'X' when clicked.
*/
class Square extends React.Component {
    // Initializing Square's state as null (no value shown).
    constructor(props) {
      super(props);
      this.state = {
        value: null,
      };
    }

    // Renders button element that displays 'X' when user clicks it.
    render() {
      return (
        <button 
          className="square" 
          onClick={() => this.setState({value: 'X'})} 
        >
          {this.state.value}
        </button>
      );
    }
}

/*
React component containing tic-tac-toe game board.
*/
class Board extends React.Component {
  // Creates Square element with its assigned index.
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    // Message displayed to users.
    const status = 'Next player: X';

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