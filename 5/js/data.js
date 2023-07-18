import {getRandomInteger, createRandomGenerator, getRandomArrayElement} from './util.js';

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

const generatePhotoId = createRandomGenerator(1, 25);
const generateComentId = createRandomGenerator(1, 100);
const generatePhotoLikes = createRandomGenerator(15, 200);
const generateCommentAvatar = createRandomGenerator(0, 30);

const createComment = () => {
  const avatar = generateCommentAvatar();
  return {
    id: generateComentId(),
    avatar: `img/avatar-${avatar}.svg`,
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

const createPhotos = () => Array.from({length: PHOTO_COUNT}, createPhoto);
export {createPhotos};
