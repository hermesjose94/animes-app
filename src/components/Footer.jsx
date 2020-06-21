import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/styles/components/Footer.scss";
import Logo from "../assets/images/logo.png";

const Footer = () => (
  <footer>
    <div className="footer__main">
      <div className="footer__main__content">
        <div className="footer-logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="footer__main__content">
        <div className="footer-redes">
          <a href="https://github.com/hermesjose94">
            <FontAwesomeIcon icon={["fab", "github-alt"]} />
          </a>
          <a href="https://www.instagram.com/hermesjoseperez/?hl=es-la">
            <FontAwesomeIcon icon={["fab", "instagram"]} />
          </a>
          <a href="https://www.facebook.com/hermesjose.perezrojas">
            <FontAwesomeIcon icon={["fab", "facebook"]} />
          </a>
          <a href="https://twitter.com/hermesjose94">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
        </div>
      </div>
    </div>
    <div className="footer__bottom">
      <div className="copyright">
        <span>© Copyright 2020</span>
        <span>
          Desarrollada por{" "}
          <a href="https://hermesjose94.github.io//">hermesjose94</a>
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
