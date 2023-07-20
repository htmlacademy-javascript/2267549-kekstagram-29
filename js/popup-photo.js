import {isEscapeKey} from './util.js';

const popupPhoto = document.querySelector('.big-picture');
const popupPhotoClose = document.querySelector('#picture-cancel');
const popupPhotoUrl = popupPhoto.querySelector('.big-picture__img img');
const popupPhotoLikes = popupPhoto.querySelector('.likes-count');
const popupPhotoComents = popupPhoto.querySelector('.comments-count');
const popupPhotoCaption = popupPhoto.querySelector('.social__caption');
const popupPhotoListComents = popupPhoto.querySelector('.social__comments');
const socialCommentCount = popupPhoto.querySelector('.social__comment-count');
const commentsLoader = popupPhoto.querySelector('.comments-loader');

const createPopupPhoto = ({comments, url, description, likes}) => {
  popupPhotoUrl.src = url;
  popupPhotoLikes.textContent = likes;
  popupPhotoComents.textContent = comments.length;
  popupPhotoCaption.textContent = description;
};

const renderComents = (comments) => {
  popupPhotoListComents.textContent = '';
  comments.forEach(({ avatar, message, name }) => {
    const itemComment = `
    <li class="social__comment">
    <img
        class="social__picture"
        src="${avatar}"
        alt="${name}"
        width="35" height="35">
    <p class="social__text">${message}</p>
    </li>`;
    popupPhotoListComents.innerHTML += itemComment;
  });
};

const openPopupPhoto = (arrayPhoto) => {
  popupPhoto.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  createPopupPhoto(arrayPhoto);
  renderComents(arrayPhoto.comments);
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const closePopupPhoto = () => {
  popupPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onButtonCloseClick = () => {
  closePopupPhoto();
};

function onDocumentKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopupPhoto();
  }
}

popupPhotoClose.addEventListener('click', onButtonCloseClick);

export {openPopupPhoto};
