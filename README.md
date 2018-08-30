## aframe-toggle-controls-component

[![Version](http://img.shields.io/npm/v/aframe-toggle-controls-component.svg?style=flat-square)](https://npmjs.org/package/aframe-toggle-controls-component)
[![License](http://img.shields.io/npm/l/aframe-toggle-controls-component.svg?style=flat-square)](https://npmjs.org/package/aframe-toggle-controls-component)

A Toggle Controls component for A-Frame.
Toggle is _touch_ and mouse click or by any other event, like from the input mapping.

For [A-Frame](https://aframe.io).

### API

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| enabled | Listen for events | _false_ |
| toggled | Initial toggled state | _false_ |
| toggleEv | Initial toggled state | _false_ |

### Installation

#### Browser

Install and use by directly including the [browser files](dist):

```html
<head>
  <title>My A-Frame Scene</title>
  <script src="https://aframe.io/releases/0.8.2/aframe.min.js"></script>
  <script src="https://unpkg.com/aframe-toggle-controls-component/dist/aframe-toggle-controls-component.min.js"></script>
</head>

<body>
  <a-scene>
    <a-entity toggle-controls="foo: bar"></a-entity>
  </a-scene>
</body>
```

#### npm

Install via npm:

```bash
npm install aframe-toggle-controls-component
```

Then require and use.

```js
require('aframe');
require('aframe-toggle-controls-component');
```
