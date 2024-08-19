import React from 'react';
import './GameOver.css';

const GameOver = ({ word_list, score, onRestart }) => {
  return (
    <div className="game-over">
      <div className="popup-content">
        <h2>Game Over!</h2>
        <div className="word-chain">
          {word_list.map((word, index) => (
            <span key={index} className="chain-word">
              {word}{index < word_list.length - 1 && <span className="chain-symbol"> ⫘ </span>}
            </span>
          ))}
        </div>
        <p>Chain Length: {score}</p>
        <button onClick={onRestart} className="restart-button">Play Again?</button>
      </div>
    </div>
  );
};

export default GameOver;
