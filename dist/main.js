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
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomUtil = exports.DomUtil = function () {
  function DomUtil() {
    _classCallCheck(this, DomUtil);
  }

  _createClass(DomUtil, null, [{
    key: 'createElement',
    value: function createElement(tagName, classNames) {
      var elem = document.createElement(tagName);
      if (classNames) {
        var _elem$classList;

        (_elem$classList = elem.classList).add.apply(_elem$classList, _toConsumableArray(classNames));
      }
      return elem;
    }
  }, {
    key: 'getStyle',
    value: function getStyle(elem) {
      return window.getComputedStyle ? getComputedStyle(elem, '') : elem.currentStyle;
    }
  }]);

  return DomUtil;
}();

exports.default = 'DomUtil';

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _youtubeService = __webpack_require__(13);

var _viewBuilder = __webpack_require__(11);

var _controls = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = exports.App = function () {
  function App() {
    _classCallCheck(this, App);

    this.searchQuery = '';
    this.itemsPerPage = App.getItemsPerPage();

    this.youtubeService = new _youtubeService.YoutubeService();
    this.viewBuilder = new _viewBuilder.ViewBuilder();
    this.searchControl = new _controls.SearchControl();
    this.carouselControl = new _controls.CarouselControl(this.itemsPerPage);
    this.paginatorControl = new _controls.PaginatorControl(this.itemsPerPage);
  }

  _createClass(App, [{
    key: 'run',
    value: function run() {
      var _this = this;

      var searchElement = this.searchControl.getElement();
      this.viewBuilder.setHeader(searchElement);
      var carouselElement = this.carouselControl.getElement();
      this.viewBuilder.setMain(carouselElement);
      var paginatorElement = this.paginatorControl.getElement();
      this.viewBuilder.setFooter(paginatorElement);
      var template = this.viewBuilder.getTemplate();
      document.body.appendChild(template);

      this.youtubeService.getVideos().then(function (videos) {
        var items = App.getCards(videos.items);
        _this.carouselControl.setItems(items);
        _this.paginatorControl.setItemsCount(_this.carouselControl.itemsCount);
      });

      window.addEventListener('resize', function () {
        return _this.resizeHandler();
      });

      searchElement.addEventListener('search', function (ev) {
        _this.searchQuery = ev.detail.query;
        _this.youtubeService.getVideos(_this.searchQuery).then(function (videos) {
          var items = App.getCards(videos.items);
          _this.carouselControl.setItems(items);
          _this.paginatorControl.setItemsCount(_this.carouselControl.itemsCount);
          _this.paginatorControl.setPage(0);
        });
      });

      carouselElement.addEventListener('swipe', function (ev) {
        _this.paginatorControl.setPage(_this.carouselControl.pageIndex);
        var diff = _this.carouselControl.itemsCount - (ev.detail.pageIndex + 1) * _this.carouselControl.itemsPerPage;

        if (diff < 8) {
          _this.youtubeService.getVideos(_this.searchQuery).then(function (videos) {
            var items = App.getCards(videos.items);
            _this.carouselControl.addItems(items);
            _this.paginatorControl.setItemsCount(_this.carouselControl.itemsCount);
          });
        }
      });

      paginatorElement.addEventListener('change', function (ev) {
        _this.carouselControl.setPage(ev.detail.pageIndex);
      });
    }
  }, {
    key: 'resizeHandler',
    value: function resizeHandler() {
      this.itemsPerPage = App.getItemsPerPage();
      this.paginatorControl.setItemsPerPage(this.itemsPerPage);
      this.carouselControl.setItemsPerPage(this.itemsPerPage);
    }
  }], [{
    key: 'getCards',
    value: function getCards(videos) {
      var items = videos.map(function (item) {
        var title = item.snippet.title;
        var subTitle = item.snippet.channelTitle + ' / ' + item.snippet.publishedAt.slice(0, 10);
        var description = item.snippet.description;
        var contentUrl = _youtubeService.YoutubeService.url + '/watch?v=' + item.id;
        var imageUrl = item.snippet.thumbnails.medium.url;
        var leftFooter = item.statistics.viewCount + ' views';
        var rightFooter = item.statistics.likeCount + ' likes';

        var card = new _controls.CardControl(title, subTitle, description, contentUrl, imageUrl, leftFooter, rightFooter);

        return card.getElement();
      });

      return items;
    }
  }, {
    key: 'getItemsPerPage',
    value: function getItemsPerPage() {
      var itemsPerPage = 0;

      var screenWidth = window.outerWidth;
      if (screenWidth > 1100) {
        itemsPerPage = 3;
      } else if (screenWidth > 730) {
        itemsPerPage = 2;
      } else {
        itemsPerPage = 1;
      }

      return itemsPerPage;
    }
  }]);

  return App;
}();

var app = new App();
app.run();

exports.default = App;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domUtil = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardControl = exports.CardControl = function () {
  function CardControl(title, subTitle, description, contentUrl, imageUrl, leftFooter, rightFooter) {
    _classCallCheck(this, CardControl);

    this.element = _domUtil.DomUtil.createElement('div', ['y-card']);
    this.headerAndBodyContainer = _domUtil.DomUtil.createElement('div', []);
    this.setImage(imageUrl);
    this.cardBodyElement = _domUtil.DomUtil.createElement('div', ['y-card__body']);
    this.headerAndBodyContainer.appendChild(this.cardBodyElement);
    this.setTitle(title, contentUrl);
    this.setSubTitle(subTitle);
    this.setDescription(description);

    this.element.appendChild(this.headerAndBodyContainer);
    this.setFooter(leftFooter, rightFooter);
  }

  _createClass(CardControl, [{
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }, {
    key: 'setImage',
    value: function setImage(url) {
      if (url) {
        var cardHeaderElement = _domUtil.DomUtil.createElement('div', ['y-card__header']);
        var cardImageElement = _domUtil.DomUtil.createElement('img', []);
        cardImageElement.src = url;
        cardHeaderElement.appendChild(cardImageElement);
        this.headerAndBodyContainer.appendChild(cardHeaderElement);
      }
    }
  }, {
    key: 'setTitle',
    value: function setTitle(title, url) {
      if (title && url) {
        var cardTitleLinkElement = _domUtil.DomUtil.createElement('a', ['y-card__title']);
        cardTitleLinkElement.href = url;
        cardTitleLinkElement.target = '_blank';
        cardTitleLinkElement.innerHTML = title;
        cardTitleLinkElement.title = title;
        this.cardBodyElement.appendChild(cardTitleLinkElement);
      }
    }
  }, {
    key: 'setSubTitle',
    value: function setSubTitle(subTitle) {
      if (subTitle) {
        var cardSubTitleElement = _domUtil.DomUtil.createElement('div', ['y-card__sub-title']);
        cardSubTitleElement.innerHTML = subTitle;
        cardSubTitleElement.title = subTitle;
        this.cardBodyElement.appendChild(cardSubTitleElement);
      }
    }
  }, {
    key: 'setDescription',
    value: function setDescription(description) {
      if (description) {
        var cardDescriptionElement = _domUtil.DomUtil.createElement('p', ['y-card__description']);
        cardDescriptionElement.innerHTML = description;
        cardDescriptionElement.title = description;
        this.cardBodyElement.appendChild(cardDescriptionElement);
      }
    }
  }, {
    key: 'setFooter',
    value: function setFooter(left, right) {
      var cardFooterElement = _domUtil.DomUtil.createElement('div', ['y-card__footer']);
      this.element.appendChild(cardFooterElement);

      if (left) {
        var cardLeftFooterElement = _domUtil.DomUtil.createElement('div', ['y-card__left-footer']);
        cardLeftFooterElement.innerHTML = left;
        cardFooterElement.appendChild(cardLeftFooterElement);
      }

      if (right) {
        var cardRightFooterElement = _domUtil.DomUtil.createElement('div', ['y-card__right-footer']);
        cardRightFooterElement.innerHTML = right;
        cardFooterElement.appendChild(cardRightFooterElement);
      }
    }
  }]);

  return CardControl;
}();

exports.default = CardControl;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(2);

Object.keys(_card).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _card[key];
    }
  });
});

var _card2 = __webpack_require__(14);

Object.keys(_card2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _card2[key];
    }
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarouselControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domUtil = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CarouselControl = exports.CarouselControl = function () {
  function CarouselControl(itemsPerPage) {
    var _this = this;

    _classCallCheck(this, CarouselControl);

    this.element = _domUtil.DomUtil.createElement('section', ['y-carousel']);
    this.itemsCount = 0;
    this.itemsPerPage = itemsPerPage;
    this.pageIndex = 0;

    this.offset = 0;
    this.startClientX = null;

    this.element.onmousedown = function (ev) {
      return _this.mousedownHandler(ev);
    };
    this.element.ontouchstart = function (ev) {
      return _this.mousedownHandler(ev);
    };
    document.body.addEventListener('mouseup', function (ev) {
      return _this.mouseupHandler(ev);
    });
    document.body.addEventListener('touchend', function (ev) {
      return _this.mouseupHandler(ev);
    });
  }

  _createClass(CarouselControl, [{
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }, {
    key: 'setItems',
    value: function setItems(items) {
      if (items) {
        this.pageIndex = 0;
        this.offset = 0;
        this.startClientX = null;
        this.itemsCount = 0;

        this.element.innerHTML = '';
        this.addItems(items);
        this.setPage(0);
      }
    }
  }, {
    key: 'addItems',
    value: function addItems(items) {
      if (items) {
        var docFragment = document.createDocumentFragment();
        items.forEach(function (item) {
          var carouselItem = _domUtil.DomUtil.createElement('article', ['y-carousel-item']);
          carouselItem.appendChild(item);
          docFragment.appendChild(carouselItem);
        });
        this.element.appendChild(docFragment);

        this.itemsCount += items.length;
      }
    }
  }, {
    key: 'setPage',
    value: function setPage(pageIndex) {
      this.pageIndex = pageIndex;
      var parentWidth = _domUtil.DomUtil.getStyle(this.element.parentNode).width;
      var widthInt = parseInt(parentWidth, 10);
      this.element.style.marginLeft = -1 * this.pageIndex * widthInt + 'px';

      var swipeEvent = new CustomEvent('swipe', { detail: { pageIndex: this.pageIndex } });
      this.element.dispatchEvent(swipeEvent);
    }
  }, {
    key: 'setItemsPerPage',
    value: function setItemsPerPage(itemsPerPage) {
      if (itemsPerPage !== this.itemsPerPage) {
        var leftItemNumber = this.pageIndex * this.itemsPerPage + 1;
        var pageIndex = Math.ceil(leftItemNumber / itemsPerPage) - 1;
        this.pageIndex = pageIndex;
        this.itemsPerPage = itemsPerPage;
        var parentWidth = _domUtil.DomUtil.getStyle(this.element.parentNode).width;
        var widthInt = parseInt(parentWidth, 10);
        this.element.style.marginLeft = -1 * this.pageIndex * widthInt + 'px';
      }
    }
  }, {
    key: 'mousedownHandler',
    value: function mousedownHandler(ev) {
      var _this2 = this;

      var marginLeft = _domUtil.DomUtil.getStyle(this.element).marginLeft;
      this.offset = parseInt(marginLeft, 10);

      if (ev.clientX) {
        this.startClientX = ev.clientX;
        this.element.onmousemove = function (e) {
          return _this2.mousemoveHandler(e);
        };
      } else {
        this.startClientX = ev.targetTouches[0].clientX;
        this.element.ontouchmove = function (e) {
          return _this2.mousemoveHandler(e);
        };
      }
    }
  }, {
    key: 'mouseupHandler',
    value: function mouseupHandler(ev) {
      this.element.onmousemove = function () {};

      var finishClientX = ev.clientX || ev.changedTouches[0] && ev.changedTouches[0].pageX;

      if (finishClientX < this.startClientX) {
        this.setPage(this.pageIndex + 1);
      } else if (this.pageIndex > 0 && this.startClientX) {
        this.setPage(this.pageIndex - 1);
      } else if (this.pageIndex === 0) {
        this.setPage(0);
      }

      this.startClientX = null;
    }
  }, {
    key: 'mousemoveHandler',
    value: function mousemoveHandler(ev) {
      var clientX = ev.clientX || ev.targetTouches[0].clientX;
      var diff = clientX - this.startClientX;
      var margin = this.offset + diff;
      this.element.style.marginLeft = margin + 'px';
    }
  }]);

  return CarouselControl;
}();

exports.default = CarouselControl;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _carousel = __webpack_require__(4);

Object.keys(_carousel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _carousel[key];
    }
  });
});

var _carousel2 = __webpack_require__(15);

Object.keys(_carousel2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _carousel2[key];
    }
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _card = __webpack_require__(3);

Object.defineProperty(exports, 'CardControl', {
  enumerable: true,
  get: function get() {
    return _card.CardControl;
  }
});

var _carousel = __webpack_require__(5);

Object.defineProperty(exports, 'CarouselControl', {
  enumerable: true,
  get: function get() {
    return _carousel.CarouselControl;
  }
});

var _paginator = __webpack_require__(7);

Object.defineProperty(exports, 'PaginatorControl', {
  enumerable: true,
  get: function get() {
    return _paginator.PaginatorControl;
  }
});

var _search = __webpack_require__(9);

Object.defineProperty(exports, 'SearchControl', {
  enumerable: true,
  get: function get() {
    return _search.SearchControl;
  }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _paginator = __webpack_require__(8);

Object.keys(_paginator).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _paginator[key];
    }
  });
});

var _paginator2 = __webpack_require__(16);

Object.keys(_paginator2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _paginator2[key];
    }
  });
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaginatorControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domUtil = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PaginatorControl = exports.PaginatorControl = function () {
  function PaginatorControl(itemsPerPage) {
    var _this = this;

    _classCallCheck(this, PaginatorControl);

    this.itemsPerPage = itemsPerPage;
    this.itemsCount = 0;
    this.pageIndex = 0;

    this.element = _domUtil.DomUtil.createElement('div', ['y-paginator']);
    var prevButtonElement = _domUtil.DomUtil.createElement('button', ['y-paginator__button']);
    prevButtonElement.innerHTML = '&lsaquo;';
    this.pageCounterElement = _domUtil.DomUtil.createElement('div', ['y-counter']);
    this.pageCounterElement.innerHTML = this.pageIndex + 1;
    var nextButtonElement = _domUtil.DomUtil.createElement('button', ['y-paginator__button']);
    nextButtonElement.innerHTML = '&rsaquo;';

    this.element.appendChild(prevButtonElement);
    this.element.appendChild(this.pageCounterElement);
    this.element.appendChild(nextButtonElement);

    prevButtonElement.onclick = function () {
      return _this.changePage(_this.pageIndex - 1);
    };
    nextButtonElement.onclick = function () {
      return _this.changePage(_this.pageIndex + 1);
    };
  }

  _createClass(PaginatorControl, [{
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }, {
    key: 'setItemsPerPage',
    value: function setItemsPerPage(itemsPerPage) {
      if (itemsPerPage !== this.itemsPerPage) {
        var leftItemNumber = this.pageIndex * this.itemsPerPage + 1;
        var pageIndex = Math.ceil(leftItemNumber / itemsPerPage) - 1;
        this.itemsPerPage = itemsPerPage;
        this.setPage(pageIndex);
      }
    }
  }, {
    key: 'setItemsCount',
    value: function setItemsCount(itemsCount) {
      if (itemsCount) {
        this.itemsCount = itemsCount;
      }
    }
  }, {
    key: 'setPage',
    value: function setPage(pageIndex) {
      if (pageIndex >= 0 && pageIndex < this.itemsCount / this.itemsPerPage) {
        this.pageIndex = pageIndex;
        this.pageCounterElement.innerHTML = this.pageIndex + 1;
      }
    }
  }, {
    key: 'addItemsCount',
    value: function addItemsCount(itemsCount) {
      if (itemsCount) {
        this.itemsCount += itemsCount;
      }
    }
  }, {
    key: 'changePage',
    value: function changePage(pageIndex) {
      if (pageIndex >= 0 && pageIndex < this.itemsCount / this.itemsPerPage) {
        this.pageIndex = pageIndex;
        this.pageCounterElement.innerHTML = this.pageIndex + 1;

        var changeEvent = new CustomEvent('change', { detail: { pageIndex: this.pageIndex } });
        this.element.dispatchEvent(changeEvent);
      }
    }
  }]);

  return PaginatorControl;
}();

exports.default = PaginatorControl;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _search = __webpack_require__(10);

Object.keys(_search).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _search[key];
    }
  });
});

var _search2 = __webpack_require__(17);

Object.keys(_search2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _search2[key];
    }
  });
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchControl = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domUtil = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchControl = exports.SearchControl = function () {
  function SearchControl() {
    var _this = this;

    _classCallCheck(this, SearchControl);

    this.element = _domUtil.DomUtil.createElement('input', ['y-search']);
    this.element.placeholder = 'Search';

    this.element.onkeypress = function (ev) {
      if (ev.keyCode === 13) {
        var searchEvent = new CustomEvent('search', { detail: { query: ev.target.value } });
        _this.element.dispatchEvent(searchEvent);
      }
    };
  }

  _createClass(SearchControl, [{
    key: 'getElement',
    value: function getElement() {
      return this.element;
    }
  }]);

  return SearchControl;
}();

exports.default = SearchControl;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _viewBuilder = __webpack_require__(12);

Object.keys(_viewBuilder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _viewBuilder[key];
    }
  });
});

var _view = __webpack_require__(18);

Object.keys(_view).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _view[key];
    }
  });
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _domUtil = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewBuilder = exports.ViewBuilder = function () {
  function ViewBuilder() {
    _classCallCheck(this, ViewBuilder);

    var container = _domUtil.DomUtil.createElement('div', ['youtube']);
    this.header = _domUtil.DomUtil.createElement('header', ['y-header']);
    this.main = _domUtil.DomUtil.createElement('main', ['y-main']);
    this.footer = _domUtil.DomUtil.createElement('footer', ['y-footer']);

    container.appendChild(this.header);
    container.appendChild(this.main);
    container.appendChild(this.footer);

    this.template = container;
  }

  _createClass(ViewBuilder, [{
    key: 'getTemplate',
    value: function getTemplate() {
      return this.template;
    }
  }, {
    key: 'setHeader',
    value: function setHeader(content) {
      if (content) {
        this.header.innerHTML = '';
        this.header.appendChild(content);
      }
    }
  }, {
    key: 'setMain',
    value: function setMain(content) {
      if (content) {
        this.main.innerHTML = '';
        this.main.appendChild(content);
      }
    }
  }, {
    key: 'setFooter',
    value: function setFooter(content) {
      if (content) {
        this.footer.innerHTML = '';
        this.footer.appendChild(content);
      }
    }
  }]);

  return ViewBuilder;
}();

exports.default = ViewBuilder;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var YoutubeService = exports.YoutubeService = function () {
  function YoutubeService() {
    _classCallCheck(this, YoutubeService);

    this.apiUrl = 'https://www.googleapis.com/youtube/v3';
    this.apiKey = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';
    this.nextPageToken = null;
    this.query = null;
  }

  _createClass(YoutubeService, [{
    key: 'getVideos',
    value: function getVideos(query) {
      var _this = this;

      if ((query || this.query) && this.query !== query) {
        this.nextPageToken = null;
      }

      this.query = query;

      return this.getVideoSnippets(query).then(function (snippets) {
        var snippetItems = snippets.items;
        var ids = snippetItems.map(function (item) {
          return item.id.videoId;
        });

        return _this.getVideoStatisticsByIds(ids).then(function (statistics) {
          return Object.assign(snippets, statistics);
        });
      });
    }
  }, {
    key: 'getVideoSnippets',
    value: function getVideoSnippets(query) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = _this2.apiUrl + '/search?key=' + _this2.apiKey + '&type=video&part=snippet&maxResults=15';

        if (query) {
          url += '&q=' + query;
        }
        if (_this2.nextPageToken) {
          url += '&pageToken=' + _this2.nextPageToken;
        }

        xhr.open('GET', url);
        xhr.send();

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            var resp = JSON.parse(xhr.response);
            _this2.nextPageToken = resp.nextPageToken;
            resolve(resp);
          } else {
            console.error(xhr.statusText);
            reject(xhr.statusText);
          }
        };
      });
    }
  }, {
    key: 'getVideoStatisticsByIds',
    value: function getVideoStatisticsByIds(ids) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        var url = _this3.apiUrl + '/videos?key=' + _this3.apiKey + '&part=snippet,statistics&id=' + ids;

        xhr.open('GET', url);
        xhr.send();

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.response));
          } else {
            console.error(xhr.statusText);
            reject(xhr.statusText);
          }
        };
      });
    }
  }], [{
    key: 'url',
    get: function get() {
      return 'https://www.youtube.com';
    }
  }]);

  return YoutubeService;
}();

exports.default = YoutubeService;

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 18 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
(function webpackMissingModule() { throw new Error("Cannot find module \"prod\""); }());


/***/ })
/******/ ]);
//# sourceMappingURL=main.map