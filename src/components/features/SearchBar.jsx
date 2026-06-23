import React, { useRef } from "react";

import classes from "./SearchBar.module.css";

const SearchBar = ({ onFetchWeather }) => {
  const cityRef = useRef(null);

  const submitHandler = (event) => {
    event.preventDefault();

    const city = cityRef.current.value.trim();
    if (city) {
      onFetchWeather(city);
      cityRef.current.value = "";
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="city-search" className={classes.srOnly}>
        City name
      </label>
      <div className={classes.searchForm}>
        <svg
          className={classes.icon}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.75" />
          <path
            d="M20 20l-3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          />
        </svg>
        <input
          id="city-search"
          type="text"
          placeholder="Search city…"
          className={classes.input}
          ref={cityRef}
          autoComplete="off"
          spellCheck="false"
        />
        <button type="submit" className={classes.button}>
          Go
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
