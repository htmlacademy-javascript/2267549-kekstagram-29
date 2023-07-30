import {isEscapeKey} from './util.js';
import {setScale, resetScale} from './scale.js';
import {setEffectSlider} from './effects.js';
import {isValid, resetValidator} from './validator.js';

const uploadField = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const onSubmitButtonClick = (evt) => {
  evt.preventDefault();

  if(isValid) {
    uploadForm.submit();
  }
};

const closeForm = () => {
  uploadForm.reset();
  resetValidator();
  resetScale();
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  uploadForm.removeEventListener('submit', onSubmitButtonClick);
  uploadCancelButton.removeEventListener('click', onButtonCloseUploadForm);
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadForm.addEventListener('submit', onSubmitButtonClick);
  uploadCancelButton.addEventListener('click', onButtonCloseUploadForm);
  setEffectSlider();
  setScale();
};

function onButtonCloseUploadForm () {
  closeForm();
}

const onFileInputChange = () => {
  openForm();
};

const isTextFieldFocused = () => document.activeElement === hashtagsInput || document.activeElement === commentInput;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

uploadField.addEventListener('change', onFileInputChange);

