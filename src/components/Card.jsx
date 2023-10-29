import "../assets/css/Card.css";
import Cover from "../assets/images/laptop.png";

export default function Card({ card, handleCardChoice }) {
  const handleCardClick = () => {
    handleCardChoice(card);
  };

  return (
    <div className="card">
      <div>
        <img className="cardFront" src={card.src} alt="card" />
        <img
          className="cardBack"
          src={Cover}
          alt="cover"
          onClick={handleCardClick}
        />
      </div>
    </div>
  );
}
