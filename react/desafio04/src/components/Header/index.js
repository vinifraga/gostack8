import React from "react";

import "./styles.css";
import facebook from "../../assets/facebook-logo.png";

function Header() {
  return (
    <div className="Header">
      <div id="Container">
        <img id="logo" src={facebook} alt="Facebook Logo" />
        <div id="profile">Meu perfil</div>
      </div>
    </div>
  );
}

export default Header;
