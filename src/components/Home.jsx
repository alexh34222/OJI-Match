import React, { useState } from "react";
import "../assets/css/Home.css";

import Facebook from "../assets/images/facebook.png";
import Instagram from "../assets/images/instagram.png";
import Twitter from "../assets/images/twitter.png";
import Youtube from "../assets/images/youtube.png";
import Linkedin from "../assets/images/linkedin.png";
import Spotify from "../assets/images/spotify.png";
import Cover from "../assets/images/laptop.png";

const cardImages = [
  { src: Facebook },
  { src: Instagram },
  { src: Twitter },
  { src: Youtube },
  { src: Linkedin },
  { src: Spotify },
];

export default function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [startedGame, setStartedGame] = useState(false);

  // shuffle the cards
  const shuffleCards = () => {
    if (startedGame) alert("Game already started");
    else {
      const shuffleCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({ ...card, id: Math.random() }));

      setCards(shuffleCards);
      setTurns(0);
      setStartedGame(true);
    }
  };

  // reset the game
  const resetGame = () => {
    setCards([]);
    setTurns(0);
    setClickedCards([]);
    setStartedGame(false);
  };

  // handle card click
  const handleCardClick = (card) => {
    if (clickedCards.length < 2) {
      setClickedCards([...clickedCards, card]);
      if (clickedCards.length === 1) {
        setTurns(turns + 1);
        if (clickedCards[0].src === card.src) {
          setClickedCards([]);
        } else {
          setTimeout(() => setClickedCards([]), 1000);
        }
      }
    }
  };

  // display number of turns
  const displayTurns = () => {
    if (turns === 0) {
      return "No turns yet";
    } else if (turns === 1) {
      return "1 turn";
    } else {
      return `${turns} turns`;
    }
  };

  console.log(clickedCards);

  return (
    <div className="home">
      <div className="homeContent">
        <div className="homeTitle">
          <h1>Memory Match Mania</h1>
        </div>
        <div className="startButton">
          <button onClick={shuffleCards}>Start Game</button>
          <button onClick={resetGame}>Reset Game</button>
        </div>
        <div className="turns">
          <p>{displayTurns()}</p>
        </div>
      </div>
      <div className="cardSection">
        {cards.map((card) => (
          <div
            key={card.id}
            className="card"
            onClick={() => handleCardClick(card)}
          >
            <div>
              <img className="cardFront" src={card.src} alt="card" />
              <img className="cardBack" src={Cover} alt="cover" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
