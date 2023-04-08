import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
const Modal = ({ imageObject, closeModal }) => {
  useEffect(() => {
    const close = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  });
  return (
    <div
      id="overlay"
      className={css.overlay}
      onClick={e => {
        if (e.target.id === 'overlay') {
          closeModal();
        }
      }}
    >
      <div className={css.modal}>
        <img src={imageObject.largeImageURL} alt={imageObject.tags} />
      </div>
    </div>
  );
};
export default Modal;
Modal.propTypes = {
  imageObject: PropTypes.object,
  closeModal: PropTypes.func,
};
