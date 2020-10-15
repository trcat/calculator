class Calculator {
  constructor() {
    this.screen = null;
    this.numbers = null;
  }
  /**
   * 传入屏幕和按钮 css class
   * @param {{screen:string, numbers: string}} data
   */
  init({ screen, numbers }) {
    this.screen = document.querySelector(screen);
    this.numbers = document.querySelectorAll(number);
    // 绑定点击事件
    this.bindHandles();
  }
  /**
   * 绑定点击事件
   */
  bindHandles() {
    this.bindNumberHandles();
  }
  /**
   * 绑定数字按钮点击事件
   */
  bindNumberHandles() {
    this.number
  }
}

new Calculator().init({
  screen: '.screen',
  numbers: ".btn-number"
});
