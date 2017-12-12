'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  focused: _propTypes2.default.bool,
  invalid: _propTypes2.default.bool,
  textarea: _propTypes2.default.bool
};

var ROOT = 'mdc-textfield';
var TEXTAREA = ROOT + '--textarea';
var DISABLED = ROOT + '--disabled';
var FOCUSED = ROOT + '--focused';
var INVALID = ROOT + '--invalid';
var UPGRADED = ROOT + '--upgraded';

var Field = function Field(_ref) {
  var _classnames;

  var className = _ref.className,
      focused = _ref.focused,
      disabled = _ref.disabled,
      invalid = _ref.invalid,
      children = _ref.children,
      textarea = _ref.textarea;
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames3.default)(ROOT, (_classnames = {}, _defineProperty(_classnames, TEXTAREA, textarea), _defineProperty(_classnames, FOCUSED, focused), _defineProperty(_classnames, DISABLED, disabled), _defineProperty(_classnames, INVALID, invalid), _classnames), UPGRADED, className)
    },
    children
  );
};
Field.propTypes = propTypes;
exports.default = Field;