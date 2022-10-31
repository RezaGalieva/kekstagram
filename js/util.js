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

const ALERT_SHOW_TIME = 5000;

export const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'yellow';
  alertContainer.style.color = 'black';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
