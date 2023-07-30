import {renderGallery} from './gallery.js';
import {setFormEventListeners} from './form.js';
import { get as getData} from './api.js';
import {openErrorMessage} from './util.js';

getData()
  .then((picture) => {
    renderGallery(picture);
  })
  .catch(() => openErrorMessage('Не удалось получить данные с сервера'));


setFormEventListeners();
