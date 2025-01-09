import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import GameOver from "./components/GameOver.jsx";
import Log from "./components/Log.jsx";
import Player from "./components/Player";
import { WINNING_COMBINATIONS } from "./winning-combinations.jsx";


const PLAYERS = {
  X : 'Player 1',
  O : 'Player 2'
};
const  INITIAL_GAME_BOARD = [
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

function deriveWinner(gameBoard,players){
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      return players[firstSquareSymbol];
    }
  }
  return undefined;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]; //without deep-copy the restart match wouldnt work, as gameboard= initialBoard is a bug as initialBoard is passed by reference and cant be actually reset ...refer lec. 93

    for( const turn of gameTurns){
        const {square , player} = turn;
        const {row,col} = square;

        gameBoard[row][col] = player;
    }

    return gameBoard;
}


function App() {
  const [gameTurns,setGameTurns] = useState([]);
  const [players,setPlayers] = useState(PLAYERS);
    
    const gameBoard = deriveGameBoard(gameTurns);

    const winner=deriveWinner(gameBoard,players);

    const isDraw = gameTurns.length === 9 && !winner;
  const activePLayer = deriveActivePlayer(gameTurns);
  function handleSelectSquare(rowIndex,colIndex){
  
    setGameTurns((prevTurns)=>{

      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedGameTurns = [{square: {row : rowIndex,col : colIndex}, player : currentPlayer},...prevTurns,];

      return updatedGameTurns;
    });

  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,name){
    setPlayers(prevPlayers => ({...prevPlayers,[symbol]: name}));
  }

  return (
  <main>
    <div id="game-container">
     <ol id="players" className="highlight-player">
     
     <Player initialName={PLAYERS.X} symbol="X" isActive={activePLayer==='X'}  onChangeName ={handlePlayerNameChange}/>
     <Player initialName={PLAYERS.O} symbol="O" isActive={activePLayer==='O'}  onChangeName ={handlePlayerNameChange}/>

     </ol>
    {(winner || isDraw) && <GameOver winner = {winner}  onRestart = {handleRestart}/>}
     <GameBoard  onSelectSquare={handleSelectSquare} board={gameBoard}/>

    </div>

    <Log turns={gameTurns}/>
  </main>
  );
}

export default App
