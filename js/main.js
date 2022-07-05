/**  Функция для вывода случайного положительного числа
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 */
const getRandomNumber = (min, max) => {
  if (max < 0 || min < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** Функция для проверки количества символов */
const checkStringLength = (text, amount) => {
  return text.length <= amount;
};

/** Возвращает случайный элемент из массива
 * @param {Array} elements массива
 */
const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

// #region Создание массива элементов
const DESCRIPTIONS = [
  "Фотография где красиво",
  "Фото с пейзажем",
  "Изображение с котом",
  "Фотокарточка из СССР",
  "Картинка с девушкой",
];

const NAMES = ["Иван", "Хуан Себастьян", "Мария", "Кристоф"];

const COMMENTS = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

/** Значение следующего идентификатора комментария  */
let nextCommentId = 0;
/** Функция возвращает новый ID */
const getCommentId = () => nextCommentId++;

const createComment = () => {
  return {
    id: getCommentId(),
    name: getRandomArrayElement(NAMES),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElement(COMMENTS),
  };
};

/** Значение следующего идентификатора карточки  */
var nextCardId = 1;
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

const cards = new Array(25).fill(null).map(createCard);
// #endregion
