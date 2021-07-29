import React, { useState } from "react";

import style from "./Searchbar.module.css";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
    // this.setState({ query: e.currentTarget.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(query);
    setQuery("");
    // this.setState({ query: "" });
  };

  return (
    <header className={style.searchbar}>
      <form className={style.search_form} onSubmit={handleSubmit}>
        <button type="submit" className={style.search_form_button}>
          <span className={style.search_form_button_label}>Search</span>
        </button>

        <input
          className={style.search_form_input}
          type="text"
          value={query}
          onChange={handleChange}
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
