<p align="center">
  <!-- <br> -->
  <a href="https://travis-ci.org/lucagez/tattica"><img src="https://travis-ci.com/lucagez/tattica.svg?branch=master" alt="travis"></a>
  <a href="https://www.npmjs.org/package/tattica"><img src="https://img.shields.io/npm/v/tattica.svg?style=flat" alt="npm"></a>
  <img src="https://img.shields.io/badge/license-MIT-f1c40f.svg" alt="MIT">
  <img src="https://img.shields.io/badge/PRs-welcome-6574cd.svg" alt="PR's welcome">
  <a href="https://unpkg.com/tattica"><img src="https://img.badgesize.io/https://unpkg.com/tattica/dist/tattica.js?compression=gzip" alt="gzip size"></a>
  <!-- <a href="https://www.npmjs.com/package/tattica"><img src="https://img.shields.io/npm/dt/tattica.svg" alt="downloads" ></a> -->
</p>

# Tattica
> A tactical approach to image loading

## Installation

If you are using a bundler:

```sh
npm install --save tattica
```

If you are not:

<a href="https://unpkg.com/tattica@0.1.0/dist/tattica.umd.js">https://unpkg.com/tattica@0.1.0/dist/tattica.umd.js</a>

## How it works

Using Tattica.js you can choose exacly when your images will be loaded in a very straightforward manner.

So you will be able to decide which images needs to served immediately and defer the loading of all the others when your browser is not too busy doing other important things.

- Starts only after `load` event.
- Priority (index) to control the exact loading order of your images.
- `window.requestIdleCallback` used to know when it's the right time for your browser to trigger new requests.
- `intersectionObservers` used to load anyway images that are in the viewport.
- A handy `callback` on every image load (now used to trigger the pulse animation).
- Possibility to define blocks of loading images (decide which requests need to be sync and which async).
- `navigator.connection.effectivetype` to check the type of connection of your users and load images accordingly.
- `setTimeout` will take care that no image will stop forever your loading queue.
- Possibility to define a fallback for images that returns errors.
- Super simple to integrate in your workflow (you'll only need to write html attributes).
- Friendly error messages (:

## API

`tattica` accepts an optional config object with the following parameters:

- `flag`: Attribute to search in the DOM to select elements for the loading queue. Defaults at `data-flag`.
- `string`: String to use to set non-empty src attribute to every image (in case a src is empty).
- `loadIntersections`: Defaults to TRUE. Detect elements that enter the
viewport and load image if not already loaded.
- `timeout`: Sets maximum loading time (in ms) for an image to load sync. Defaults to 1000ms.
It can be set to FALSE. However setting it to false is discouraged in a real-world scenario.
- `callback`: Pass callback to be executed after an image loading resolve. Defaults to null.
- `timestamp`: If set to TRUE prints Date.now() in `timestamp` image attribute.
Useful for testing purpose. eg: check if images are loading synchronously

## Recipes



## License

Licensed under the MIT license.

