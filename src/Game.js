import React from 'react';
import Board from './Board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      xIsNext: true,
      count: 0,
      specificSquareIndex: -1 //set to -1 because array start from 0
    };
  }

  reset() {
    const history = this.state.history;
    const curr = history[history.length - 1];
    console.log(curr);
    const a = curr.squares.fill(null);
    this.setState({
      specificSquareIndex: -1, //reset colored square
      history: history.concat([
        {
          squares: a
        }
      ])
    });
    this.state.count = 0;
  }

  handleClick(i) {
    this.setState({ specificSquareIndex: i }); //set index in state
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    this.setState({ count: this.state.count + 1 });

    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
      status = "Winner: " + winner;
    }
    if (!winner) {
      status = "Next player:" + (this.state.xIsNext ? "X" : "O");
    }
    if (!winner && this.state.count === 9) {
      status = "Game tied";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
            specificSquareIndex={this.state.specificSquareIndex}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>
            <button onClick={() => this.reset()}>{/* TODO */ "Reset"}</button>
          </ol>
        </div>
      </div>
    );
  }
}

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

export default Game;