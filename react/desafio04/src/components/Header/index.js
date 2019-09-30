import React from "react";

import "./styles.css";
import facebook from "../../assets/facebook-logo.png";

function Header() {
  return (
    <div id="Header">
      <div className="Container">
        <img src={facebook} alt="Facebook Logo" />
        <div>Meu perfil</div>
      </div>
    </div>
  );
}

export default Header;
