const PHOTO_COUNT = 25;
const COMMENTS_COUNT = 2;

const PHOTO_DESCRIPTIONS = [
  'Доброе утро',
  'Отличный день',
  'Наконец-то отпуск',
  'На тренировке',
  'Всем привет',
  'На море',
  'В походе'
];

const COMMENTS_MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const COMMENTS_NAME = [
  'Артем Иванов',
  'Василий Кузьмин',
  'Петр Калинкин',
  'Анна Петрова',
  'Юрий Николаев',
  'Юлия Сергеева'
];

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
const generatePhotoId = createRandomGenerator(1, 25);
const generatePhotoLikes = createRandomGenerator(15, 200);
const generateCommentAvatar = createRandomGenerator(0, 30);

const createComment = () => {
  const Avatar = generateCommentAvatar();
  return {
    id: generatePhotoId(),
    avatar: `img/avatar-${Avatar}.svg`,
    message: getRandomArrayElement(COMMENTS_MESSAGE),
    name: getRandomArrayElement(COMMENTS_NAME),
  };
};

const createPhoto = () => {
  const id = generatePhotoId();
  const generateComment = Array.from({length: getRandomInteger(1, COMMENTS_COUNT)}, createComment);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS),
    likes: generatePhotoLikes(),
    comments: generateComment
  };
};

Array.from({length: PHOTO_COUNT}, createPhoto);

