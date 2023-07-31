import {insertPhotosToPage} from './photos.js';
import {openPopupPhoto} from './popup-photo.js';
import {getRandomInteger, debounce} from './util.js';

const COUNT_RANDOM_PHOTO = 10;

const container = document.querySelector('.pictures');
const filtersNode = document.querySelector('.img-filters');
const filtersButtons = document.querySelectorAll('.img-filters__button');

const changeActiveClassFilters = () => {
  filtersButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      filtersButtons.forEach((button) => {
        button.classList.remove('img-filters__button--active');
        button.disabled = false;
      });
      evt.target.classList.add('img-filters__button--active');
      evt.target.disabled = true;
    });
  });
};

const removePictures = () => {
  document.querySelectorAll('a.picture').forEach((el) => el.remove());
};

const updatePictures = (pictures) => {
  removePictures();
  insertPhotosToPage(pictures);
};

const getRandomPictures = (pictures) => {
  const currentArrayPhoto = [];
  for (let i = 0; i < COUNT_RANDOM_PHOTO; i++) {
    let newElement = pictures[getRandomInteger(0, pictures.length - 1)];
    while (currentArrayPhoto.includes(newElement)) {
      newElement = pictures[getRandomInteger(0, pictures.length - 1)];
    }
    currentArrayPhoto.push(newElement);
  }
  updatePictures(currentArrayPhoto);
};

const getDiscussedPictures = (pictures) => {
  removePictures();

  insertPhotosToPage(pictures
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length)
  );
};

const renderGallery = (pictures) => {
  filtersNode.classList.remove('img-filters--inactive');
  changeActiveClassFilters();

  filtersNode.addEventListener('click', debounce((evt) => {
    const filtersButton = evt.target.closest('.img-filters__button');
    if (!filtersButton){
      return;
    }
    switch (evt.target.id) {
      case 'filter-default':
        updatePictures(pictures);
        break;
      case 'filter-discussed':
        getDiscussedPictures(pictures);
        break;
      case 'filter-random':
        getRandomPictures(pictures);
    }
  }));

  container.addEventListener('click', (evt) => {
    const picture = evt.target.closest('[data-element-template-id]');
    if (!picture) {
      return;
    }

    evt.preventDefault();

    const currentPhoto = pictures.find(
      (item) => item.id === +picture.dataset.elementTemplateId
    );
    openPopupPhoto(currentPhoto);
  });

  insertPhotosToPage(pictures);
};

export {renderGallery};
