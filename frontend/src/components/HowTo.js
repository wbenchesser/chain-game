import React from 'react';
import './HowTo.css';

const HowTo = ({ onClose }) => {
  return (
    <div className="howto-popup">
      <div className="howto-content">
        <h2>How to Play</h2>
        <p>1. Enter a word that would commonly be placed with the previous word in the chain.</p>
        <p>Valid Examples:</p>
        <p><i>Up⫘Town</i></p>
        <p><i>Town⫘Hall</i></p>
        <p><i>Hall⫘Pass</i></p>
        <p>2. The word must be a valid English word.</p>
        <p>3. You cannot repeat any word already in the chain.</p>
        <p>4. Keep adding words to make the longest chain possible.</p>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
};

export default HowTo;
