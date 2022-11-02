// Отправка формы загруженного изображения

import { modalClose } from './upload-picture.js';
import { body } from './full-size-picture.js';
import { isEscEvent } from './util.js';

const formImgUpload = document.querySelector('.img-upload__form');

// Сообщение об успешной загрузке изображения

const showUploadSuccess = () => {
  const uploadSuccessTemplate = document
    .querySelector('#success')
    .content.querySelector('.success');
  const newUploadSuccess = uploadSuccessTemplate.cloneNode(true);
  body.appendChild(newUploadSuccess);

  const sectionSuccess = body.querySelector('.success');
  const successButton = body.querySelector('.success__button');

  // Закрытие сообщения
  successButton.addEventListener('click', () => {
    body.removeChild(sectionSuccess);
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      body.removeChild(sectionSuccess);
    }
  });
  document.addEventListener('click', (event) => {
    const divSuccessInner = sectionSuccess.querySelector('.success__inner');
    if (!divSuccessInner.contains(event.target))
      body.removeChild(sectionSuccess);
  });
};

// Сообщение с ошибкой загрузки изображения
const showUploadError = () => {
  const uploadErrorTemplate = document
    .querySelector('#error')
    .content.querySelector('.error');
  const newUploadError = uploadErrorTemplate.cloneNode(true);
  body.appendChild(newUploadError);

  const sectionError = body.querySelector('.error');
  const errorButton = body.querySelector('.error__button');

  // Закрытие сообщения
  errorButton.addEventListener('click', () => {
    body.removeChild(sectionError);
  });
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      body.removeChild(sectionError);
    }
  });
  document.addEventListener('click', (event) => {
    const divSuccessInner = sectionError.querySelector('.error__inner');
    if (!divSuccessInner.contains(event.target)) body.removeChild(sectionError);
  });
};

formImgUpload.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then(modalClose())
    .then((Response) => {
      if (Response.ok) {
        showUploadSuccess();
      } else {
        showUploadError();
      }
    })
    .catch(() => showUploadError());
});
