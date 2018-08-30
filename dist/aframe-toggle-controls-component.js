/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

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
      default: ['mousedown', 'touchstart']
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
    addEventListeners(this.el, this.data.events, this.onToggle);
  },

  removeEventListeners: function () {
    removeEventListeners(this.el, this.data.events, this.onToggle);
  },

  onToggle: function (event) {
    const data = this.data;

    if (!data.enabled) return;

    //  HACK: listen only on events coming from the canvas
    if (event.target.tagName !== 'CANVAS') return;

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


/***/ })
/******/ ]);