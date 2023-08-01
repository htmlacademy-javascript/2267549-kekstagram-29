import {isEscapeKey} from './util.js';
import {setScale, resetScale} from './scale.js';
import {setEffectSlider} from './effects.js';
import {isValid, resetValidator} from './validator.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const uploadField = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const imgPreview = document.querySelector('.img-upload__preview img');

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const setFormUpdateSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {

    evt.preventDefault();

    if(isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showSuccessMessage();
        })
        .catch(
          () => {
            showErrorMessage();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};
const closeForm = () => {
  uploadForm.reset();
  resetValidator();
  resetScale();
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  uploadCancelButton.removeEventListener('click', onButtonCloseUploadForm);
};

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  uploadCancelButton.addEventListener('click', onButtonCloseUploadForm);
  setEffectSlider();
  setScale();
};

const showSelectImg = () => {
  const file = uploadField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

function onButtonCloseUploadForm () {
  closeForm();
}

const onFileInputChange = () => {
  openForm();
  showSelectImg();
};

const isTextFieldFocused = () => document.activeElement === hashtagsInput || document.activeElement === commentInput;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

const setFormEventListeners = () => {
  uploadField.addEventListener('change', onFileInputChange);
  setFormUpdateSubmit(closeForm);
};

export { setFormEventListeners };

