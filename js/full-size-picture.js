import { isEscEvent } from './util.js';

export const body = document.querySelector('body');
const bigPictureModal = document.querySelector('.big-picture');
const socialCommentsModule = bigPictureModal.querySelector('.social__comments');
const templateComment = document
  .querySelector('#comment')
  .content.querySelector('.social__comment');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
let showMoreComments;

/** добавить обработчик нажатия на превью для открытия большого окна */
export const addPicturePreviewEventListener = (preview, card) => {
  preview.addEventListener('click', () => {
    // скрытие ненужных объектов, добавление нужных
    body.classList.add('modal-open');
    bigPictureModal.classList.remove('hidden');
    bigPictureModal.querySelector('.social__comments').innerHTML = '';

    // из card брать данные для заполнения большой карточки
    bigPictureModal.querySelector('.big-picture__img img').src = card.url;
    bigPictureModal.querySelector('.likes-count').textContent = card.likes;

    bigPictureModal.querySelector('.comments-count').textContent =
      card.comments.length;
    bigPictureModal.querySelector('.social__caption').textContent =
      card.description;

    // создание комментариев

    const addComment = (comment) => {
      const newComment = templateComment.cloneNode(true);
      newComment.querySelector('.social__picture').src = comment.avatar;
      newComment.querySelector('.social__picture').alt = comment.name;
      newComment.querySelector('.social__text').textContent = comment.message;
      socialCommentsModule.appendChild(newComment);
    };

    if (card.comments.length <= 5) {
      commentsLoader.classList.add('hidden');
    }

    // первые 5 комментариев
    const firstComments = card.comments.slice(0, 5);
    firstComments.forEach(addComment);
    bigPictureModal.querySelector('.comments-current').textContent =
      firstComments.length;

    showMoreComments = () => {
      const commentsCount =
        socialCommentsModule.querySelectorAll('.social__comment').length;
      const newComments = card.comments.slice(commentsCount, commentsCount + 5);
      newComments.forEach(addComment);
      bigPictureModal.querySelector('.comments-current').textContent =
        commentsCount + newComments.length;
      if (commentsCount + newComments.length === card.comments.length) {
        commentsLoader.classList.add('hidden');
      }
    };

    // загрузить ещё
    commentsLoader.addEventListener('click', showMoreComments);
  });
};

// Закрытие формы
const modalClose = () => {
  body.classList.remove('modal-open');
  bigPictureModal.classList.add('hidden');
  commentsLoader.classList.remove('hidden');
  commentsLoader.removeEventListener('click', showMoreComments);
};
// закрытие окна через клавишу
document.addEventListener('keydown', (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    modalClose();
  }
});
// закрытие окна нажатием на кнопку
const buttonClose = bigPictureModal.querySelector('.big-picture__cancel');
buttonClose.addEventListener('click', () => {
  modalClose();
});
