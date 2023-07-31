import {isEscapeKey} from './util.js';

const successMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');

const closeMessage = () => {
  const messageBlock = document.querySelector('.success') || document.querySelector('.error');
  messageBlock.remove();
  document.body.removeEventListener('click', onBodyClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onBodyClick(evt) {
  if (!(evt.target.closest('.success__inner')) || (evt.target.closest('.error__inner'))) {
    evt.preventDefault();
    closeMessage();
  }
}

const showMessage = (message, closeButtonClass) => {
  document.body.append(message);
  document.querySelector(closeButtonClass).addEventListener('click', closeMessage);
  document.body.addEventListener('click', onBodyClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const showSuccessMessage = () => {
  showMessage(successMessage, '.success__button');
};


const showErrorMessage = () => {
  showMessage(errorMessage, '.error__button');
};

export {showSuccessMessage, showErrorMessage};
