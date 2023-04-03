import { Component } from 'react';
import axios from 'axios';
import { ProgressBar } from 'react-loader-spinner';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
const API_KEY = '33245282-6e238748bd483492097eba1b8';
export class App extends Component {
  state = {
    images: [],
    actualInputValue: '',
    actualPage: 1,
    totalImages: 0,
    isLoading: false,
    isModalOpen: false,
    modalImageObject: {},
  };
  onSubmit = inputValue => {
    this.setState({ actualInputValue: inputValue, actualPage: 1 });
    this.getImagesOnSubmit(inputValue);
  };
  onLoadMore = () => {
    const { actualPage, actualInputValue } = this.state;
    let nextPage = actualPage + 1;
    this.setState({ actualPage: nextPage });
    this.getImagesOnLoadMore(actualInputValue, nextPage);
  };
  getImagesOnSubmit = async actualInputValue => {
    try {
      this.setState({ images: [], isLoading: true, totalImages: 0 });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${actualInputValue}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({
        images: response.data.hits,
        totalImages: response.data.totalHits,
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  getImagesOnLoadMore = async (actualInputValue, actualPage) => {
    try {
      this.setState({ isLoading: true });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${actualInputValue}&page=${actualPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState(prevState => ({
        images: prevState.images.concat(response.data.hits),
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  openModal = imageId => {
    const { images } = this.state;
    const modalImage = images.find(image => image.id === imageId);
    this.setState({ isModalOpen: true, modalImageObject: modalImage });
  };
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { images, totalImages, isLoading, isModalOpen, modalImageObject } =
      this.state;
    return (
      <div className={css.app}>
        <Searchbar onSubmit={this.onSubmit}></Searchbar>
        <ImageGallery
          images={this.state.images}
          openModal={this.openModal}
        ></ImageGallery>
        {isLoading === true && <ProgressBar width="100%" />}
        {images.length < totalImages && (
          <Button loadMore={this.onLoadMore}></Button>
        )}
        {isModalOpen === true && (
          <Modal imageObject={modalImageObject} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
