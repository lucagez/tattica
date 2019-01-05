const headers = new Headers();
const images = document.querySelectorAll('img');
const normals = document.querySelectorAll('.normal');
const sync = document.querySelectorAll('.sync');
const config = {
  timestamp: true,
  waitLoad: false,
  loadIntersections: false,
};

headers.append('Pragma-Directive', 'no-cache');
headers.append('Cache-Directive', 'no-cache');
headers.append('Cache-Control', 'no-cache, no-store, must-revalidate');
headers.append('Pragma', 'no-cache');
headers.append('Expires', '0');

const placeholder = (img) => {
  const ref = img;
  if (img.src === '') ref.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
};

const uniqueSrc = (img) => {
  const dataSrc = img.attributes['data-src'];
  if (dataSrc) img.setAttribute('data-src', `${dataSrc.value}?${Date.now()}`);
};

const loadAnimation = (img) => {
  img.addEventListener('load', (e) => {
    e.preventDefault();
    e.target.classList.add('pulse');
  });
};

normals.forEach(loadAnimation);
images.forEach(placeholder);
images.forEach(uniqueSrc);

sync.forEach(button => button.addEventListener('click', (e) => {
  const target = e.target.attributes['data-target'].value;
  config.flag = target;
  tattica(config);
  dispatchEvent(new Event('load'));
}));
