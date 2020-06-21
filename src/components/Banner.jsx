import React from "react";

import "../assets/styles/components/Banner.scss";
import BannerImg from "../assets/images/banner.jpg";

const Banner = () => (
  <main>
    <div className="banner">
      <img src={BannerImg} alt="Banner" />
      <div className="container">
        <h3 className="title">Organizador de Animes</h3>
      </div>
    </div>
  </main>
);

export default Banner;
