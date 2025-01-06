import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import Player from "./components/Player";

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

  const activePLayer = deriveActivePlayer(gameTurns);
  function handleSelectSquare(rowIndex,colIndex){
    // setActivePlayer((currActivePlayer) => currActivePlayer === 'X' ?'O' : 'X');
  
    setGameTurns((prevTurns)=>{

      let currentPlayer = deriveActivePlayer(prevTurns);

      const updatedGameTurns = [{square: {row : rowIndex,col : colIndex}, player : currentPlayer},...prevTurns,];

      return updatedGameTurns;
    })

  }

  return <main>
    <div id="game-container">
     <ol id="players" className="highlight-player">
     
     <Player initialName="Player 1" symbol="X" isActive={activePLayer==='X'}  />
     <Player initialName="Player 2" symbol="O" isActive={activePLayer==='O'} />

     </ol>

     <GameBoard  onSelectSquare={handleSelectSquare} turns={gameTurns}/>

    </div>

    <Log turns={gameTurns}/>
  </main>
}

export default App
