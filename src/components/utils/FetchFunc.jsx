import axios from 'axios';
const API_KEY = '33245282-6e238748bd483492097eba1b8';

export const getImagesOnSubmit = actualInputValue => {
  const response = axios.get(
    `https://pixabay.com/api/?q=${actualInputValue}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};
export const getImagesOnLoadMore = (actualInputValue, actualPage) => {
  const response = axios.get(
    `https://pixabay.com/api/?q=${actualInputValue}&page=${actualPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
};
