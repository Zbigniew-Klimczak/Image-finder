import { useState } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { getImagesOnSubmit, getImagesOnLoadMore } from './utils/FetchFunc';
export const App = () => {
  const [images, setImages] = useState([]);
  const [actualInputValue, setActualInputValue] = useState('');
  const [actualPage, setActualPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState({});
  return (
    <div className={css.app}>
      <Searchbar
        onSubmit={async inputValue => {
          setActualInputValue(inputValue);
          setActualPage(1);
          try {
            setImages([]);
            setIsLoading(true);
            setTotalImages(0);
            const response = await getImagesOnSubmit(inputValue);
            setImages(response.data.hits);
            setTotalImages(response.data.totalHits);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }}
      ></Searchbar>
      <ImageGallery
        images={images}
        openModal={imageId => {
          setIsModalOpen(true);
          setModalImage(images.find(image => image.id === imageId));
        }}
      ></ImageGallery>
      {isLoading === true && <ProgressBar width="100%" />}
      {images.length < totalImages && (
        <Button
          loadMore={async () => {
            let nextPage = actualPage + 1;
            setActualPage(nextPage);
            try {
              setIsLoading(true);
              const response = await getImagesOnLoadMore(
                actualInputValue,
                nextPage
              );
              setImages(oldImages => {
                return oldImages.concat(response.data.hits);
              });
            } catch (error) {
              console.log(error);
            } finally {
              setIsLoading(false);
            }
          }}
        ></Button>
      )}
      {isModalOpen === true && (
        <Modal
          imageObject={modalImage}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
