import "../assets/css/Home.css";

import Facebook from "../assets/images/facebook.png";
import Instagram from "../assets/images/instagram.png";
import Twitter from "../assets/images/twitter.png";
import Youtube from "../assets/images/youtube.png";
import Linkedin from "../assets/images/linkedin.png";

export default function Home() {
  const cardImages = [
    { Facebook },
    { Instagram },
    { Twitter },
    { Youtube },
    { Linkedin },
  ];

  return (
    <div className="home">
      <div className="homeContent">
        {" "}
        <div className="homeTitle">
          <h1>Memory Match Mania</h1>
        </div>
        <div className="startButton">
          {" "}
          <button>Start Game</button>
        </div>
      </div>
    </div>
  );
}
