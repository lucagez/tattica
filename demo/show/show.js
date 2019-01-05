const headers = new Headers();
const images = document.querySelectorAll('img');
const sync = document.querySelector('#sync');
const config = {
  timestamp: true,
  waitLoad: false,
  loadIntersections: false,
}

headers.append('Pragma-Directive', 'no-cache');
headers.append('Cache-Directive', 'no-cache');
headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
headers.append('Pragma', 'no-cache');
headers.append('Expires', '0');

const uniqueSrc = (img) => {
  const dataSrc = img.attributes['data-src'];
  if (dataSrc) img.setAttribute('data-src', `${dataSrc.value}?${Date.now()}`);
};

const loadAnimation = (img) => {
  img.addEventListener('load', (e) => {
    e.target.classList.add('pulse');
  });
};

images.forEach(loadAnimation);
images.forEach(uniqueSrc);

sync.addEventListener('click', () => tattica(config));