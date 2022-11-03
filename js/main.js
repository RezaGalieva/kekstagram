import './nouislider.js';
import './upload-picture.js';
import './form-validation.js';
import { renderPicturePreview } from './preview.js';
import { showAlert } from './util.js';
import './submit-form.js';
import { addFilterEventListeners } from './filter-rename-handler.js';

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((Response) => Response.json())
  .then((pictures) => {
    renderPicturePreview(pictures);
    addFilterEventListeners(pictures);
  })
  .catch(() => showAlert('Ошибка загрузки данных. Попробуйте ещё раз'));
