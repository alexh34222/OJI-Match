import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../assets/css/Home.css";

import Facebook from "../assets/images/facebook.png";
import Instagram from "../assets/images/instagram.png";
import Twitter from "../assets/images/twitter.png";
import Youtube from "../assets/images/youtube.png";
import Linkedin from "../assets/images/linkedin.png";
import Spotify from "../assets/images/spotify.png";

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
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
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

  // check if the cards match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => resetTurns(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const handleCardChoice = (card) => {
    if (choiceOne === null && choiceTwo === null) {
      setChoiceOne(card);
    } else if (choiceOne !== null && choiceTwo === null && card !== choiceOne) {
      setChoiceTwo(card);
    }
  };

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
  };

  // reset the game
  const resetGame = () => {
    setCards([]);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setStartedGame(false);
  };

  //winning message

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
      </div>
      <div className="cards">
        {" "}
        <div className="cardSection">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              handleCardChoice={handleCardChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
