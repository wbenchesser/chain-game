import React, { useState } from 'react';
import './GamePage.css';
import TopBar from './TopBar';
import GameOver from './GameOver';
import HomePage from './HomePage';
import HowTo from './HowTo';
import chain1 from '../assets/chain-1.svg'
import chain2 from '../assets/chain-2.svg';
import chain3 from '../assets/chain-3.svg';
import loadingGif from '../assets/loading.gif'


const GamePage = () => {
  const starter_words = [
    "puzzle", "piece", "together", "forever", "young", "money", "trade", "off", "white", "flag",
    "day", "time", "stick", "out", "brand", "new", "shore", "line", "dance", "standing",
    "circle", "baseball", "bat", "cave", "man", "green", "screen", "door", "bell", "pepper",
    "spray", "tan", "show", "dream", "big", "bang", "basketball", "court", "side", "sticky",
    "note", "book", "link", "up", "black", "bear", "down", "bad", "word", "ever", "coin",
    "toss", "date", "night", "owl", "break", "open", "light", "year", "bag", "bone", "dry",
    "ice", "cold", "front", "apple", "watch", "air", "purple", "rain", "fall", "over",
    "low", "ball", "baby", "shower", "head", "nod", "mile", "high", "horse", "shoe", "box",
    "office", "hockey", "stick", "brown", "sugar", "high", "iron", "fist", "fight", "club", 
    "pop", "quiz", "school"
  ];

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * starter_words.length);
    return starter_words[randomIndex];
  };

  const getColor = (index) => {
    const colors = ['#a31724', '#21409a', '#008148'];
    return colors[index % 3];
  };  

  const getChainImage = (index) => {
    const chains = [chain1, chain2, chain3];
    return chains[index % 3];
  };  

  const [words, setWords] = useState([getRandomWord()]);
  const [inputWord, setInputWord] = useState('');
  const [error, setError] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showHomePage, setShowHomePage] = useState(true);
  const [showHowTo, setShowHowTo] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleInputChange = (event) => {
    setInputWord(event.target.value);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      if (words.includes(inputWord)) {
        setError('Word already used. Please enter a different word.');
        return;
      }

      setLoading(true);

      try {
        const response = await fetch('http://127.0.0.1:8000/validate/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ input_word: inputWord, previous_word: words[words.length - 1] }),
        });
        const result = await response.json();
        if (result.valid) {
          setWords([...words, inputWord]);
          setInputWord('');
          setError('');
        } else {
          setGameOver(true);
        }
      } catch (error) {
        console.error('Error validating word:', error);
        setError('Error validating word. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRestart = () => {
    setWords([getRandomWord()]);
    setInputWord('');
    setError('');
    setGameOver(false);
  };

  const handleStartGame = () => {
    setShowHomePage(false);
  };

  const handleHomeClick = () => {
    setShowHomePage(true);
  };

  const handleHowToOpen = () => {
    setShowHowTo(true);
  };

  const handleHowToClose = () => {
    setShowHowTo(false);
  };

  const displayedWords = words.length > 4 ? ['...', ...words.slice(-4)] : words;

  return (
    <div className="main-container">
      <TopBar onHomeClick={handleHomeClick} onRestartClick={handleRestart} onHowToClick={handleHowToOpen}/>
      {showHomePage && <HomePage onStart={handleStartGame} onHowToClick={handleHowToOpen}/>}
      <div className="content">
      <div className="words-container">
        {displayedWords.map((word, index) => (
          <React.Fragment key={index}>
            <div className="word-item" style={{ color: getColor(index) }}>
              {word}
            </div>
            {index < displayedWords.length - 1 && (
              <img src={getChainImage(index)} alt="chain" className="chain-image" />
            )}
          </React.Fragment>
        ))}
      </div>
        <input
          type="text"
          value={inputWord}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="text-input"
          placeholder="Enter a word"
        />
        {error && <div className="error-message">{error}</div>}
      <div className="loading-container">
        {loading && <img src={loadingGif} alt="Loading..." className="loading-spinner" />}
      </div>
        {gameOver && <GameOver word_list={words} score={words.length} onRestart={handleRestart} />}
        {showHowTo && <HowTo onClose={handleHowToClose} />}
      </div>
      <footer className="footer">
        <small className="footer">&copy; Copyright 2024, Ben Chesser</small>
      </footer>
    </div>
  );
};

export default GamePage;
