import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
const ImageGalleryItem = ({ image, alt, id, openModal }) => (
  <li className={css.item}>
    <img
      className={css.itemImage}
      loading="lazy"
      src={image}
      alt={alt}
      onClick={() => openModal(id)}
    />
  </li>
);
export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  id: PropTypes.number,
  openModal: PropTypes.func.isRequired,
};
