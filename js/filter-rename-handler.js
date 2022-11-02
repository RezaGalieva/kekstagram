// Фильтрация изображений от других пользователей
import { renderPicturePreview } from './preview.js';
import { shuffleArray } from './util.js';
import './lodash.js';

const imgFiltersContainer = document.querySelector('.img-filters__form');
const filterDefault = imgFiltersContainer.querySelector('#filter-default');
const filterRandom = imgFiltersContainer.querySelector('#filter-random');
const filterDiscussed = imgFiltersContainer.querySelector('#filter-discussed');

const RANDOM_PREVIEW_LOAD = 10;
const DEFAULT_PREVIEW_LOAD = 25;
const TIME_DEBOUNCE = 500;

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');
  images.forEach((element) => {
    element.remove();
  });
};

const removeActiveClass = () => {
  const activeClass = imgFiltersContainer.querySelector(
    '.img-filters__button--active',
  );
  activeClass.classList.remove('img-filters__button--active');
};

export const addFilterEventListeners = (photos) => {
  filterDefault.addEventListener(
    'click',
    _.debounce(
      () => {
        removeActiveClass();
        filterDefault.classList.add('img-filters__button--active');

        removePhotos();
        renderPicturePreview(photos.slice(0, DEFAULT_PREVIEW_LOAD));
      },
      TIME_DEBOUNCE,
      {
        leading: true,
      },
    ),
  );

  filterRandom.addEventListener(
    'click',
    _.debounce(
      () => {
        removeActiveClass();
        filterRandom.classList.add('img-filters__button--active');

        removePhotos();
        renderPicturePreview(
          shuffleArray(photos.slice()).slice(0, RANDOM_PREVIEW_LOAD),
        );
      },
      TIME_DEBOUNCE,
      {
        leading: true,
      },
    ),
  );

  filterDiscussed.addEventListener(
    'click',
    _.debounce(
      () => {
        removeActiveClass();
        filterDiscussed.classList.add('img-filters__button--active');
        removePhotos();

        renderPicturePreview(
          photos.slice().sort((a, b) => {
            return b.comments.length - a.comments.length;
          }),
        );
      },
      TIME_DEBOUNCE,
      {
        leading: true,
      },
    ),
  );
};
