import { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
const Searchbar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <header className={css.bar}>
      <form
        className={css.form}
        onSubmit={evt => {
          evt.preventDefault();
          onSubmit(inputValue);
        }}
      >
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          value={inputValue}
          onChange={evt => setInputValue(evt.currentTarget.value)}
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
