const MAX_HASHTAGS_COUNTS = 5;
const MAX_COMMENT_LENGTH = 140;
const REGEX_HASHTAGS = /^#[a-zа-яё0-9]{1,19}$/i;
const INVALID_HASHTAG_FORMAT = 'Хэш-тег должен начинаться с решетки, содержать только буквы и цифры, иметь длину не более 20 символов';
const INVALID_HASHTAG_COUNT = 'Количество хэш-тегов не больше пяти';
const INVALID_HASHTAG_REPEAT = 'Хэш-теги не должны повторяться';
const INVALID_COMMENT_LENGTH = 'Длина комментария не может составлять больше 140 символов';

const formNode = document.querySelector('.img-upload__form');
const hashtagNode = formNode.querySelector('.text__hashtags');
const commentNode = formNode.querySelector('.text__description');

const erorrConfig = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
};

const pristine = new Pristine(formNode, erorrConfig);

const isValid = pristine.validate;
const resetValidator = pristine.reset;

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

pristine.addValidator(hashtagNode, validateHashtagsCount, INVALID_HASHTAG_COUNT);
pristine.addValidator(hashtagNode, validateHashtagsFormat, INVALID_HASHTAG_FORMAT);
pristine.addValidator(hashtagNode, validateHashtagsDublicate, INVALID_HASHTAG_REPEAT);
pristine.addValidator(commentNode, validateCommentLength, INVALID_COMMENT_LENGTH);

export {isValid, resetValidator};
