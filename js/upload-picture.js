// Загрузка изображения
import { isEscEvent } from './util.js';
import './nouislider.js';
const body = document.querySelector('body');
const formUpload = document.querySelector('.img-upload__start');
export const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadFile = formUpload.querySelector('#upload-file');
const imgUploadPreview = imgUploadOverlay.querySelector(
  '.img-upload__preview img',
);
const scaleControlValue = imgUploadOverlay.querySelector(
  '.scale__control--value',
);
const effectsPreview = imgUploadOverlay.querySelectorAll('.effects__preview');

const uploadEffects = document.querySelector('.img-upload__effects');
const chromeEffects = uploadEffects.querySelector('.effects__preview--chrome');
const sepiaEffects = uploadEffects.querySelector('.effects__preview--sepia');
const marvinEffects = uploadEffects.querySelector('.effects__preview--marvin');
const phobosEffects = uploadEffects.querySelector('.effects__preview--phobos');
const heatEffects = uploadEffects.querySelector('.effects__preview--heat');
const noneEffects = uploadEffects.querySelector('.effects__preview--none');
const levelEffect = imgUploadOverlay.querySelector('.img-upload__effect-level');

// Открытие формы редактирования изображения
uploadFile.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  levelEffect.classList.add('hidden');

  const oFReader = new FileReader();
  oFReader.readAsDataURL(uploadFile.files[0]);

  oFReader.onload = function (oFREvent) {
    imgUploadPreview.src = oFREvent.target.result;

    effectsPreview.forEach((element) => {
      element.style.backgroundImage = `url(${oFREvent.target.result})`;
    });
  };

  scaleControlValue.value = 100 + '%';
});

// Закрытие формы
const modalClose = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
};
// Закрытие окна через клавишу
document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    modalClose();
  }
});
// Закрытие окна нажатием на кнопку
const buttonClose = imgUploadOverlay.querySelector('.img-upload__cancel');
buttonClose.addEventListener('click', () => {
  modalClose();
});

// Нажатие на кнопки масштаба
const scaleControlSmaller = imgUploadOverlay.querySelector(
  '.scale__control--smaller',
);
const scaleControlBigger = imgUploadOverlay.querySelector(
  '.scale__control--bigger',
);

scaleControlBigger.addEventListener('click', () => {
  const scaleValueNumber = parseInt(scaleControlValue.value);
  scaleControlValue.value = Math.min(100, scaleValueNumber + 25) + '%';
  const scale = `scale(${0.01 * parseInt(scaleControlValue.value)})`;
  imgUploadPreview.style.transform = scale;
});

scaleControlSmaller.addEventListener('click', () => {
  const scaleValueNumber = parseInt(scaleControlValue.value);
  scaleControlValue.value = Math.max(25, scaleValueNumber - 25) + '%';
  const scale = `scale(${0.01 * parseInt(scaleControlValue.value)})`;
  imgUploadPreview.style.transform = scale;
});

// Слайдер интенсивности эффекта

const stepSlider = imgUploadOverlay.querySelector('.effect-level__slider');
const effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');

noUiSlider.create(stepSlider, {
  start: 100,
  step: 1,
  connect: 'lower',
  range: {
    min: 1,
    max: 100,
  },
});

stepSlider.noUiSlider.on('update', (values, handle) => {
  effectLevelValue.value = values[handle];
});

//Наложение эффекта на изображение

const removeEffects = () => {
  imgUploadPreview.classList.remove('effects__preview--chrome');
  imgUploadPreview.classList.remove('effects__preview--sepia');
  imgUploadPreview.classList.remove('effects__preview--marvin');
  imgUploadPreview.classList.remove('effects__preview--phobos');
  imgUploadPreview.classList.remove('effects__preview--heat');

  levelEffect.classList.remove('hidden');
  //effectLevelValue.value = '';
};

noneEffects.addEventListener('click', () => {
  removeEffects();
  levelEffect.classList.add('hidden');
  const effectNone = 'none';
  imgUploadPreview.style.filter = effectNone;
});

chromeEffects.addEventListener('click', () => {
  removeEffects();
  imgUploadPreview.classList.add('effects__preview--chrome');

  stepSlider.noUiSlider.updateOptions({
    start: 1,
    step: 0.1,
    connect: 'lower',
    range: {
      min: 0.1,
      max: 1,
    },
  });
  stepSlider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    const grayscale = `grayscale(${effectLevelValue.value})`;
    imgUploadPreview.style.filter = grayscale;
  });
});

sepiaEffects.addEventListener('click', () => {
  removeEffects();
  imgUploadPreview.classList.add('effects__preview--sepia');

  stepSlider.noUiSlider.updateOptions({
    start: 1,
    step: 0.1,
    connect: 'lower',
    range: {
      min: 0.1,
      max: 1,
    },
  });
  stepSlider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    const sepia = `sepia(${effectLevelValue.value})`;
    imgUploadPreview.style.filter = sepia;
  });
});

marvinEffects.addEventListener('click', () => {
  removeEffects();
  imgUploadPreview.classList.add('effects__preview--marvin');

  stepSlider.noUiSlider.updateOptions({
    start: 100,
    step: 1,
    connect: 'lower',
    range: {
      min: 1,
      max: 100,
    },
  });
  stepSlider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    const invert = `invert(${Math.floor(effectLevelValue.value)}%)`;
    imgUploadPreview.style.filter = invert;
  });
});

phobosEffects.addEventListener('click', () => {
  removeEffects();
  imgUploadPreview.classList.add('effects__preview--phobos');

  stepSlider.noUiSlider.updateOptions({
    start: 3,
    step: 0.1,
    connect: 'lower',
    range: {
      min: 0,
      max: 3,
    },
  });
  stepSlider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    const blur = `blur(${parseInt(effectLevelValue.value)}px)`;
    imgUploadPreview.style.filter = blur;
  });
});

heatEffects.addEventListener('click', () => {
  removeEffects();
  imgUploadPreview.classList.add('effects__preview--heat');

  stepSlider.noUiSlider.updateOptions({
    start: 3,
    step: 0.1,
    connect: 'lower',
    range: {
      min: 1,
      max: 3,
    },
  });
  stepSlider.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];
    const brightness = `brightness(${effectLevelValue.value})`;
    imgUploadPreview.style.filter = brightness;
  });
});
