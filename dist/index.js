"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator = /*#__PURE__*/function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    // 屏幕
    this.screen = document.querySelector(".screen"); // 数字按钮

    this.numbers = document.querySelectorAll(".btn-number"); // 归零按钮

    this.signZero = document.querySelector('.btn-sign-zero'); // 屏幕显示数字最长长度

    this.limit = 9;
  }
  /**
   * 初始化组件
   * @param {{screen:string, numbers: string}} data
   */


  _createClass(Calculator, [{
    key: "init",
    value: function init() {
      // 初始化屏幕
      this.clearScreen(); // 绑定点击事件

      this.bindHandles();
    }
    /**
     * 设置屏幕显示的值, 并返回当前屏幕上显示的值
     * @param {string} val
     * @return {string}
     */

  }, {
    key: "setScreen",
    value: function setScreen(val) {
      this.screen.innerText = val;
      return val;
    }
    /**
     * 追加屏幕值, 并返回追加后屏幕显示的值
     * @param {string} val
     * @return {string}
     */

  }, {
    key: "appendScreen",
    value: function appendScreen(val) {
      var text = this.screen.innerText;

      if (text.length < this.limit) {
        if (text.toString() === "0") {
          this.setScreen(val);
        } else {
          this.screen.innerText += val;
        }
      }

      return this.screen.innerText;
    }
    /**
     * 屏幕归零
     */

  }, {
    key: "clearScreen",
    value: function clearScreen() {
      this.setScreen(0);
    }
    /**
     * 绑定点击事件
     */

  }, {
    key: "bindHandles",
    value: function bindHandles() {
      this.bindNumberHandles();
      this.bindSignHandles();
    }
    /**
     * 绑定数字按钮点击事件
     */

  }, {
    key: "bindNumberHandles",
    value: function bindNumberHandles() {
      var _this = this;

      this.numbers.forEach(function (item) {
        item.onclick = function () {
          return _this.appendScreen(item.innerText);
        };
      });
    }
    /**
     * 绑定 sign 按钮
     */

  }, {
    key: "bindSignHandles",
    value: function bindSignHandles() {
      var _this2 = this;

      this.signZero.onclick = function () {
        return _this2.clearScreen();
      };
    }
  }]);

  return Calculator;
}();

new Calculator().init();