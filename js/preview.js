import { cards } from './data.js';

const templatePreview = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');
// создание карточки с информацией о фото
const picturesBlockFragment = document.createDocumentFragment();

cards.forEach((card) => {
  const picturePreview = templatePreview.cloneNode(true);
  picturePreview.querySelector('.picture__img').src = card.url;
  picturePreview.querySelector('.picture__comments').textContent =
    card.comments.length;
  picturePreview.querySelector('.picture__likes').textContent = card.likes;
  picturePreview.dataset.id = card.id;
  picturesBlockFragment.appendChild(picturePreview);
});
picturesBlock.appendChild(picturesBlockFragment);
