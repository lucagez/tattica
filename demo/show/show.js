const images = document.querySelectorAll('img');
const normals = document.querySelectorAll('.normal');
const sync = document.querySelectorAll('.sync');

const placeholder = (img) => {
  const ref = img;
  if (img.src === '') ref.src = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
};

const loadAnimation = (img) => {
  img.classList.add('pulse');
};

normals.forEach(loadAnimation);
images.forEach(placeholder);

const config = {
  // A timestamp is printed on elements for testing purposes
  timestamp: true,

  // Tells tattica not to load images in the viewport
  // => in this demo every image is in the viewport when loaded
  loadIntersections: false,

  // Trigger animation
  callback: loadAnimation,

  // Deactivated timeout to show that tattica can behave truly sync.
  // In a real-world scenario it should always be a value. Defaults: 1000ms
  timeout: false,
};


// Tattica starts working immedialtely waiting for `load` event.
// For this demo, to trigger loadings, is necessary to dispatch a fake event.
sync.forEach(button => button.addEventListener('click', (e) => {
  const target = e.target.attributes['data-target'].value;
  config.flag = target;
  tattica(config);
  dispatchEvent(new Event('load'));
}));
