/* global AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

const bind = AFRAME.utils.bind;

AFRAME.registerComponent('toggle-controls', {
  schema: {
    enabled: {
      default: true,
      type: 'boolean'
    },
    toggled: {
      default: false,
      type: 'boolean'
    },
    toggleEvents: {
      type: 'array',
      default: ['mousedown', 'touchstart']
    },
    toggleType: {
      oneOf: ['single', 'double'],
      default: 'single'
    },
    onEvents: {
      type: 'array'
    },
    offEvents: {
      type: 'array'
    },
    toggleTimeout: {
      type: 'int',
      default: 400
    }
  },

  multiple: true,

  init: function () {
    this.clickTimer = null;
    this.onToggle = bind(this.onToggle, this);
  },

  update: function (oldData) {
    this.toggled = this.data.toggled;
  },

  play: function () {
    this.addEventListeners();
  },

  pause: function () {
    this.removeEventListeners();
  },

  remove: function () {
    this.pause();
  },

  addEventListeners: function () {
    addEventListeners(this.el, this.data.toggleEvents, this.onToggle);
  },

  removeEventListeners: function () {
    removeEventListeners(this.el, this.data.toggleEvents, this.onToggle);
  },

  onToggle: function (event) {
    const data = this.data;

    if (!data.enabled) return;

    //  HACK: listen only on events coming from the canvas
    if (event.target.tagName !== 'CANVAS') return;

    if (data.toggleType === 'double') {
      if (this.clickTimer == null) {
        this.clickTimer = setTimeout(() => {
          this.clickTimer = null;
        }, data.toggleTimeout);
      } else {
        clearTimeout(this.clickTimer);
        this.clickTimer = null;
        this._toggle();
      }
    } else {
      this._toggle();
    }
  },

  _toggle: function () {

    const data = this.data;

    if (this.toggled) {
      emitEvents(this.el, data.offEvents);
    } else {
      emitEvents(this.el, data.onEvents);
    }

    this.toggled = !this.toggled;
  }
});


function emitEvents (el, eventNames) {
  var i;
  for (i = 0; i < eventNames.length; i++) {
    el.emit(eventNames[i], null);
  }
}


function addEventListeners (el, eventNames, handler) {
  var i;
  for (i = 0; i < eventNames.length; i++) {
    el.addEventListener(eventNames[i], handler);
  }
}

function removeEventListeners (el, eventNames, handler) {
  var i;
  for (i = 0; i < eventNames.length; i++) {
    el.removeEventListener(eventNames[i], handler);
  }
}
