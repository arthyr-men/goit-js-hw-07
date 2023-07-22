import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const containerGalleryItems = document.querySelector('.gallery');

const createGalleryMarkup = galleryItems
  .map(({ preview, original, description }) => `<li class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`)
  .join('');

containerGalleryItems.insertAdjacentHTML('beforeend', createGalleryMarkup);

containerGalleryItems.addEventListener('click', onImgClick);

function onhandleEscapeKeydown(instance) {
  return function (event) {
    if (event.code === 'Escape') {
      instance.close();
    }
  };
}

function onImgClick(event) {
  event.preventDefault();
  const clickedElement = event.target;

  // Check if the clicked element has the class 'gallery__image'
  if (clickedElement.classList.contains('gallery__image')) {
    const instance = basicLightbox.create(
      ` <img src="${clickedElement.dataset.source}" width="800" height="600">`,
      {
        onShow: (instance) => {
          document.addEventListener('keydown', handleEscapeKeydown);
        },
        onClose: (instance) => {
          document.removeEventListener('keydown', handleEscapeKeydown);
        },
      },
    );
    const handleEscapeKeydown = onhandleEscapeKeydown(instance);
    instance.show();
  }
}