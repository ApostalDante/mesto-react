import React from "react";
import headerLogo from "../images/logo__header.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" alt='Место' src={headerLogo} />
    </header>
  );
};

export default Header;

