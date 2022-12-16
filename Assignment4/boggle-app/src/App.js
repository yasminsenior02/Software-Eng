import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import findAllSolutions from "./boggle_solver.js";
import Board from "./Board.js";
import UserInput from "./Userinput";
import UserFound from "./UserFound.js";
import SummaryofResults from "./SummaryofResults.js";
import ToggleGameState from "./ToggleGameState.js";
import { GAME_STATE } from "./GameState.js";
import { RandomGrid } from "./randomGen.js";
import "./App.css";

function App() {
  const [allSolutions, setAllSolutions] = useState([]); // solutions from solver
  const [foundSolutions, setFoundSolutions] = useState([]); // found by user
  const [gameState, setGameState] = useState(GAME_STATE.BEFORE); // Just an enuerator or the three states see below
  const [grid, setGrid] = useState([]); // the grid
  const [totalTime, setTotalTime] = useState(0); // total time elapsed
  const [size, setSize] = useState(3); // selected grid size

  useEffect(() => {
    const wordList = require("./full-wordlist.json");
    const tmpAllSolutions = findAllSolutions(grid, wordList.words);
    setAllSolutions(tmpAllSolutions);
  }, [grid]);

  useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      setGrid(RandomGrid(size));
      setFoundSolutions([]);
    }
  }, [gameState, size]);

  function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

  // make new correct answer
  return (
    <div className="App">
      <img src={logo} width="7%" height="7%" class="logo" />

      <ToggleGameState
        gameState={gameState}
        setGameState={(state) => setGameState(state)}
        setSize={(state) => setSize(state)}
        setTotalTime={(state) => setTotalTime(state)}
      />

      {gameState === GAME_STATE.IN_PROGRESS && (
        <div>
          <Board board={grid} />

          <UserInput
            allSolutions={allSolutions}
            foundSolutions={foundSolutions}
            correctAnswerCallback={(answer) => correctAnswerFound(answer)}
          />
          <UserFound headerText="Solutions found" words={foundSolutions} />
        </div>
      )}
      {gameState === GAME_STATE.ENDED && (
        <div>
          <Board board={grid} />
          <SummaryofResults words={foundSolutions} totalTime={totalTime} />
          <UserFound
            headerText="Missed Words [wordsize > 3]: "
            words={allSolutions}
          />
        </div>
      )}
    </div>
  );
}

export default App;
