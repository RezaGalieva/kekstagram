import './preview.js';
import { cards } from './data.js';
import { isEscEvent } from './util.js';

const smallPictures = document.querySelectorAll('.picture');
const bigPictureModal = document.querySelector('.big-picture');
const socialCommentsModule = bigPictureModal.querySelector('.social__comments');
const body = document.querySelector('body');

smallPictures.forEach((picture) => {
  // извлечь id из атрибута элемента picture
  const cardId = Number(picture.getAttribute('data-id'));
  // найти объект card из массива cards
  const card = cards.find((element) => cardId === element.id);

  picture.addEventListener('click', () => {
    //скрыть ненужные объекты
    body.classList.add('modal-open');
    bigPictureModal.classList.remove('hidden');
    bigPictureModal
      .querySelector('.social__comment-count')
      .classList.add('hidden');
    bigPictureModal.querySelector('.comments-loader').classList.add('hidden');
    bigPictureModal.querySelector('.social__comments').innerHTML = '';

    // из card брать данные для заполнения большой карточки
    bigPictureModal.querySelector('.big-picture__img img').src = card.url;
    bigPictureModal.querySelector('.likes-count').textContent = card.likes;
    bigPictureModal.querySelector('.comments-count').textContent =
      card.comments.length;
    bigPictureModal.querySelector('.social__caption').textContent =
      card.description;

    // создание комментария
    const templateComment = document
      .querySelector('#comment')
      .content.querySelector('.social__comment');
    card.comments.forEach((comment) => {
      const newComment = templateComment.cloneNode(true);
      newComment.querySelector('.social__picture').src = comment.avatar;
      newComment.querySelector('.social__picture').alt = comment.name;
      newComment.querySelector('.social__text').textContent = comment.message;
      socialCommentsModule.appendChild(newComment);
    });
  });

  // закрытие окна через клавишу
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      body.classList.remove('modal-open');
      bigPictureModal.classList.add('hidden');
    }
  });
  // закрытие окна нажатием на кнопку
  const buttonClose = bigPictureModal.querySelector('.big-picture__cancel');
  buttonClose.addEventListener('click', () => {
    body.classList.remove('modal-open');
    bigPictureModal.classList.add('hidden');
  });
});
