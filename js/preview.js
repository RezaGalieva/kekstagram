import { addPicturePreviewEventListener } from './full-size-picture.js';

const templatePreview = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesBlock = document.querySelector('.pictures');

// создание карточки с информацией о фото
export const renderPicturePreview = (photos) => {
  const picturesBlockFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const picturePreview = templatePreview.cloneNode(true);
    picturePreview.querySelector('.picture__img').src = photo.url;
    picturePreview.querySelector('.picture__comments').textContent =
      photo.comments.length;
    picturePreview.querySelector('.picture__likes').textContent = photo.likes;
    picturePreview.dataset.id = photo.id;
    addPicturePreviewEventListener(picturePreview, photo);
    picturesBlockFragment.appendChild(picturePreview);
  });
  picturesBlock.appendChild(picturesBlockFragment);
  const imgFilters = document.querySelector('.img-filters');
  imgFilters.classList.remove('img-filters--inactive');
};
