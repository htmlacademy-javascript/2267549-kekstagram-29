const DEFAULT_SHOW_ERROR_TIME = 10000;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomGenerator = (min, max) => {
  const arrayValue = [];
  return function() {
    let currentValue = getRandomInteger(min, max);
    if (arrayValue.length >= max - min + 1) {
      return null;
    }
    while (arrayValue.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    arrayValue.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const openErrorMessage = (message) => {
  const containerErrorMessage = document.createElement('div');
  containerErrorMessage.classList.add('container-error-message');
  document.body.append(containerErrorMessage);

  const errorMessage = document.createElement('div');
  errorMessage.textContent = message;
  errorMessage.classList.add('error-message');
  containerErrorMessage.append(errorMessage);

  setTimeout(() => {
    containerErrorMessage.remove();
  }, DEFAULT_SHOW_ERROR_TIME);
};

export{getRandomInteger, createRandomGenerator, getRandomArrayElement, isEscapeKey, openErrorMessage};
