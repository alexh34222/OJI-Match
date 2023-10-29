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

  // shuffle the cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffleCards);
    setTurns(0);
  };

  console.log(cards, turns);

  return (
    <div className="home">
      <div className="homeContent">
        <div className="homeTitle">
          <h1>Memory Match Mania</h1>
        </div>
        <div className="startButton">
          <button onClick={shuffleCards}>Start Game</button>
        </div>
      </div>
      <div className="cardSection">
        {cards.map((card) => (
          <div key={card.id} className="card">
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
