import React from "react";
import { Link } from "react-router-dom";

import "../assets/styles/pages/Error.scss";

class Error extends React.Component {
  componentDidMount() {
    document.body.classList.add("background-error");
    var container = document.getElementById("container");
    window.onmousemove = (e) => {
      var x = -e.clientX / 5;
      var y = -e.clientY / 5;
      container.style.backgroundPositionX = `${x}px`;
      container.style.backgroundPositionY = `${y}px`;
    };
  }

  componentWillUnmount() {
    document.body.classList.remove("background-error");
  }

  render() {
    if (!this.props.error) {
      this.conten =
        "La página que estas buscnado no existe. Es posible que haya escrito mal la dirección o que la pagina se haya movido.";
    } else {
      this.conten =
        "Lo sentimos hemos tenido probleas con la conexion al servidor. Por favor intentalo mas tarde.";
    }

    return (
      <div id="container" className="container-error">
        <div className="content">
          <h2>{this.props.title || 400}</h2>
          <h4>{this.props.error || "Opps! Página no encontrada"}</h4>

          <p>{this.conten}</p>

          <Link to="/">Regresar</Link>
        </div>
      </div>
    );
  }
}

export default Error;
