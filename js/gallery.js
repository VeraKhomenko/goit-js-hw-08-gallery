import { default as images } from './gallery-items.js';
console.log(images);

const ulGallery = document.querySelector('.js-gallery');
const divLightbox = document.querySelector('.js-lightbox');
const largeImage = document.querySelector('.lightbox__image');
const btnClose = document.querySelector('.lightbox__button');
const modalClose = document.querySelector('.lightbox__overlay');
const imageList = images
  .map(
    image =>
      `<li class="gallery__item"><a class="gallery__link" href="${image.original}"><img class="gallery__image" src="${image.preview}" data-source="${image.original}" alt="${image.description}" width="320"/></a></li>`,
  )
  .join('');

ulGallery.insertAdjacentHTML('beforeend', imageList);
ulGallery.addEventListener('click', onTagsClick);
btnClose.addEventListener('click', onModalClose);
modalClose.addEventListener('click', onModalCloseDiv);
document.addEventListener('keydown', onModalCloseEsc);
document.addEventListener('keydown', toggleLargeImage);

function onTagsClick(event) {
  event.preventDefault();
  const nextActiveTag = event.target;
  const activeTagSource = nextActiveTag.dataset.source;
  const activeTagAlt = nextActiveTag.alt;
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  setLargeImage(activeTagSource, activeTagAlt);
}

function onModalCloseDiv() {
  divLightbox.classList.remove('is-open');
  largeImage.src = '';
  largeImage.alt = '';
}

function onModalClose(event) {
  if (event.target.nodeName === 'BUTTON') {
    onModalCloseDiv();
  }
}

function onModalCloseEsc(evt) {
  if (evt.key === 'Escape') {
    onModalCloseDiv();
  }
}

function setLargeImage(url, alt) {
  largeImage.src = url;
  largeImage.alt = alt;
  divLightbox.classList.add('is-open');
}

function toggleLargeImage(event) {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    let nextImage;
    const currentSrc = largeImage.src;
    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      if (image.original == currentSrc) {
        if (event.key === 'ArrowRight') {
          if (index + 1 <= images.length) {
            nextImage = images[index + 1];
          }
        } else {
          if (index - 1 >= 0) {
            nextImage = images[index - 1];
          }
        }
      }
    }
    setLargeImage(nextImage.original, nextImage.description);
  }
}
