import React from "react";
import Parallax from "parallax-js";

import "../assets/styles/components/BannerAstro.scss";

import planet1 from "../assets/images/planet1.png";
import planet2 from "../assets/images/planet2.png";
import rocket from "../assets/images/rocket.png";
import astronaut from "../assets/images/astronaut.png";
import logo from "../assets/images/logoBanner.png";

class BannerAstro extends React.Component {
  componentDidMount() {
    var scene = document.getElementById("scene");
    new Parallax(scene);
  }

  render() {
    return (
      <div className="container__banner">
        <ul id="scene">
          <li className="layer" data-depth="0.2">
            <img src={logo} alt="planet1" />
          </li>
          <li className="layer" data-depth="0.3">
            <img src={planet1} alt="planet1" />
          </li>
          <li className="layer" data-depth="0.4">
            <img src={planet2} alt="planet2" />
          </li>
          <li className="layer" data-depth="0.5">
            <img src={astronaut} alt="astronaut" />
          </li>
          <li className="layer" data-depth="0.6">
            <img src={rocket} alt="rocket" />
          </li>
        </ul>
      </div>
    );
  }
}

export default BannerAstro;
