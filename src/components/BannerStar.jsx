import React from "react";

import "../assets/styles/components/BannerStar.scss";

class BannerStar extends React.Component {
  render() {
    return (
      <section className="banner__start">
        <h2>ANIME</h2>
        <div className="star star1"></div>
        <div className="star star2"></div>
        <div className="star star3"></div>
        <div className="star star4"></div>
        <div className="star star5"></div>
        <div className="star star6"></div>
        <div className="star star7"></div>
        <div className="star star8"></div>
      </section>
    );
  }
}

export default BannerStar;
