// Валидация формы
import { imgUploadOverlay } from './upload-picture.js';
import { isEscEvent } from './util.js';

const inputTextHashtags = imgUploadOverlay.querySelector('.text__hashtags');
const inputComment = imgUploadOverlay.querySelector('.text__description');

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

inputComment.addEventListener('input', () => {
  const inputCommentText = inputComment.value;
  if (inputCommentText.length > MAX_COMMENT_LENGTH) {
    inputComment.setCustomValidity('Максимум 140 символов');
  }
});

inputTextHashtags.addEventListener('input', () => {
  inputTextHashtags.setCustomValidity('');
  const inputText = inputTextHashtags.value.toLowerCase().trim();
  if (!inputText) {
    return;
  }

  const inputArray = inputText.split(/\s+/);
  if (inputArray.length === 0) {
    return;
  }
  const isStartNotHashtag = inputArray.some((item) => {
    return item[0] !== '#';
  });

  if (isStartNotHashtag) {
    inputTextHashtags.setCustomValidity(
      'Хеш-тег начинается с символа "#" (решетка)',
    );
  }

  const isOnlyLatticeHashtag = inputArray.some((item) => {
    return item === '#';
  });
  if (isOnlyLatticeHashtag) {
    inputTextHashtags.setCustomValidity(
      'Хеш-тег не может состоять только из решетки',
    );
  }

  const isSplitSpaceHashtag = inputArray.some((item) => {
    return item.indexOf('#', 1) >= 1;
  });
  if (isSplitSpaceHashtag) {
    inputTextHashtags.setCustomValidity('Хеш-теги разделяются пробелами');
  }

  const isRepeatingHashtag = inputArray.some((item, i, arr) => {
    return arr.indexOf(item, i + 1) >= i + 1;
  });
  if (isRepeatingHashtag) {
    inputTextHashtags.setCustomValidity('Хеш-теги не должны повторяться');
  }

  const isLongHashtag = inputArray.some((item) => {
    return item.length > MAX_SYMBOLS;
  });
  if (isLongHashtag) {
    inputTextHashtags.setCustomValidity(
      'Максимальна длина хеш-тега 20 символов, включая решетку',
    );
  }

  if (inputArray.length > MAX_HASHTAGS) {
    inputTextHashtags.setCustomValidity('Максимум 5 хеш-тегов');
  }
});

//Отмена закрытия окна при фокусе в input и textarea

inputTextHashtags.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});

inputComment.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
});
