import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../assets/styles/components/Search.scss";

const Search = ({ onChange }) => (
  <div className="box__search">
    <div className="box__search__container">
      <span className="icon">
        <FontAwesomeIcon icon={["fas", "search"]} />
      </span>
      <input
        onChange={onChange}
        type="search"
        id="search"
        placeholder="Buscar..."
      />
    </div>
  </div>
);

export default Search;
