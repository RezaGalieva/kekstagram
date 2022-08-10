// @ts-check

import { getRandomNumber, getRandomArrayElement } from './util.js';

const DESCRIPTIONS = [
  'Фотография где красиво',
  'Фото с пейзажем',
  'Изображение с котом',
  'Фотокарточка из СССР',
  'Картинка с девушкой',
];

const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф'];

const COMMENTS = [
  'Круто получилось! Так держать!',
  'Какая красотища!',
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

/** Значение следующего идентификатора комментария  */
let nextCommentId = 0;
/** Функция возвращает новый ID */
const getCommentId = () => nextCommentId++;

export const createComment = () => {
  return {
    id: getCommentId(),
    name: getRandomArrayElement(NAMES),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
  };
};

/** Значение следующего идентификатора карточки  */
let nextCardId = 1;
/** Функция возвращает новый ID */
const getCardId = () => nextCardId++;

const createCard = () => {
  const id = getCardId();
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: new Array(getRandomNumber(0, 3)).fill(null).map(createComment),
  };
};

export const cards = new Array(25).fill(null).map(createCard);
