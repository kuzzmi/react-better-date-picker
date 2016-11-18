define("react-better-date-picker", ["react","moment"], function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_4__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMomentProptypes = __webpack_require__(3);

	var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _views = __webpack_require__(6);

	var _utils = __webpack_require__(8);

	var _config = __webpack_require__(7);

	var _config2 = _interopRequireDefault(_config);

	var _classes = __webpack_require__(10);

	var _classes2 = _interopRequireDefault(_classes);

	var _defaults = __webpack_require__(9);

	var _defaults2 = _interopRequireDefault(_defaults);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// import onClickOutside from 'react-onclickoutside';

	var BetterDatePicker = function (_Component) {
	    _inherits(BetterDatePicker, _Component);

	    function BetterDatePicker(props) {
	        _classCallCheck(this, BetterDatePicker);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BetterDatePicker).call(this, props));

	        var date = (0, _utils.getMomentOrNull)(props.date, props.format);

	        _this.state = {
	            date: props.date || (0, _moment2.default)(),
	            input: date ? date.format(props.format) : '',
	            expanded: props.expanded || false,
	            view: props.view || _defaults2.default.view,
	            toolboxOnTheBottom: false
	        };

	        _this.onInputChange = _this.onInputChange.bind(_this);
	        _this.handleOnInputClick = _this.handleOnInputClick.bind(_this);

	        // Open/close
	        _this.collapse = _this.collapse.bind(_this);
	        _this.expand = _this.expand.bind(_this);

	        // Rendering parts
	        _this.renderViewTitle = _this.renderViewTitle.bind(_this);
	        _this.renderCalendarView = _this.renderCalendarView.bind(_this);

	        // Clicks inside of calendar
	        _this.handleOnDayClick = _this.handleOnDayClick.bind(_this);
	        _this.handleOnYearClick = _this.handleOnYearClick.bind(_this);
	        _this.handleOnMonthClick = _this.handleOnMonthClick.bind(_this);
	        _this.handleOnDateClick = _this.handleOnDateClick.bind(_this);
	        _this.handleOnTitleClick = _this.handleOnTitleClick.bind(_this);

	        // Left/Right arrows
	        _this.handleOnMoveClick = _this.handleOnMoveClick.bind(_this);
	        _this.handleOnNextClick = _this.handleOnNextClick.bind(_this);
	        _this.handleOnPrevClick = _this.handleOnPrevClick.bind(_this);

	        // Bottom buttons
	        _this.handleOnTodayClick = _this.handleOnTodayClick.bind(_this);
	        _this.handleOnTomorrowClick = _this.handleOnTomorrowClick.bind(_this);
	        _this.handleOnNextWeekClick = _this.handleOnNextWeekClick.bind(_this);

	        // Reposition calendar respecting the screen sizes
	        _this.setupCalendarPosition = _this.setupCalendarPosition.bind(_this);
	        return _this;
	    }

	    _createClass(BetterDatePicker, [{
	        key: 'componentWillReceiveProps',
	        value: function componentWillReceiveProps(nextProps) {
	            var input = (0, _utils.getMomentOrNull)(nextProps.date, nextProps.format);

	            input = input ? input.format(nextProps.format) : '';

	            if (nextProps.expanded === false && this.state.expanded === true) {
	                this.collapse();
	            } else {
	                this.setState({
	                    date: nextProps.date || new Date(),
	                    expanded: nextProps.expanded,
	                    input: input
	                });
	            }
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate(nextProps, nextState) {
	            if (nextState.expanded === false && this.state.expanded === true && this.props.staticCalendar !== true) {
	                this.setupCalendarPosition();
	            }
	        }
	    }, {
	        key: 'setupCalendarPosition',
	        value: function setupCalendarPosition() {
	            var body = document.getElementsByTagName('body')[0];
	            var calendar = this.calendarElement;
	            var input = this.inputElement || this.container;

	            if (!input) {
	                return;
	            }

	            // Maximum visible sizes of the body
	            var maxVisibleHeight = body.clientHeight;
	            var maxVisibleWidth = body.clientWidth;

	            // Get Input field
	            var inputRect = input.getBoundingClientRect();

	            // Clone hidden calendar to detect size before animation
	            // of the original one has to happen
	            var clonedCalendar = calendar.cloneNode(true);
	            clonedCalendar.style.animation = 'none';
	            clonedCalendar.style.visibility = 'collapse';

	            // Setup a cloned version of a calendar
	            clonedCalendar.style.position = 'fixed';
	            clonedCalendar.style.top = inputRect.top + inputRect.height + 'px';
	            clonedCalendar.style.left = inputRect.left + 'px';

	            // Finally append clonedCalendar to the body, so
	            // we can get its sizes
	            body.appendChild(clonedCalendar);

	            var calendarRect = clonedCalendar.getBoundingClientRect();

	            // Calendar will be of a fixed size
	            calendar.style.position = 'fixed';

	            if (calendarRect.bottom > maxVisibleHeight) {
	                var top = inputRect.top - calendarRect.height - 10;
	                if (!this.state.toolboxOnTheBottom) {
	                    top += 30;
	                }
	                calendar.style.top = top + 'px';
	                calendar.style.transformOrigin = 'bottom';
	                this.setState({ toolboxOnTheBottom: true });
	            } else {
	                calendar.style.top = inputRect.top + inputRect.height + 'px';
	                this.setState({ toolboxOnTheBottom: false });
	            }

	            if (calendarRect.right > maxVisibleWidth) {
	                calendar.style.left = inputRect.right - calendarRect.width - 10 + 'px';
	            }

	            clonedCalendar.remove();
	        }
	    }, {
	        key: 'expand',
	        value: function expand() {
	            this.setState({
	                closing: false,
	                expanded: true
	            });
	        }
	    }, {
	        key: 'collapse',
	        value: function collapse() {
	            this.setState({
	                closing: true,
	                expanded: false
	            });
	        }
	    }, {
	        key: 'onInputChange',
	        value: function onInputChange(e) {
	            var input = e.target.value;
	            var momentOrNull = (0, _utils.getMomentOrNull)(input, this.props.format);
	            if (momentOrNull) {
	                this.props.onChange(momentOrNull.toDate());
	            } else {
	                this.props.onChange();
	            }
	            this.setState({ input: input });
	        }
	    }, {
	        key: 'handleOnInputClick',
	        value: function handleOnInputClick() {
	            this.expand();
	            this.props.onClick && this.props.onClick();
	        }
	    }, {
	        key: 'handleClickOutside',
	        value: function handleClickOutside() {
	            this.collapse();
	        }
	    }, {
	        key: 'renderCalendarView',
	        value: function renderCalendarView() {
	            var _state = this.state;
	            var _state$date = _state.date;
	            var date = _state$date === undefined ? new Date() : _state$date;
	            var view = _state.view;
	            var _props = this.props;
	            var classes = _props.classes;
	            var firstDayOfWeek = _props.firstDayOfWeek;


	            switch (view) {
	                case 'weeks':
	                    return _react2.default.createElement(_views.WeeksView, { date: date, firstDayOfWeek: firstDayOfWeek, classes: classes, onDateClick: this.handleOnDayClick });
	                case 'months':
	                    return _react2.default.createElement(_views.MonthsView, { date: date, classes: classes, onDateClick: this.handleOnMonthClick });
	                case 'years':
	                    return _react2.default.createElement(_views.YearsView, { date: date, classes: classes, onDateClick: this.handleOnYearClick });
	                default:
	                    return _react2.default.createElement(
	                        'p',
	                        null,
	                        'Error'
	                    );
	            }
	        }
	    }, {
	        key: 'renderViewTitle',
	        value: function renderViewTitle() {
	            var _state2 = this.state;
	            var date = _state2.date;
	            var view = _state2.view;


	            switch (view) {
	                case 'weeks':
	                    return (0, _moment2.default)(date).format('MMMM YYYY');
	                case 'months':
	                    return (0, _moment2.default)(date).format('YYYY');
	                case 'years':
	                    var _getYearsInterval = (0, _utils.getYearsInterval)(date, _config2.default.yearsInterval);

	                    var yearsFrom = _getYearsInterval.yearsFrom;
	                    var yearsTo = _getYearsInterval.yearsTo;

	                    var year = 'YYYY';
	                    return yearsFrom.format(year) + ' — ' + yearsTo.format(year);
	                default:
	                    return _react2.default.createElement(
	                        'p',
	                        null,
	                        'Error'
	                    );
	            }
	        }
	    }, {
	        key: 'handleOnTitleClick',
	        value: function handleOnTitleClick() {
	            var view = this.state.view;
	            var views = this.props.views;


	            var current = views.indexOf(view);
	            var nextView = views[current + 1] || views[0];

	            this.setState({ view: nextView });
	        }
	    }, {
	        key: 'handleOnTodayClick',
	        value: function handleOnTodayClick() {
	            this.handleOnDayClick((0, _moment2.default)());
	        }
	    }, {
	        key: 'handleOnTomorrowClick',
	        value: function handleOnTomorrowClick() {
	            this.handleOnDayClick((0, _moment2.default)().add(1, 'day'));
	        }
	    }, {
	        key: 'handleOnNextWeekClick',
	        value: function handleOnNextWeekClick() {
	            this.handleOnDayClick((0, _moment2.default)().add(7, 'day').weekday(this.props.firstDayOfWeek));
	        }
	    }, {
	        key: 'handleOnDayClick',
	        value: function handleOnDayClick(date) {
	            this.handleOnDateClick(date);
	            this.props.onChange((0, _moment2.default)(date).toDate());

	            if (!this.props.staticCalendar) {
	                this.collapse();
	            }
	        }
	    }, {
	        key: 'handleOnMonthClick',
	        value: function handleOnMonthClick(date) {
	            this.setState({ view: 'weeks' });
	            this.handleOnDateClick(date);
	        }
	    }, {
	        key: 'handleOnYearClick',
	        value: function handleOnYearClick(date) {
	            this.setState({ view: 'months' });
	            this.handleOnDateClick(date);
	        }
	    }, {
	        key: 'handleOnDateClick',
	        value: function handleOnDateClick(date) {
	            this.setState({ date: date });
	        }
	    }, {
	        key: 'handleOnMoveClick',
	        value: function handleOnMoveClick() {
	            var direction = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	            var _state3 = this.state;
	            var date = _state3.date;
	            var view = _state3.view;


	            switch (view) {
	                case 'weeks':
	                    this.setState({ date: (0, _moment2.default)(date).add(1 * direction, 'month') });
	                    break;
	                case 'months':
	                    this.setState({ date: (0, _moment2.default)(date).add(1 * direction, 'year') });
	                    break;
	                case 'years':
	                    var years = _config2.default.yearsInterval * 2 + 1;
	                    this.setState({ date: (0, _moment2.default)(date).add(years * direction, 'year') });
	                    break;
	                default:
	                    return;
	            }
	        }
	    }, {
	        key: 'handleOnNextClick',
	        value: function handleOnNextClick() {
	            this.handleOnMoveClick();
	        }
	    }, {
	        key: 'handleOnPrevClick',
	        value: function handleOnPrevClick() {
	            this.handleOnMoveClick(-1);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var _props2 = this.props;
	            var _props2$leftArrow = _props2.leftArrow;
	            var leftArrow = _props2$leftArrow === undefined ? _defaults2.default.leftArrow : _props2$leftArrow;
	            var _props2$rightArrow = _props2.rightArrow;
	            var rightArrow = _props2$rightArrow === undefined ? _defaults2.default.rightArrow : _props2$rightArrow;
	            var hideInput = _props2.hideInput;
	            var hideToolbox = _props2.hideToolbox;
	            var format = _props2.format;
	            var placeholder = _props2.placeholder;
	            var classes = _props2.classes;


	            var containerClasses = classes.container + (this.state.closing ? ' ' + classes.containerClosing : '');

	            return _react2.default.createElement(
	                'div',
	                { className: containerClasses,
	                    ref: function ref(c) {
	                        _this2.container = c;
	                    } },
	                !hideInput && _react2.default.createElement('input', { type: 'text',
	                    ref: function ref(c) {
	                        _this2.inputElement = c;
	                    },
	                    className: classes.input,
	                    value: this.state.input,
	                    onChange: this.onInputChange,
	                    onClick: this.handleOnInputClick,
	                    onFocus: this.handleOnInputClick,
	                    placeholder: placeholder || format
	                }),
	                this.state.expanded && _react2.default.createElement(
	                    'div',
	                    { className: classes.calendarContainer,
	                        ref: function ref(c) {
	                            _this2.calendarElement = c;
	                        } },
	                    !this.state.toolboxOnTheBottom && !hideToolbox && _react2.default.createElement(
	                        'div',
	                        { className: classes.toolbox },
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', onClick: this.handleOnTodayClick },
	                            'Today'
	                        ),
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', onClick: this.handleOnTomorrowClick },
	                            'Tomorrow'
	                        ),
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', onClick: this.handleOnNextWeekClick },
	                            'Next week'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: classes.controls },
	                        _react2.default.createElement(
	                            'div',
	                            { className: classes.leftArrow,
	                                onClick: this.handleOnPrevClick },
	                            leftArrow
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: classes.title,
	                                onClick: this.handleOnTitleClick },
	                            this.renderViewTitle()
	                        ),
	                        _react2.default.createElement(
	                            'div',
	                            { className: classes.rightArrow,
	                                onClick: this.handleOnNextClick },
	                            rightArrow
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: classes.calendar },
	                        this.renderCalendarView()
	                    ),
	                    this.state.toolboxOnTheBottom && !hideToolbox && _react2.default.createElement(
	                        'div',
	                        { className: classes.toolbox },
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', onClick: this.handleOnTodayClick },
	                            'Today'
	                        ),
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', onClick: this.handleOnTomorrowClick },
	                            'Tomorrow'
	                        ),
	                        _react2.default.createElement(
	                            'button',
	                            { type: 'button', onClick: this.handleOnNextWeekClick },
	                            'Next week'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return BetterDatePicker;
	}(_react.Component);
	// onClickOutside()


	BetterDatePicker.propTypes = {
	    date: _react.PropTypes.oneOfType([_reactMomentProptypes2.default.momentObj, _reactMomentProptypes2.default.momentString, _react.PropTypes.instanceOf(Date)]),
	    onChange: _react.PropTypes.func.isRequired,
	    placeholder: _react.PropTypes.string,
	    classes: _react.PropTypes.object,
	    view: _react.PropTypes.oneOf(['weeks', 'months', 'years']),
	    views: _react.PropTypes.arrayOf(_react.PropTypes.oneOf(['weeks', 'months', 'years'])),
	    firstDayOfWeek: _react.PropTypes.number,
	    theme: _react.PropTypes.object
	};
	BetterDatePicker.defaultProps = {
	    classes: _classes2.default,
	    format: _defaults2.default.format,
	    views: ['weeks', 'months', 'years'],
	    firstDayOfWeek: 0,

	    hideToolbox: false,
	    hideInput: false
	};
		exports.default = BetterDatePicker;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(4);
	var momentValidationWrapper = __webpack_require__(5);

	moment.createFromInputFallback = function(config) {
	  config._d = new Date(config._i);
	};

	var ANONYMOUS = '<<anonymous>>';

	var ReactPropTypeLocationNames = {
	  prop : 'prop',
	  context : 'context',
	  childContext : 'child context',
	};

	function createMomentChecker(type, typeValidator, validator, momentType) {

	  function propValidator(isRequired, props, propName, componentName, location, propFullName) {

	    if (isRequired) {
	      var locationName = ReactPropTypeLocationNames[ location ];
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;
	      if (!props.hasOwnProperty(propName)) {
	        return new Error(
	          'Required ' + locationName + ' `' + propFullName +
	          '` was not specified in `' +
	          componentName + '`.'
	        );
	      }
	    }

	    var propValue = props[ propName ];
	    var propType = typeof propValue;

	    if (typeof propValue === 'undefined' || propValue === null) {
	      return null;
	    }

	    if (typeValidator && !typeValidator(propValue)) {
	      return new Error(
	        'Invalid input type: `' + propName + '` of type `' + propType + '` ' +
	        'supplied to `' + componentName + '`, expected `' + type + '`.'
	      );
	    }

	    if (! validator(propValue)) {
	      return new Error(
	        'Invalid ' + location + ' `' + propName + '` of type `' + propType + '` ' +
	        'supplied to `' + componentName + '`, expected `' + momentType + '`.'
	      );
	    }

	    return null;

	  }

	  var requiredPropValidator = propValidator.bind(null, false);
	  requiredPropValidator.isRequired = propValidator.bind(null, true);

	  return requiredPropValidator;

	}

	module.exports = {

	  momentObj : createMomentChecker(
	    'object',
	    function(obj) {
	      return typeof obj === 'object';
	    },
	    function isValid(value) {
	      return momentValidationWrapper.isValidMoment(value);
	    },
	    'Moment'
	  ),

	  momentString : createMomentChecker(
	    'string',
	    function(str) {
	      return typeof str === 'string';
	    },
	    function isValid(value) {
	      return momentValidationWrapper.isValidMoment(moment(value));
	    },
	    'Moment'
	  ),

	  momentDurationObj : createMomentChecker(
	    'object',
	    function(obj) {
	      return typeof obj === 'object';
	    },
	    function isValid(value) {
	      return moment.isDuration(value);
	    },
	    'Duration'
	  ),

	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var moment = __webpack_require__(4);

	function isValidMoment(testMoment) {
	  if (typeof testMoment.isValid === 'function') {
	    // moment 1.7.0+
	    return testMoment.isValid();
	  }

	  return ! isNaN(testMoment);
	}

	module.exports = {
	  isValidMoment : isValidMoment,
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.YearsView = exports.MonthsView = exports.WeeksView = undefined;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactMomentProptypes = __webpack_require__(3);

	var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _config = __webpack_require__(7);

	var _config2 = _interopRequireDefault(_config);

	var _utils = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var View = function View(ViewType) {
	    var _class, _temp;

	    return _temp = _class = function (_Component) {
	        _inherits(_class, _Component);

	        function _class(props) {
	            _classCallCheck(this, _class);

	            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

	            _this.handleOnDateClick = _this.handleOnDateClick.bind(_this);
	            return _this;
	        }

	        _createClass(_class, [{
	            key: 'handleOnDateClick',
	            value: function handleOnDateClick(date) {
	                this.props.onDateClick(date);
	            }
	        }, {
	            key: 'render',
	            value: function render() {
	                return _react2.default.createElement(ViewType, _extends({}, this.props, {
	                    classes: this.props.classes,
	                    date: this.props.date,
	                    handleOnDateClick: this.handleOnDateClick
	                }));
	            }
	        }]);

	        return _class;
	    }(_react.Component), _class.propTypes = {
	        onDateClick: _react.PropTypes.func.isRequired,
	        date: _reactMomentProptypes2.default.momentObj,
	        classes: _react.PropTypes.object.isRequired
	    }, _class.defaultProps = {
	        date: new Date()
	    }, _temp;
	};

	var Weeks = function Weeks(props) {
	    var date = props.date;
	    var classes = props.classes;
	    var firstDayOfWeek = props.firstDayOfWeek;

	    var rows = (0, _utils.getTotalWeeksInMonth)(date);
	    var now = (0, _moment2.default)();
	    var selected = (0, _moment2.default)(date);
	    var weekdays = (0, _utils.makeInterval)(_config2.default.weeksCols).map(function (_, i) {
	        return (0, _moment2.default)().weekday(i + firstDayOfWeek).format('dd');
	    });

	    var fdow = (0, _utils.getFirstDayOfFirstWeek)(date);

	    return _react2.default.createElement(
	        'div',
	        { className: classes.weeksView },
	        _react2.default.createElement(
	            'div',
	            { className: classes.weekdayNames },
	            weekdays.map(function (weekday, i) {
	                return _react2.default.createElement(
	                    'div',
	                    { key: i, className: classes.weekdayName },
	                    weekday
	                );
	            })
	        ),
	        (0, _utils.makeInterval)(rows).map(function (_, i) {
	            return _react2.default.createElement(
	                'div',
	                { key: i, className: classes.weeksRow },
	                weekdays.map(function (_, j) {
	                    var next = (0, _moment2.default)(fdow).add(i + j + 6 * i + firstDayOfWeek, 'day');
	                    return _react2.default.createElement(
	                        'div',
	                        { key: j,
	                            onClick: function onClick() {
	                                return props.handleOnDateClick((0, _moment2.default)(next));
	                            },
	                            className: classes.weeksCell + (next.isSame(now, 'day') ? ' ' + classes.current : '') + (next.isSame(selected, 'day') ? ' ' + classes.selected : '') + (next.isSame(date, 'month') ? '' : ' ' + classes.weeksCellNotCurMonth) },
	                        next.format('D')
	                    );
	                })
	            );
	        })
	    );
	};

	var Months = function Months(props) {
	    var date = props.date;
	    var classes = props.classes;

	    var monthFrom = (0, _moment2.default)(date).month(0);
	    var format = 'MMM';
	    var rows = 12 / _config2.default.monthsCols;
	    var now = (0, _moment2.default)();
	    var selected = (0, _moment2.default)(date);

	    return _react2.default.createElement(
	        'div',
	        { className: classes.yearsView },
	        (0, _utils.makeInterval)(rows).map(function (_, i) {
	            return _react2.default.createElement(
	                'div',
	                { key: i,
	                    className: classes.monthsRow },
	                (0, _utils.makeInterval)(_config2.default.monthsCols).map(function (_, j) {
	                    var next = (0, _moment2.default)(monthFrom).add(i + j + (_config2.default.monthsCols - 1) * i, 'month');
	                    return _react2.default.createElement(
	                        'div',
	                        { key: j,
	                            onClick: function onClick() {
	                                return props.handleOnDateClick((0, _moment2.default)(next));
	                            },
	                            className: classes.monthsCell + (next.isSame(selected, 'day') ? ' ' + classes.selected : '') + (next.isSame(now, 'day') ? ' ' + classes.current : '')
	                        },
	                        next.format(format)
	                    );
	                })
	            );
	        })
	    );
	};

	var Years = function Years(props) {
	    var date = props.date;
	    var classes = props.classes;

	    var _getYearsInterval = (0, _utils.getYearsInterval)(date, _config2.default.yearsInterval);

	    var yearsFrom = _getYearsInterval.yearsFrom;

	    var format = 'YYYY';
	    var rows = (_config2.default.yearsInterval * 2 + 1) / _config2.default.yearsCols;
	    var now = (0, _moment2.default)();
	    var selected = (0, _moment2.default)(date);

	    return _react2.default.createElement(
	        'div',
	        { className: classes.yearsView },
	        (0, _utils.makeInterval)(rows).map(function (_, i) {
	            return _react2.default.createElement(
	                'div',
	                { key: i,
	                    className: classes.yearsRow },
	                (0, _utils.makeInterval)(_config2.default.yearsCols).map(function (_, j) {
	                    var next = (0, _moment2.default)(yearsFrom).add(i + j + (_config2.default.yearsCols - 1) * i, 'year');
	                    return _react2.default.createElement(
	                        'div',
	                        { key: j,
	                            onClick: function onClick() {
	                                return props.handleOnDateClick((0, _moment2.default)(next));
	                            },
	                            className: classes.yearsCell + (next.isSame(selected, 'day') ? ' ' + classes.selected : '') + (next.isSame(now, 'day') ? ' ' + classes.current : '')
	                        },
	                        next.format(format)
	                    );
	                })
	            );
	        })
	    );
	};

	var WeeksView = exports.WeeksView = View(Weeks);
	var MonthsView = exports.MonthsView = View(Months);
	var YearsView = exports.YearsView = View(Years);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    classPrefix: 'better-date-picker',
	    yearsInterval: 4,
	    yearsCols: 3,
	    monthsCols: 4,
	    weeksCols: 7
		};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getFirstDayOfFirstWeek = exports.getTotalWeeksInMonth = exports.getYearsInterval = exports.makeInterval = exports.getMomentOrNull = undefined;

	var _moment = __webpack_require__(4);

	var _moment2 = _interopRequireDefault(_moment);

	var _defaults = __webpack_require__(9);

	var _defaults2 = _interopRequireDefault(_defaults);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getMomentOrNull = exports.getMomentOrNull = function getMomentOrNull(date) {
	    var format = arguments.length <= 1 || arguments[1] === undefined ? _defaults2.default.format : arguments[1];

	    if (_moment2.default.isMoment(date)) {
	        return date;
	    }

	    if (_moment2.default.isDate(date) && !isNaN(date.getTime())) {
	        return (0, _moment2.default)(date);
	    }

	    if (typeof date === 'string' && date.length) {
	        var result = (0, _moment2.default)(date, format, true);
	        if (result.isValid()) {
	            return result;
	        }
	    }

	    return null;
	};

	var makeInterval = exports.makeInterval = function makeInterval(length) {
	    if (length === null || length === '' || isNaN(length) || +length <= 0) {
	        return [];
	    }

	    return Array.apply(null, Array(length));
	};

	var getYearsInterval = exports.getYearsInterval = function getYearsInterval(date, interval) {
	    var yearsTo = null;
	    var yearsFrom = null;

	    if (interval === null || interval === '' || isNaN(interval) || +interval < 0) {
	        return { yearsFrom: yearsFrom, yearsTo: yearsTo };
	    }

	    yearsFrom = getMomentOrNull(date);
	    yearsTo = getMomentOrNull(date);

	    if (yearsFrom && yearsTo) {
	        yearsFrom.add(-1 * interval, 'year');
	        yearsTo.add(interval, 'year');
	    }

	    return { yearsFrom: yearsFrom, yearsTo: yearsTo };
	};

	var getTotalWeeksInMonth = exports.getTotalWeeksInMonth = function getTotalWeeksInMonth(date) {
	    if (getMomentOrNull(date) === null) {
	        return 0;
	    }

	    var startWeek = (0, _moment2.default)(date).startOf('month').week();
	    var endWeek = (0, _moment2.default)(date).endOf('month').week();

	    var result = (endWeek > startWeek ? endWeek - startWeek : startWeek) + 1;

	    return result > 6 ? 6 : result;
	};

	var getFirstDayOfFirstWeek = exports.getFirstDayOfFirstWeek = function getFirstDayOfFirstWeek(date) {
	    if (getMomentOrNull(date) === null) {
	        return null;
	    }

	    var fdom = (0, _moment2.default)(date).startOf('month');
	    var fdomWeekday = fdom.weekday();

	    return fdom.add(-1 * fdomWeekday, 'day');
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    leftArrow: _react2.default.createElement(
	        'span',
	        null,
	        '‹'
	    ),
	    rightArrow: _react2.default.createElement(
	        'span',
	        null,
	        '›'
	    ),
	    view: 'weeks',
	    format: 'YYYY-MM-DD'
		};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _config = __webpack_require__(7);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// List of classes used in the module.
	// Will allow to easily swap "themes" as well
	// as providing a bare component with no styling
	exports.default = {
	    container: _config2.default.classPrefix + '-container',
	    containerClosing: _config2.default.classPrefix + '-container-closing',
	    protector: _config2.default.classPrefix + '-protector',
	    input: _config2.default.classPrefix + '-input',
	    calendarContainer: _config2.default.classPrefix + '-calendar-container',
	    calendar: _config2.default.classPrefix + '-calendar',
	    toolbox: _config2.default.classPrefix + '-toolbox',
	    controls: _config2.default.classPrefix + '-controls',
	    title: _config2.default.classPrefix + '-title',
	    leftArrow: _config2.default.classPrefix + '-left-arrow',
	    rightArrow: _config2.default.classPrefix + '-right-arrow',

	    current: _config2.default.classPrefix + '-current',
	    selected: _config2.default.classPrefix + '-selected',

	    // WeeksView
	    weeksView: _config2.default.classPrefix + '-weeks-view',
	    weekdayName: _config2.default.classPrefix + '-weeks-name',
	    weekdayNames: _config2.default.classPrefix + '-weeks-names',
	    weeksRow: _config2.default.classPrefix + '-weeks-row',
	    weeksCell: _config2.default.classPrefix + '-weeks-cell',
	    weeksCellNotCurMonth: _config2.default.classPrefix + '-weeks-cell-not-current-month',

	    // MonthsView
	    monthsView: _config2.default.classPrefix + '-years-view',
	    monthsRow: _config2.default.classPrefix + '-years-row',
	    monthsCell: _config2.default.classPrefix + '-years-cell',

	    // YearsView
	    yearsView: _config2.default.classPrefix + '-years-view',
	    yearsRow: _config2.default.classPrefix + '-years-row',
	    yearsCell: _config2.default.classPrefix + '-years-cell'
		};

/***/ }
/******/ ])});;
//# sourceMappingURL=react-better.date-picker.js.map