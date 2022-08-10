// @ts-check

/**  Функция для вывода случайного положительного числа
 * @param {number} min минимальное значение
 * @param {number} max максимальное значение
 */
export const getRandomNumber = (min, max) => {
  if (max < 0 || min < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/** Функция для проверки количества символов
 * @param {string} text строка
 * @param {number} amount максимальная длина строки
 */
export const checkStringLength = (text, amount) => {
  return text.length <= amount;
};

/** Возвращает случайный элемент из массива
 * @param {Array} elements массива
 */
export const getRandomArrayElement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

/** Проверка нажатой клавиши ESC */
export const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};
