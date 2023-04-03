import { Component } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }
  handleChange = evt => {
    this.setState({ inputValue: evt.currentTarget.value });
  };
  handleSubmit = evt => {
    const { inputValue } = this.state;
    const { onSubmit } = this.props;
    evt.preventDefault();
    onSubmit(inputValue);
  };
  render() {
    const { inputValue } = this.state;
    return (
      <header className={css.bar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <span className={css.buttonLabel}>Search</span>
          </button>

          <input
            value={inputValue}
            onChange={this.handleChange}
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
export default Searchbar;
Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
