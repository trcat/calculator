"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator = /*#__PURE__*/function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    this.screen = null;
    this.numbers = null;
  }
  /**
   * 传入屏幕和按钮 css class
   * @param {{screen:string, numbers: string}} data
   */


  _createClass(Calculator, [{
    key: "init",
    value: function init(_ref) {
      var screen = _ref.screen,
          numbers = _ref.numbers;
      this.screen = document.querySelector(screen);
      this.numbers = document.querySelectorAll(number); // 绑定点击事件

      this.bindHandles();
    }
    /**
     * 绑定点击事件
     */

  }, {
    key: "bindHandles",
    value: function bindHandles() {
      this.bindNumberHandles();
    }
    /**
     * 绑定数字按钮点击事件
     */

  }, {
    key: "bindNumberHandles",
    value: function bindNumberHandles() {
      this.number;
    }
  }]);

  return Calculator;
}();

new Calculator().init({
  screen: '.screen',
  numbers: ".btn-number"
});