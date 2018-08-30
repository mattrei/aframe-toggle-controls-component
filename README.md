## aframe-toggle-controls-component

[![Version](http://img.shields.io/npm/v/aframe-toggle-controls-component.svg?style=flat-square)](https://npmjs.org/package/aframe-toggle-controls-component)
[![License](http://img.shields.io/npm/l/aframe-toggle-controls-component.svg?style=flat-square)](https://npmjs.org/package/aframe-toggle-controls-component)

A Toggle Controls component for A-Frame.
Toggle is _touch_ and mouse click or by any other event, like from the input mapping.

For [A-Frame](https://aframe.io).

### API

Multiple components may be set on the _scene_ entity.

| Property | Description | Default Value |
| -------- | ----------- | ------------- |
| enabled | Listen for events | `false` |
| toggled | Initial toggled state | `false` |
| events | List of events that are used for toggling | `['mousedown', 'touchstart']` |
| type | Type of the toggle. Either `single` or `double` | `single` |
| toggleTimeout | The time in milliseconds between to _toggleEvents_ if the _toggleType_ is `double` | `400` |
| onEvents | Events to be fired when the toggle state is toggled | `[]` |
| offEvents | Events to be fired when the toggle state is not toggled | `[]` |


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
  <a-scene toggle-controls="onEvents: toggleOn: offEvents: toggleOff;">
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
