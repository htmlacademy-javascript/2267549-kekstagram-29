const STEP_SCALE = 25;
const STEP_MIN = 25;
const STEP_MAX = 100;
const SCALE_DEFAULT = 100;

const photoScaleInput = document.querySelector('.scale__control--value');
const photoUploadPreview = document.querySelector('.img-upload__preview img');
const photoScaleDownButton = document.querySelector('.scale__control--smaller');
const photoScaleUpButton = document.querySelector('.scale__control--bigger');

const scalePhoto = (value) => {
  photoScaleInput.value = `${value}%`;
  photoUploadPreview.style.scale = value / 100;
};

const onPhotoScaleDownButtonClick = () => {
  const currentValue = parseInt (photoScaleInput.value, 10);
  const newValue = Math.max(currentValue - STEP_SCALE, STEP_MIN);
  scalePhoto(newValue);
};

const onPhotoScaleUpButtonClick = () => {
  const currentValue = parseInt (photoScaleInput.value, 10);
  const newValue = Math.min(currentValue + STEP_SCALE, STEP_MAX);
  scalePhoto(newValue);
};

const resetScale = () => {
  scalePhoto(SCALE_DEFAULT);
};

const setScale = () => {
  photoScaleDownButton.addEventListener('click', onPhotoScaleDownButtonClick);
  photoScaleUpButton.addEventListener('click', onPhotoScaleUpButtonClick);
};

export {setScale, resetScale};
