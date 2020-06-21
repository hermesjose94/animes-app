import React from "react";

import "../assets/styles/pages/App.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = ({ history, children }) => (
  <React.Fragment>
    <Header history={history} />
    <div className="content__app">{children}</div>
    <Footer />
  </React.Fragment>
);

export default Layout;
