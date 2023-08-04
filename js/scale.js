const STEP_SCALE = 25;
const STEP_MIN = 25;
const STEP_MAX = 100;
const SCALE_DEFAULT = 100;

const scaleValueNode = document.querySelector('.scale__control--value');
const photoUploadPreviewNode = document.querySelector('.img-upload__preview img');
const scaleDownButtonNode = document.querySelector('.scale__control--smaller');
const scaleUpButtonNode = document.querySelector('.scale__control--bigger');

const scalePhoto = (value) => {
  scaleValueNode.value = `${value}%`;
  photoUploadPreviewNode.style.scale = value / 100;
};

const onPhotoScaleDownButtonClick = () => {
  const currentValue = parseInt (scaleValueNode.value, 10);
  const newValue = Math.max(currentValue - STEP_SCALE, STEP_MIN);
  scalePhoto(newValue);
};

const onPhotoScaleUpButtonClick = () => {
  const currentValue = parseInt (scaleValueNode.value, 10);
  const newValue = Math.min(currentValue + STEP_SCALE, STEP_MAX);
  scalePhoto(newValue);
};

const resetScale = () => {
  scalePhoto(SCALE_DEFAULT);
};

const setScale = () => {
  scaleDownButtonNode.addEventListener('click', onPhotoScaleDownButtonClick);
  scaleUpButtonNode.addEventListener('click', onPhotoScaleUpButtonClick);
};

export {setScale, resetScale};
