"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calculator = /*#__PURE__*/function () {
  function Calculator() {
    _classCallCheck(this, Calculator);

    // 屏幕
    this.screen = document.querySelector(".screen"); // 数字按钮

    this.numbers = document.querySelectorAll(".btn-number"); // 符号按钮

    this.sign = document.querySelectorAll(".btn-sign"); // 运算符按钮

    this.operator = document.querySelectorAll(".btn-operator"); //
    // 屏幕显示数字最长长度

    this.limit = 9; // 点击运算符后暂存的值

    this.cache = [];
    this.operatorJustClick = false;
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
          // 如果此时为0, 除小数点外是追加, 其他都是覆盖
          if (val === "." && !text.includes(val)) {
            this.screen.innerText += val;
          } else {
            this.setScreen(val);
          }
        } else if (this.operatorJustClick) {
          // 如果是刚点击运算符, 下一次输入就需要替换屏幕中的内容
          if (val === '.') {
            this.setScreen('0.');
          } else {
            this.setScreen(val);
          }

          this.operatorJustClick = false;
        } else if (!(val === "." && text.includes(val))) {
          // 必须保证数字中只有一个小数点
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
      this.bindOperatorHandles();
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
          _this.clearOperatorState();

          _this.appendScreen(item.innerText);
        };
      });
    }
    /**
     * 绑定 sign 按钮点击事件
     */

  }, {
    key: "bindSignHandles",
    value: function bindSignHandles() {
      var _this2 = this;

      this.sign.forEach(function (item) {
        switch (item.innerText) {
          case "C":
            item.onclick = function () {
              return _this2.clearScreen();
            };

            break;
        }
      });
    }
    /**
     * 绑定运算符按钮点击事件
     */

  }, {
    key: "bindOperatorHandles",
    value: function bindOperatorHandles() {
      var _this3 = this;

      this.operator.forEach(function (item) {
        var text = item.innerText;

        item.onclick = function () {
          if (text !== '=') {
            if (_this3.cache.length > 0) {
              // 如果是多次按运算符的话, 需要写计算出上一次的值并显示在屏幕上
              _this3.cache.push(_this3.screen.innerText);

              _this3.setScreen(_this3.calculate());
            }

            item.classList.add("active");

            _this3.cache.push(_this3.screen.innerText);

            _this3.cache.push(text);
          } else {
            if (_this3.operatorJustClick) {
              // 如果上一次就是按了运算符, 那么屏幕不变, 清空 cache
              _this3.clearOperatorState();

              _this3.cache = [];
            } else {
              _this3.cache.push(_this3.screen.innerText);

              _this3.setScreen(_this3.calculate());
            }

            _this3.operatorJustClick = true;
          }
        };
      });
    }
    /**
     * 所有运算按钮恢复默认状态
     */

  }, {
    key: "clearOperatorState",
    value: function clearOperatorState() {
      this.operator.forEach(function (item) {
        item.classList.remove('active');
      });
    }
    /**
     * 更具 cache 开始计算最终的结果
     * @return {number}
     */

  }, {
    key: "calculate",
    value: function calculate() {
      var _this4 = this;

      var total;
      this.cache.forEach(function (item, index) {
        if (index === 0) {
          total = Number(item);
        } else {
          switch (item) {
            case "+":
              total += Number(_this4.cache[index + 1]);
              break;
          }
        }
      });
      this.cache = [];
      return total;
    }
  }]);

  return Calculator;
}();

new Calculator().init();