import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log.jsx";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){

  let currentPlayer = 'X';

  if(gameTurns.length >0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function App() {
  
  // const [activePLayer,setActivePlayer] = useState('X');
  const [gameTurns,setGameTurns] = useState([]);

  let gameBoard = [...initialGameBoard.map(array => [...array])]; //without deep-copy the restart match wouldnt work, as gameboard= initialBoard is a bug as initialBoard is passed by reference and cant be actually reset ...refer lec. 93

    for( const turn of gameTurns){
        const {square , player} = turn;
        const {row,col} = square;

        gameBoard[row][col] = player;
    }

    let winner;

    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

      if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
        winner = firstSquareSymbol;
      }
    }

    const isDraw = gameTurns.length === 9 && !winner;
  const activePLayer = deriveActivePlayer(gameTurns);
  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ?'O' : 'X');
  
    setGameTurns((prevTurns)=>{

      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedGameTurns = [{square: {row : rowIndex,col : colIndex}, player : currentPlayer},...prevTurns,];

      return updatedGameTurns;
    });

  }

  function handleRestart(){
    setGameTurns([]);
  }

  return (
  <main>
    <div id="game-container">
     <ol id="players" className="highlight-player">
     
     <Player initialName="Player 1" symbol="X" isActive={activePLayer==='X'}  />
     <Player initialName="Player 2" symbol="O" isActive={activePLayer==='O'} />

     </ol>
    {(winner || isDraw) && <GameOver winner = {winner}  onRestart = {handleRestart}/>}
     <GameBoard  onSelectSquare={handleSelectSquare} board={gameBoard}/>

    </div>

    <Log turns={gameTurns}/>
  </main>
  );
}

export default App
