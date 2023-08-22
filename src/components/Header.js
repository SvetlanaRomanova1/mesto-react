import React from 'react';
import logoHeader from '../image/logo-image.svg';

function Header() {
  return (
    <header className="header">
      <img alt="Логотип место" className="header__logo" src={logoHeader} />
    </header>
  );
}

export default Header;
