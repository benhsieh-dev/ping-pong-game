import React, {useState} from 'react';
import firebaseDB from '../../utils/firebase.js';

import './game-manager.css';

export default () => {
    const [playerA, setPlayerA] = useState("Carol");
    const [playerB, setPlayerB] = useState("Jonathan");
    const [playerAScore, setPlayerAScore] = useState(0);
    const [playerBScore, setPlayerBScore] = useState(0);
    const [playerAWins, setplayerAWins] = useState(0);
    const [playerBWins, setplayerBWins] = useState(0);
    const [playerAGames, setPlayerAGames] = useState(3);
    const [playerBGames, setPlayerBGames] = useState(0);
    const [round, setRound] = useState(0);
    // const [gameType, setGameType] = useState(10);

    const gameTracker = (scoreA, scoreB, playerA, playerB) => {
        if (scoreA === 11 && scoreB <= 9) {
            gamesATracker();
            roundTracker();
        } else if (scoreB === 11 && scoreA <= 9) {
            gamesBTracker();
            roundTracker();     
        } else if (playerAGames >= 3 && playerBGames < 3) {
            setPlayerAGames(0);
            winsATracker();
            document.write(`${playerA} wins`);
           
        } else if (playerBGames >= 3 && playerAGames < 3) {
            setPlayerBGames(0);
            winsBTracker();
            document.write(`${playerB} wins`);
        }
    } 

    const roundTracker = () => setRound(prevRound => prevRound + 1);
    const gamesATracker = () => setPlayerAGames(playerAGames + 1);
    const winsATracker = () => setplayerAWins(playerAWins + 1);
    const gamesBTracker = () => setPlayerBGames(playerAGames + 1);
    const winsBTracker = () => setplayerBWins(playerBWins + 1);

    function scoresATracker() {
      const newScore = playerAScore + 1; 
    setPlayerAScore(newScore);
    }
      
      // firebaseDB.child(playerA).push(playerAScore); 

    const scoresBTracker = () => {
      setPlayerBScore(playerBScore + 1)
      firebaseDB.child(playerB).push(playerBScore);
    };

  
  
    return (
      <div>
        <div>
          <h1>Leader Board</h1>
          <span>Name:</span> {playerA} <span>Wins:</span> {playerAWins}
          <br />
          <span>Name:</span> {playerB} <span>Wins:</span> {playerBWins}
        </div>
        <div>
          <h2>Participants</h2>
          <div className="player-names">
            <label>Please enter player A name</label>
            <input
              value={playerA}
              onChange={(e) => {
                setPlayerA(e.target.value);
              }}
            ></input>
            <br />
            <br />
            <label>Please enter player B name</label>
            <input
              value={playerB}
              onChange={(e) => {
                setPlayerB(e.target.value);
              }}
            ></input>
            <br />
            <br />
            <h2>Select Game Type</h2>
            <label>Game of 10 serve every 2</label>
            <input type="radio" name="game" value="10"></input>
            <label>Game of 20 serve every 5</label>
            <input type="radio" name="game" value="20"></input>
          </div>
          <div>
            <h2>{round > 1 ? "Rounds:" : "Round:"}</h2>
            {round}
          </div>
          <div>
            <div className="participants">
              <div
                className={`${
                  (playerAScore + playerBScore) % 2 === 0
                    ? "serving"
                    : "not-serving"
                }`}
              >
                <h2>Player A</h2>
                {playerA}
              </div>
              <div>
                <h2>Score</h2>
                {playerAScore}
              </div>
              <div>
                <h2>{playerAGames > 1 ? "Games" : "Game"}</h2>
                {playerAGames}
              </div>
              <div>
                <h2>{playerAWins > 1 ? "Wins" : "Win"}</h2>
                {playerAWins}
              </div>
            </div>
            <div className="participants">
              <div
                className={`${
                  (playerAScore + playerBScore) % 2 === 1
                    ? "serving"
                    : "not-serving"
                }`}
              >
                <h2>Player B</h2>
                {playerB}
              </div>
              <div>
                <h2>Score</h2>
                {playerBScore}
              </div>
              <div>
                <h2>{playerBGames > 1 ? "Games" : "Game"}</h2>
                {playerBGames}
              </div>
              <div>
                <h2>{playerBWins > 1 ? "Wins" : "Win"}</h2>
                {playerBWins}
              </div>
            </div>
            <div className="scoreboard">
              <button
                onClick={() => setPlayerAScore(playerAScore + 1)}
                className="score-tracker-btn"
              >{`${playerA}: ${playerAScore}`}</button>
              <button 
                onClick={scoresBTracker}
                className="score-tracker-btn">
                {`${playerB} ${playerBScore}`}
              </button>
            </div>
          </div>
        </div>
        <div>{gameTracker(playerAScore, playerBScore, playerA, playerB)}</div>
        <div className="game-options">
          <button className="pause-game">Pause Game</button>
          <button className="continue-game">Continue Game</button>
        </div>
        <div>
          <h3>Game Instructions</h3>
          <p>
            The ping pong game will follow the 10 point system, where a player
            wins when he exceeds 10 points. If both players reach 10 points, the
            players need to win by 2 points to win. Serving switches every 2
            points. Player who is serving is highligted.
            <br />
            Players can choose 10 or 20 (serve every 5) game type
          </p>
        </div>
      </div>
    );
}
