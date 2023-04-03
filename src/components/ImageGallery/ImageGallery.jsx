import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
const ImageGallery = ({ images, openModal }) => (
  <ul className={css.gallery}>
    {images.map(image => (
      <ImageGalleryItem
        key={image.id}
        id={image.id}
        image={image.webformatURL}
        alt={image.tags}
        openModal={openModal}
      ></ImageGalleryItem>
    ))}
  </ul>
);
export default ImageGallery;
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  openModal: PropTypes.func.isRequired,
};
