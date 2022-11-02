// @ts-check

import './nouislider.js';
import './upload-picture.js';
import './form-validation.js';
import { renderPicturePreview } from './preview.js';
import { showAlert } from './util.js';
import './submit-form.js';

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((Response) => Response.json())
  .then((pictures) => renderPicturePreview(pictures))
  .catch(() => {
    showAlert('Ошибка загрузки данных. Попробуйте ещё раз');
  });
