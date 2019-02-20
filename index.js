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
    events: {
      type: 'array',
      default: []
    },
    type: {
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
    },
    eventCond: {
      default: ''
    }
  },

  multiple: true,

  init: function () {
    this.clickTimer = null;
    this.onToggle = bind(this.onToggle, this);
  },

  update: function (oldData) {
    const data = this.data;
    this.toggled =data.toggled;
    this.eventCond = data.eventCond && data.eventCond.split('=').length == 2 ? data.eventCond.split('=') : null;
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
    addEventListeners(this.el, this.data.events, this.onToggle);
  },

  removeEventListeners: function () {
    removeEventListeners(this.el, this.data.events, this.onToggle);
  },

  onToggle: function (evt) {
    const data = this.data;

    if (!data.enabled) return;
    if (this.eventCond) {
      if (evt[this.eventCond[0]] !== this.eventCond[1]) return;
    }

    //  HACK: listen only on events coming from the canvas
    if (
      evt.target.tagName === 'CANVAS' 
      || evt.target.tagName === 'A-SCENE'
      || evt.target.tagName === 'BODY'
    ) { 
      if (data.type === 'double') {
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
    const eventName = eventNames[i];
    if (eventName.includes('key')) {
      window.addEventListener(eventName, handler);
    } else {
      el.addEventListener(eventName, handler);
    }
  }
}

function removeEventListeners (el, eventNames, handler) {
  var i;
  for (i = 0; i < eventNames.length; i++) {
    const eventName = eventNames[i];
    if (eventName.includes('key')) {
      window.removeEventListener(eventName, handler);
    } else {
      el.removeEventListener(eventName, handler);
    }
  }
}
