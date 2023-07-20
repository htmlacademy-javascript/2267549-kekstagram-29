import {insertPhotosToPage} from './photos.js';
import {openPopupPhoto} from './popup-photo.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  insertPhotosToPage(pictures);
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
};

export {renderGallery};
