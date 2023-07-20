const photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createPhoto = ({comments, url, description, likes, id}) => {
  const elementTemplate = photoTemplate.cloneNode(true);
  elementTemplate.querySelector('.picture__img').src = url;
  elementTemplate.querySelector('.picture__img').alt = description;
  elementTemplate.querySelector('.picture__likes').textContent = likes;
  elementTemplate.querySelector('.picture__comments').textContent = comments.length;
  elementTemplate.dataset.elementTemplateId = id;

  return elementTemplate;
};

const insertPhotosToPage = (pictures) =>{
  const photoFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const element = createPhoto(picture);
    photoFragment.append(element);
  });
  container.append(photoFragment);
};

export {insertPhotosToPage};
