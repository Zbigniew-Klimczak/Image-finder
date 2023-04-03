import css from './Button.module.css';
import PropTypes from 'prop-types';
const Button = ({ loadMore }) => (
  <button className={css.button} type="button" onClick={loadMore}>
    Load more
  </button>
);
export default Button;
Button.propTypes = {
  loadMore: PropTypes.func,
};
