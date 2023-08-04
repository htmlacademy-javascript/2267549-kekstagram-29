import {isEscapeKey} from './util.js';
import {setScale, resetScale} from './scale.js';
import {setEffectSlider, resetEffect} from './effects.js';
import {isValid, resetValidator} from './validator.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadInputNode = document.querySelector('.img-upload__input');
const imgUploadOverlayNode = document.querySelector('.img-upload__overlay');
const cancelButtonNode = document.querySelector('.img-upload__cancel');
const formNode = document.querySelector('.img-upload__form');
const hashtagNode = formNode.querySelector('.text__hashtags');
const commentNode = formNode.querySelector('.text__description');
const submitButtonNode = formNode.querySelector('.img-upload__submit');
const imgPreviewNode = document.querySelector('.img-upload__preview img');

const blockSubmitButton = () => {
  submitButtonNode.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonNode.disabled = false;
};

const setFormUpdateSubmit = (onSuccess) => {
  formNode.addEventListener('submit', (evt) => {

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
  formNode.reset();
  resetValidator();
  resetScale();
  resetEffect();
  document.removeEventListener('keydown', onDocumentKeydown);
  imgUploadOverlayNode.classList.add('hidden');
  document.body.classList.remove('.modal-open');
  cancelButtonNode.removeEventListener('click', onButtonCloseUploadForm);
};

const openForm = () => {
  imgUploadOverlayNode.classList.remove('hidden');
  document.body.classList.add('.modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonNode.addEventListener('click', onButtonCloseUploadForm);
  setEffectSlider();
  setScale();
};

const showSelectImg = () => {
  const file = imgUploadInputNode.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreviewNode.src = URL.createObjectURL(file);
  }
};

function onButtonCloseUploadForm () {
  closeForm();
}

const onFileInputChange = () => {
  openForm();
  showSelectImg();
};

const isTextFieldFocused = () => document.activeElement === hashtagNode || document.activeElement === commentNode;

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeForm();
  }
}

const setFormEventListeners = () => {
  imgUploadInputNode.addEventListener('change', onFileInputChange);
  setFormUpdateSubmit(closeForm);
};

export { setFormEventListeners };

