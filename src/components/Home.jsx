import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../assets/css/Home.css";

import Fish from "../assets/images/fish.png";
import Bait from "../assets/images/fishing-baits.png";
import Fishing from "../assets/images/fishing.png";
import Hook from "../assets/images/hook.png";
import Sea from "../assets/images/sea.png";
import Seaweed from "../assets/images/seaweed.png";

const cardImages = [
  { src: Fish },
  { src: Bait },
  { src: Fishing },
  { src: Hook },
  { src: Sea },
  { src: Seaweed },
];

export default function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [startedGame, setStartedGame] = useState(false);
  const [gameWon, setGameWon] = useState(false);

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
      setGameWon(false);
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
    setGameWon(false);
  };

  //winning message

  useEffect(() => {
    if (cards.every((card) => card.matched) && cards.length > 0) {
      setGameWon(true);
    }
  }, [cards]);

  return (
    <div className="home">
      <div className="homeContent">
        <div className="homeTitle">
          <h1>OJI Match</h1>
          <h6>Made by Alex Hall</h6>
          <h6>Inspired by Dick Sugiyama</h6>
        </div>
        <div className="startButton">
          {startedGame ? (
            <button onClick={resetGame}>End Game</button>
          ) : (
            <button onClick={shuffleCards}>Start Game</button>
          )}
        </div>
      </div>
      {gameWon ? (
        <div className="winningMessage">You won in {turns} turns!</div>
      ) : (
        startedGame && <div className="turns">Turns: {turns}</div>
      )}
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
