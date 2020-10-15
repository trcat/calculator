class Calculator {
  constructor() {
    // 屏幕
    this.screen = document.querySelector(`.screen`);
    // 数字按钮
    this.numbers = document.querySelectorAll(`.btn-number`);
    // 符号按钮
    this.sign = document.querySelectorAll(".btn-sign");
    // 运算符按钮
    this.operator = document.querySelectorAll(".btn-operator");
    //
    // 屏幕显示数字最长长度
    this.limit = 9;

    // 点击运算符后暂存的值
    this.cache = [];
    this.operatorJustClick = false;
  }
  /**
   * 初始化组件
   * @param {{screen:string, numbers: string}} data
   */
  init() {
    // 初始化屏幕
    this.clearScreen();
    // 绑定点击事件
    this.bindHandles();
  }
  /**
   * 设置屏幕显示的值, 并返回当前屏幕上显示的值
   * @param {string} val
   * @return {string}
   */
  setScreen(val) {
    this.screen.innerText = val;
    return val;
  }
  /**
   * 追加屏幕值, 并返回追加后屏幕显示的值
   * @param {string} val
   * @return {string}
   */
  appendScreen(val) {
    const text = this.screen.innerText;
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
  clearScreen() {
    this.setScreen(0);
  }
  /**
   * 绑定点击事件
   */
  bindHandles() {
    this.bindNumberHandles();
    this.bindSignHandles();
    this.bindOperatorHandles();
  }
  /**
   * 绑定数字按钮点击事件
   */
  bindNumberHandles() {
    this.numbers.forEach((item) => {
      item.onclick = () => this.appendScreen(item.innerText);
    });
  }
  /**
   * 绑定 sign 按钮点击事件
   */
  bindSignHandles() {
    this.sign.forEach((item) => {
      switch (item.innerText) {
        case "C":
          item.onclick = () => this.clearScreen();
          break;
      }
    });
  }
  /**
   * 绑定运算符按钮点击事件
   */
  bindOperatorHandles() {
    this.operator.forEach((item) => {
      const text = item.innerText;
      item.onclick = () => {
        this.clearOperatorState();
        if (text !== '=') {
          item.classList.add("active");
          this.cache.push(this.screen.innerText);
          this.cache.push(text);
          this.operatorJustClick = true;
        } else {
          this.cache.push(this.screen.innerText);
          this.setScreen(this.calculate());
          this.operatorJustClick = true;
        }
      }
    });
  }
  /**
   * 所有运算按钮恢复默认状态
   */
  clearOperatorState() {
    this.operator.forEach((item) => {
      item.classList.remove('active');
    })
  }
  calculate() {
    let total;
    this.cache.forEach((item, index) => {
      if (index === 0) {
        total = Number(item);
      } else {
        switch (item) {
          case "+":
            total += Number(this.cache[index + 1]);
            break;
        }
      }
    })
    this.cache = [];
    return total;
  }
}

new Calculator().init();
