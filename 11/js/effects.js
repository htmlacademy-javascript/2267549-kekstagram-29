const sliderNode = document.querySelector('.img-upload__effect-level');
const effectValueInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const PhotoUploadPreview = document.querySelector('.img-upload__preview');

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


const styleEffecftsName = {
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};

const effectsUnits = {
  chrome: '',
  sepia: '',
  marvin: '%',
  phobos: 'px',
  heat: ''
};

const hideSlider = () => sliderNode.classList.add('hidden');
const showSlider = () => sliderNode.classList.remove('hidden');

const destroySlider = () => {
  if (sliderNode.noUiSlider) {
    sliderNode.noUiSlider.destroy();
  }
};

const getEffect = (currentEffect) => {
  const valueCurrent = sliderNode.noUiSlider.get();
  const styleEffecftCurrent = styleEffecftsName[currentEffect];
  const effectsUnitsCurrent = effectsUnits[currentEffect];
  effectValueInput.value = valueCurrent;

  PhotoUploadPreview.style.filter = `${styleEffecftCurrent}(${valueCurrent}${effectsUnitsCurrent})`;
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

  getEffect(currentEffect);

  sliderNode.noUiSlider.on('update', () => {
    getEffect(currentEffect);
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

effectsList.addEventListener('change', onChangeFilter);