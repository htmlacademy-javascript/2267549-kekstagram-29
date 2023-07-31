const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';

const Route = {
  GET: '/data',
  POST: '/'
};

const ErrorText = {
  GET: 'Ошибка загрузки данных. Попробуйте обновить страницу',
  POST: 'Ошибка отправки данных. Попробуйте ещё раз',
};

const Methods = {
  GET: 'GET',
  POST: 'POST'
};

const load = (route, errorText, method = Methods.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const get = () => load(Route.GET, ErrorText.GET);

const sendData = (body) => load(Route.POST, ErrorText.POST, Methods.POST, body);

export { get, sendData };
