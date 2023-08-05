const EFFECT_DEFAULT = 'default';

const sliderNode = document.querySelector('.effect-level__slider');
const containerSliderNode = document.querySelector('.img-upload__effect-level');
const effectLevelValueNode = document.querySelector('.effect-level__value');
const effectsListNode = document.querySelector('.effects__list');
const imgPreviewNode = document.querySelector('.img-upload__preview img');

const configFilters = {
  default: {
    range: {
      min: 1,
      max: 100
    },
    start: 0,
    step: 1
  },
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    start: 0,
    step: 0.1
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    start: 0,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    start: 0,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    start: 0,
    step: 0.1
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    start: 0,
    step: 0.1
  }
};

const StyleEffectsName = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

const EffectsUnits = {
  chrome: '',
  sepia: '',
  marvin: '%',
  phobos: 'px',
  heat: ''
};

const hideSlider = () => containerSliderNode.classList.add('hidden');
const showSlider = () => containerSliderNode.classList.remove('hidden');

const destroySlider = () => {
  if (sliderNode.noUiSlider) {
    sliderNode.noUiSlider.destroy();
  }
};

const changeEffect = (effect) => {
  const valueCurrent = sliderNode.noUiSlider.get();
  const styleEffecftCurrent = StyleEffectsName[effect];
  const effectsUnitsCurrent = EffectsUnits[effect];
  effectLevelValueNode.value = valueCurrent;

  imgPreviewNode.style.filter = `${styleEffecftCurrent}(${valueCurrent}${effectsUnitsCurrent})`;
};

const applyEffect = (currentEffect) => {
  const effect = configFilters[currentEffect];
  destroySlider();

  noUiSlider.create(sliderNode, {
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    start: effect.range.max,
    step: effect.step,
    connect: 'lower',
  });
  changeEffect(currentEffect);
  sliderNode.noUiSlider.on('update', () => {
    changeEffect(currentEffect);
  });
};

const onChangeFilter = () => {
  const currentEffect = effectsListNode.querySelector('input:checked').value;

  if (currentEffect === 'none'){
    hideSlider();
    imgPreviewNode.style.filter = null;
    return;
  }
  showSlider();
  applyEffect(currentEffect);
};

const setEffectSlider = () => {
  hideSlider();
  effectsListNode.addEventListener('change', onChangeFilter);
};

const resetEffect = () => {
  const currentEffect = EFFECT_DEFAULT;
  imgPreviewNode.style.filter = null;
  applyEffect(currentEffect);
};

export {setEffectSlider, resetEffect};
