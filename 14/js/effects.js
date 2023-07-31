const sliderNode = document.querySelector('.effect-level__slider');
const sliderNodeContainer = document.querySelector('.img-upload__effect-level');
const effectValueInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const photoUploadPreview = document.querySelector('.img-upload__preview');

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

const hideSlider = () => sliderNodeContainer.classList.add('hidden');
const showSlider = () => sliderNodeContainer.classList.remove('hidden');

const destroySlider = () => {
  if (sliderNode.noUiSlider) {
    sliderNode.noUiSlider.destroy();
  }
};

const changeEffect = (currentEffect) => {
  const valueCurrent = sliderNode.noUiSlider.get();
  const styleEffecftCurrent = StyleEffectsName[currentEffect];
  const effectsUnitsCurrent = EffectsUnits[currentEffect];
  effectValueInput.value = valueCurrent;

  photoUploadPreview.style.filter = `${styleEffecftCurrent}(${valueCurrent}${effectsUnitsCurrent})`;
};

const applyEffect = (currentEffect) => {
  const effect = configFilters[currentEffect];
  destroySlider();

  noUiSlider.create(sliderNode, {
    range: {
      min: effect.range.min,
      max: effect.range.max,
    },
    start: effect.start,
    step: effect.step,
    connect: 'lower',
  });
  changeEffect(currentEffect);
  sliderNode.noUiSlider.on('update', () => {
    changeEffect(currentEffect);
  });
};

const onChangeFilter = () => {
  const currentEffect = effectsList.querySelector('input:checked').value;

  if (currentEffect === 'none'){
    hideSlider();
    return;
  }
  showSlider();
  applyEffect(currentEffect);
};

const setEffectSlider = () => {
  hideSlider();
  effectsList.addEventListener('change', onChangeFilter);
};

export {setEffectSlider};
