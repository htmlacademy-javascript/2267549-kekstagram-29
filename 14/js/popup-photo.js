import {isEscapeKey} from './util.js';

const DEFAULT_SHOW_COMMENTS = 5;

const popupPhoto = document.querySelector('.big-picture');
const popupPhotoClose = document.querySelector('#picture-cancel');
const popupPhotoUrl = popupPhoto.querySelector('.big-picture__img img');
const popupPhotoLikes = popupPhoto.querySelector('.likes-count');
const popupPhotoComents = popupPhoto.querySelector('.comments-count');
const popupPhotoCaption = popupPhoto.querySelector('.social__caption');
const popupPhotoListComents = popupPhoto.querySelector('.social__comments');
const socialCommentCount = popupPhoto.querySelector('.social__comment-count');
const commentsLoaderButton = popupPhoto.querySelector('.comments-loader');
const commentTemplate = document.querySelector('.social__comment');

let commentsShown = 0;
let commentsArray = [];

const createPopupPhoto = ({comments, url, description, likes}) => {
  popupPhotoUrl.src = url;
  popupPhotoLikes.textContent = likes;
  popupPhotoComents.textContent = comments.length;
  popupPhotoCaption.textContent = description;
};

const createComment = ({avatar, message, name}) => {
  const element = commentTemplate.cloneNode(true);
  element.querySelector('.social__picture').src = avatar;
  element.querySelector('.social__picture').alt = name;
  element.querySelector('.social__text').innerHTML = message;
  return element;
};

const renderComents = () => {
  popupPhotoListComents.textContent = '';
  commentsShown += DEFAULT_SHOW_COMMENTS;
  if (commentsShown >= commentsArray.length) {
    commentsLoaderButton.classList.add('hidden');
    commentsShown = commentsArray.length;
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }

  const commentFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(commentsArray[i]);
    commentFragment.append(commentElement);
  }

  popupPhotoListComents.innerHTML = '';
  popupPhotoListComents.append(commentFragment);
  socialCommentCount.innerHTML = `${commentsShown} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
};

const openPopupPhoto = (arrayPhoto) => {
  popupPhoto.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  createPopupPhoto(arrayPhoto);
  commentsArray = arrayPhoto.comments;
  if (commentsArray.length === 0) {
    popupPhotoListComents.innerHTML = '';
    commentsLoaderButton.classList.add('hidden');
    socialCommentCount.innerHTML = `${commentsShown} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
  }
  if (commentsArray.length > 0) {
    renderComents();
  }
};

const closePopupPhoto = () => {
  popupPhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  commentsShown = 0;
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

const onButtoncommentsLoader = () => {
  renderComents();
};

popupPhotoClose.addEventListener('click', onButtonCloseClick);

commentsLoaderButton.addEventListener('click', onButtoncommentsLoader);

export {openPopupPhoto};
