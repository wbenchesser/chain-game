import React from 'react';
import './HomePage.css';
import chain from '../assets/chain-1.svg'

const HomePage = ({ onStart, onHowToClick }) => {
  return (
    <div className="homepage">
      <div className="popup-content">
        <h3>Welcome to...</h3>
        <div className="title-name">
        <span className="chain">CHAIN</span>
        <img src={chain} alt="chain" className="title-chain" />
        <span className="game">GAME</span>
        </div>
        <button onClick={onStart} className="buttons">Play</button>
        <button onClick={onHowToClick} className="buttons">How it Works</button>
      </div>
    </div>
  );
};

export default HomePage;
