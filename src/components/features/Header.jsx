import React from "react";

import classes from "./Header.module.css";
import SearchBar from "./SearchBar";

const Header = ({ onFetchWeather }) => {
  return (
    <header className={classes.header}>
      <div className={classes.brand}>
        <span className={classes.mark} aria-hidden="true" />
        <span className={classes.title}>Galeview</span>
      </div>
      <SearchBar onFetchWeather={onFetchWeather} />
    </header>
  );
};

export default Header;
