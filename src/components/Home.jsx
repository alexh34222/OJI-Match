import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../assets/css/Home.css";

import Fish from "../assets/images/fish.png";
import Bait from "../assets/images/fishing-baits.png";
import Fishing from "../assets/images/fishing.png";
import Hook from "../assets/images/hook.png";
import Sea from "../assets/images/sea.png";
import Seaweed from "../assets/images/seaweed.png";
import Reel from "../assets/images/fishing-reel.png";
import Rod from "../assets/images/fishing-rod.png";
import Boat from "../assets/images/fishing-boat.png";
import Guy from "../assets/images/fishing-guy.png";

const cardImages = [
  { src: Fish },
  { src: Bait },
  { src: Fishing },
  { src: Hook },
  { src: Sea },
  { src: Seaweed },
  { src: Reel },
  { src: Rod },
  { src: Boat },
  { src: Guy },
];

export default function Home() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [startedGame, setStartedGame] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [mode, setMode] = useState("");

  const createCardPairs = (mode) => {
    const allCards = [...cardImages, ...cardImages];
    if (mode === "easy") {
      const shuffledPairs = [];
      while (shuffledPairs.length < 6) {
        const card = allCards[Math.floor(Math.random() * allCards.length)];
        if (!shuffledPairs.includes(card)) {
          shuffledPairs.push(card);
        }
      }
      return [...shuffledPairs, ...shuffledPairs];
    }
    if (mode === "hard") {
      return allCards.sort(() => Math.random() - 0.5);
    }
  };

  const shuffleCards = () => {
    const shuffledCards = createCardPairs(mode).map((card) => ({
      ...card,
      id: Math.random(),
    }));

    setCards(shuffledCards);
    setTurns(0);
    setStartedGame(true);
    setGameWon(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo && choiceOne !== choiceTwo) {
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
    } else if (choiceOne !== null && choiceTwo === null && choiceOne !== card) {
      setChoiceTwo(card);
    }
  };

  const handleEasyModeClick = () => {
    setMode("easy");
  };

  const handleHardModeClick = () => {
    setMode("hard");
  };

  useEffect(() => {
    if (mode !== "") {
      shuffleCards();
    }
  }, [mode]);

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
            <>
              <button onClick={handleEasyModeClick}>Easy Mode</button>
              <button onClick={handleHardModeClick}>Hard Mode</button>
            </>
          )}
        </div>
      </div>
      {gameWon ? (
        <div className="winningMessage">You won in {turns} turns!</div>
      ) : (
        startedGame && <div className="turns">Turns: {turns}</div>
      )}
      <div className="cards">
        {cards.length > 0 && (
          <div className="cardSection">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleCardChoice={handleCardChoice}
                flipped={
                  card === choiceOne || card === choiceTwo || card.matched
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
