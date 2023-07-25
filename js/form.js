import {isEscapeKey} from './util.js';

const MAX_HASHTAGS_COUNTS = 5;
const MAX_COMMENT_LENGTH = 140;
const REGEX_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const INVALID_HASHTAG_FORMAT = 'Хэш-тег должен начинаться с решетки, содержать только буквы и цифры, иметь длину не более 20 символов';
const INVALID_HASHTAG_COUNT = 'Количество хэш-тегов не больше пяти';
const INVALID_HASHTAG_REPEAT = 'Хэш-теги не должны повторяться';
const INVALID_COMMENT_LENGTH = 'Длина комментария не может составлять больше 140 символов';

const uploadField = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const erorrConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
};

const pristine = new Pristine(uploadForm, erorrConfig);

const normalizeHashtags = (tags) => tags
  .trim()
  .toLowerCase()
  .split(' ')
  .filter((hashtag) => hashtag.length > 0);

const validateHashtagsCount = (value) => {
  const hashtags = normalizeHashtags(value);
  return hashtags.length <= MAX_HASHTAGS_COUNTS;
};

const validateHashtagsFormat = (value) => {
  const hashtags = normalizeHashtags(value);
  return hashtags.every((hashtag) => REGEX_HASHTAGS.test(hashtag));
};

const validateHashtagsDublicate = (value) => {
  const hashtags = normalizeHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

const validateCommentLength = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(hashtagsInput, validateHashtagsCount, INVALID_HASHTAG_COUNT);
pristine.addValidator(hashtagsInput, validateHashtagsFormat, INVALID_HASHTAG_FORMAT);
pristine.addValidator(hashtagsInput, validateHashtagsDublicate, INVALID_HASHTAG_REPEAT);
pristine.addValidator(commentInput, validateCommentLength, INVALID_COMMENT_LENGTH);

const onSubmitButtonClick = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if(isValid) {
    uploadForm.submit();
  }
};

const closeForm = () => {
  uploadForm.reset();
  pristine.reset();
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
