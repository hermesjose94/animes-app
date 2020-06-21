import React from "react";

import "../assets/styles/components/PageLoading.scss";
import "../assets/styles/components/PointLoading.scss";

class PointLoading extends React.Component {
  render() {
    return (
      <div className="PageLoading">
        <div className="lds-grid">
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    );
  }
}

export default PointLoading;
