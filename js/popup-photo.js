import {isEscapeKey} from './util.js';

const DEFAULT_SHOW_COMMENTS = 5;

const popupPhotoNode = document.querySelector('.big-picture');
const popupPhotoCloseNode = document.querySelector('#picture-cancel');
const popupPhotoImgNode = popupPhotoNode.querySelector('.big-picture__img img');
const likesCountNode = popupPhotoNode.querySelector('.likes-count');
const commentsCountNode = popupPhotoNode.querySelector('.comments-count');
const socialCaptionNode = popupPhotoNode.querySelector('.social__caption');
const socialComentsNode = popupPhotoNode.querySelector('.social__comments');
const commentCountNode = popupPhotoNode.querySelector('.social__comment-count');
const commentsLoaderNode = popupPhotoNode.querySelector('.comments-loader');
const commentTemplateNode = document.querySelector('.social__comment');

let commentsShown = 0;
let commentsArray = [];

const createPopupPhoto = ({comments, url, description, likes}) => {
  popupPhotoImgNode.src = url;
  likesCountNode.textContent = likes;
  commentsCountNode.textContent = comments.length;
  socialCaptionNode.textContent = description;
};

const createComment = ({avatar, message, name}) => {
  const element = commentTemplateNode.cloneNode(true);
  element.querySelector('.social__picture').src = avatar;
  element.querySelector('.social__picture').alt = name;
  element.querySelector('.social__text').innerHTML = message;
  return element;
};

const renderComents = () => {
  socialComentsNode.textContent = '';
  commentsShown += DEFAULT_SHOW_COMMENTS;
  if (commentsShown >= commentsArray.length) {
    commentsLoaderNode.classList.add('hidden');
    commentsShown = commentsArray.length;
  } else {
    commentsLoaderNode.classList.remove('hidden');
  }

  const commentFragment = document.createDocumentFragment();

  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(commentsArray[i]);
    commentFragment.append(commentElement);
  }

  socialComentsNode.innerHTML = '';
  socialComentsNode.append(commentFragment);
  commentCountNode.innerHTML = `${commentsShown} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
};

const onButtoncommentsLoader = () => {
  renderComents();
};

const closePopupPhoto = () => {
  popupPhotoNode.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  popupPhotoCloseNode.removeEventListener('click', onButtonCloseClick);
  commentsLoaderNode.removeEventListener('click', onButtoncommentsLoader);
  commentsShown = 0;
};

const openPopupPhoto = (arrayPhoto) => {
  popupPhotoNode.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  popupPhotoCloseNode.addEventListener('click', onButtonCloseClick);
  commentsLoaderNode.addEventListener('click', onButtoncommentsLoader);
  document.addEventListener('keydown', onDocumentKeydown);
  createPopupPhoto(arrayPhoto);
  commentsArray = arrayPhoto.comments;
  if (commentsArray.length === 0) {
    socialComentsNode.innerHTML = '';
    commentsLoaderNode.classList.add('hidden');
    commentCountNode.innerHTML = `${commentsShown} из <span class="comments-count">${commentsArray.length}</span> комментариев`;
  }
  if (commentsArray.length > 0) {
    renderComents();
  }
};

function onDocumentKeydown(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopupPhoto();
  }
}

function onButtonCloseClick(){
  closePopupPhoto();
}


export {openPopupPhoto};
