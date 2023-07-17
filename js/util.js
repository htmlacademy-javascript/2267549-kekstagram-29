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

export{getRandomInteger, createRandomGenerator, getRandomArrayElement};
