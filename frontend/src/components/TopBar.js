import React from 'react';
import './TopBar.css';
import chain from '../assets/chain-1.svg';
import { FaBars, FaRedo, FaRegQuestionCircle} from 'react-icons/fa';

const TopBar = ({ onHomeClick, onRestartClick, onHowToClick }) => {
  return (
    <div className="top-bar">
      <div className="game-name">
        <span className="chain">CHAIN</span>
        <img src={chain} alt="chain" className="chain-svg" />
        <span className="game">GAME</span>
      </div>
      <div className="button-container">
        <button className="restart" alt="Reset Game" onClick={onRestartClick}>
          <FaRedo />
        </button>
        <button className="how-to" onClick={onHowToClick}>
          <FaRegQuestionCircle />
        </button>
        <button className="home" onClick={onHomeClick}>
          <FaBars />
        </button>
      </div>
    </div>
  );
};

export default TopBar;
